import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { ListPostsDto, ListPostsResponseDto } from '../../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  FindAppByIdRepository,
  ListPostsRepository,
} from '../../../repository';

export class ListPosts
  implements
    UseCase<ListPostsDto, Either<EntityNotEmpty, ListPostsResponseDto>>
{
  constructor(
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('ListPostsRepository')
    private listPostsRepository: ListPostsRepository
  ) {}
  async execute(
    input: ListPostsDto
  ): Promise<Either<EntityNotEmpty, ListPostsResponseDto>> {
    const { appId } = input;

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

    const postList = await this.listPostsRepository.list(input);

    return right(postList);
  }
}
