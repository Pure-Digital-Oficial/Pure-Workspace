import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { DeletePostDto } from '../../../dto';
import { EntityNotDeleted, EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  DeletePostRepository,
  FindPostByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationPostId, ValidationUserId } from '../../../utils';

export class DeletePost
  implements UseCase<DeletePostDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPostByIdRepository')
    private findPostByIdRepository: FindPostByIdRepository,
    @Inject('DeletePostRepository')
    private deletePostRepository: DeletePostRepository
  ) {}
  async execute(input: DeletePostDto): Promise<Either<EntityNotEmpty, string>> {
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

    const deletedPost = await this.deletePostRepository.delete(input);

    if (Object.keys(deletedPost).length < 1) {
      return left(new EntityNotDeleted('Post'));
    }

    return right(deletedPost);
  }
}
