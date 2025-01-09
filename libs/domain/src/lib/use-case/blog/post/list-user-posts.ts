import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { ListPostsDto, ListPostsResponseDto } from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindAppByIdRepository,
  FindUserByIdRepository,
  ListUserPostsRepository,
} from '../../../repository';
import { ValidationUserId } from '../../../utils';

export class ListUserPosts
  implements
    UseCase<ListPostsDto, Either<EntityNotEmpty, ListPostsResponseDto>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('ListUserPostsRepository')
    private listUserPostsRepository: ListUserPostsRepository
  ) {}
  async execute(
    input: ListPostsDto
  ): Promise<Either<EntityNotEmpty, ListPostsResponseDto>> {
    const { appId, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('App ID'));
    }

    const filteredAppId = await this.findAppByIdRepository.find(appId);
    if (
      Object.keys(filteredAppId).length < 1 ||
      Object.keys(filteredAppId?.id).length < 1
    ) {
      return left(new EntityNotExists('app ID'));
    }

    const listPosts = await this.listUserPostsRepository.list(input);

    return right(listPosts);
  }
}
