import { Inject } from '@nestjs/common';
import { ListMediasPostDto, ListMediasPostResponseDto } from '../../../..//dto';
import { UseCase } from '../../../../base/use-case';
import { Either, left, right } from '../../../..//shared/either';
import { EntityNotEmpty } from '../../../..//error';
import {
  FindPostByIdRepository,
  FindUserByIdRepository,
  ListMediasPostRepository,
} from '../../../../repository';
import { ValidationPostId, ValidationUserId } from '../../../../utils';

export class ListMediasPost
  implements
    UseCase<
      ListMediasPostDto,
      Either<EntityNotEmpty, ListMediasPostResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPostByIdRepository')
    private findPostByIdRepository: FindPostByIdRepository,
    @Inject('ListMediasPostRepository')
    private listMediasPostRepository: ListMediasPostRepository
  ) {}
  async execute(
    input: ListMediasPostDto
  ): Promise<Either<EntityNotEmpty, ListMediasPostResponseDto>> {
    const { loggedUserId, postId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const postValidation = await ValidationPostId(
      postId,
      this.findPostByIdRepository
    );

    if (postValidation.isLeft()) {
      return left(postValidation.value);
    }

    const listMediasPost = await this.listMediasPostRepository.list(input);

    return right(listMediasPost);
  }
}
