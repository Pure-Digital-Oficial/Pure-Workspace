import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreateCategoryDto } from '../../../dto';
import {
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import {
  CreateCategoryRepository,
  FindAppByIdRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationUserId } from '../../../utils';

export class CreateCategory
  implements UseCase<CreateCategoryDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('CreateCategoryRepository')
    private createCategoryRepository: CreateCategoryRepository
  ) {}
  async execute(
    input: CreateCategoryDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      loggedUserId,
      body: { name, description },
    } = input;

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const createdPost = await this.createCategoryRepository.create(input);

    if (Object.keys(createdPost).length < 1) {
      return left(new EntityNotCreated('Category'));
    }

    return right(createdPost);
  }
}
