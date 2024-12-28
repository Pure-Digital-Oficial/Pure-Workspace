import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreatePlaylistCategoryDto } from '../../../dto';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  CreatePlaylistCategoryRepository,
  FindCompanyByIdRepository,
  FindPlaylistCategoryByNameRepository,
  FindUserByIdRepository,
} from '../../../repository';
import { ValidationCompanyId, ValidationUserId } from '../../../utils';

export class CreatePlaylistCategory
  implements
    UseCase<
      CreatePlaylistCategoryDto,
      Either<
        | EntityNotEmpty
        | EntityNotExists
        | EntityNotCreated
        | EntityAlreadyExists,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('CreatePlaylistCategoryRepository')
    private createPlaylistCategoryRepository: CreatePlaylistCategoryRepository,
    @Inject('FindPlaylistCategoryByNameRepository')
    private findPlaylistCategoryByNameRepository: FindPlaylistCategoryByNameRepository
  ) {}
  async execute(
    input: CreatePlaylistCategoryDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityNotCreated | EntityAlreadyExists,
      string
    >
  > {
    const { loggedUserId, companyId, body } = input;

    if (Object.keys(body.name).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    if (Object.keys(body.description).length < 1) {
      return left(new EntityNotEmpty('description'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const companyValidation = await ValidationCompanyId(
      companyId,
      this.findCompanyByIdRepository
    );

    if (companyValidation.isLeft()) {
      return left(companyValidation.value);
    }

    const filteredPlaylistCategory =
      await this.findPlaylistCategoryByNameRepository.find({
        loggedUserId,
        name: body.name,
      });

    if (
      Object.keys(filteredPlaylistCategory?.id ?? filteredPlaylistCategory)
        .length > 0
    ) {
      return left(new EntityAlreadyExists('Category'));
    }

    const createdCategory = await this.createPlaylistCategoryRepository.create(
      input
    );

    if (Object.keys(createdCategory).length < 1) {
      return left(new EntityNotCreated('Playlist Category'));
    }

    return right(createdCategory);
  }
}
