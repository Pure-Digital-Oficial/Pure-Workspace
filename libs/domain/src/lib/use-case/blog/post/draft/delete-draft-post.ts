import { Inject } from '@nestjs/common';
import { UseCase } from '../../../../base/use-case';
import { DeleteDraftPostDto } from '../../../../dto';
import { EntityNotDeleted, EntityNotEmpty } from '../../../../error';
import { Either, left, right } from '../../../../shared/either';
import {
  DeleteDraftPostRepository,
  FindPostByIdRepository,
  FindUserByIdRepository,
} from '../../../../repository';
import { ValidationPostId, ValidationUserId } from '../../../../utils';

export class DeleteDraftPost
  implements UseCase<DeleteDraftPostDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPostByIdRepository')
    private findPostByIdRepository: FindPostByIdRepository,
    @Inject('DeleteDraftPostRepository')
    private deleteDraftPostRepository: DeleteDraftPostRepository
  ) {}
  async execute(
    input: DeleteDraftPostDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { id, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const postValidation = await ValidationPostId(
      id,
      this.findPostByIdRepository
    );

    if (postValidation.isLeft()) {
      return left(postValidation.value);
    }

    const deletedPost = await this.deleteDraftPostRepository.delete(input);

    if (Object.keys(deletedPost).length < 1) {
      return left(new EntityNotDeleted('Draft Post'));
    }

    return right(deletedPost);
  }
}
