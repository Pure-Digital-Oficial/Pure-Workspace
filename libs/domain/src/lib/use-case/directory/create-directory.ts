import { UseCase } from '../../base/use-case';
import { CreateDirectoryDto } from '../../dto';
import {
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../error';
import {
  CreateDirectoryRepository,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import { FindDirectoryByNameRepository } from '../../repository/directory/find-directory-by-name';
import { Inject } from '@nestjs/common';
import {
  ValidationCompanyId,
  ValidationDirectoryByName,
  ValidationUserId,
} from '../../utils';

export class CreateDirectory
  implements
    UseCase<
      CreateDirectoryDto,
      Either<
        | EntityNotEmpty
        | EntityNotExists
        | EntityAlreadyExists
        | EntityNotCreated,
        string
      >
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('FindDirectoryByNameRepository')
    private findDirectoryByNameRepository: FindDirectoryByNameRepository,
    @Inject('CreateDirectoryRepository')
    private createDirectoryRepository: CreateDirectoryRepository
  ) {}

  async execute(
    input: CreateDirectoryDto
  ): Promise<
    Either<
      EntityNotEmpty | EntityNotExists | EntityAlreadyExists | EntityNotCreated,
      string
    >
  > {
    const { body, loggedUserId, companyId } = input;

    if (Object.keys(body.name).length < 1) {
      return left(new EntityNotEmpty('Name'));
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

    const directoryNameValidation = await ValidationDirectoryByName(
      body.name,
      loggedUserId,
      this.findDirectoryByNameRepository
    );

    if (directoryNameValidation.isLeft()) {
      return left(directoryNameValidation.value);
    }

    const createDirectory = await this.createDirectoryRepository.create(input);

    if (Object.keys(createDirectory).length < 1) {
      return left(new EntityNotCreated('Directory'));
    }

    return right(createDirectory);
  }
}
