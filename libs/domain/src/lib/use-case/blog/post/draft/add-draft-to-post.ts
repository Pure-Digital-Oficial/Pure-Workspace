import { Inject } from '@nestjs/common';
import { UseCase } from '../../../../base/use-case';
import { AddDraftToPostDto } from '../../../../dto';
import { EntityNotCreated, EntityNotEmpty } from '../../../../error';
import {
  AddDraftToPostRepository,
  FindPostByIdRepository,
  FindUserByIdRepository,
} from '../../../../repository';
import { Either, left, right } from '../../../../shared/either';
import { ValidationPostId, ValidationUserId } from '../../../../utils';

export class AddDraftToPost
  implements UseCase<AddDraftToPostDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPostByIdRepository')
    private findPostByIdRepository: FindPostByIdRepository,
    @Inject('AddDraftToPostRepository')
    private addDraftToPostRepository: AddDraftToPostRepository
  ) {}
  async execute(
    input: AddDraftToPostDto
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

    const createdPost = await this.addDraftToPostRepository.add(input);

    if (Object.keys(createdPost).length < 1) {
      return left(new EntityNotCreated('Post'));
    }

    return right(createdPost);
  }
}
