import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditPostDto } from '../../../dto/request/blog/post/edit-post.dto';
import { EntityNotEdit, EntityNotEmpty } from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  EditPostRepository,
  FindPostByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationPostId, ValidationUserId } from '../../../utils';

export class EditPost
  implements UseCase<EditPostDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPostByIdRepository')
    private findPostByIdRepository: FindPostByIdRepository,
    @Inject('EditPostRepository')
    private editPostRepository: EditPostRepository
  ) {}
  async execute(input: EditPostDto): Promise<Either<EntityNotEmpty, string>> {
    const {
      id,
      loggedUserId,
      body: { content, description, subTitle, title },
    } = input;

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

    if (Object.keys(input.body).length < 1) {
      return left(new EntityNotEmpty('Body'));
    }

    if (Object.keys(content).length < 1) {
      return left(new EntityNotEmpty('Content'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    if (Object.keys(subTitle).length < 1) {
      return left(new EntityNotEmpty('SubTitle'));
    }

    if (Object.keys(title).length < 1) {
      return left(new EntityNotEmpty('Title'));
    }

    const editedPost = await this.editPostRepository.edit(input);

    if (Object.keys(editedPost).length < 1) {
      return left(new EntityNotEdit('Post'));
    }

    return right(editedPost);
  }
}
