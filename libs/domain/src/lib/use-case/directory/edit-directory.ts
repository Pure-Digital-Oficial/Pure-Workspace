import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { EditDirectoryDto } from '../../dto/request/directory/edit-directory.dto';
import { EntityNotEdit, EntityNotEmpty } from '../../error';
import {
  EditDirectoryRepository,
  FindDirectoryByIdRepository,
  FindDirectoryByNameRepository,
  FindUserByIdRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import {
  ValidationDirectoryByName,
  ValidationDirectoryId,
  ValidationUserId,
} from '../../utils';

export class EditDirectory
  implements UseCase<EditDirectoryDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDirectoryByIdRepository')
    private findDirectoryByIdRepository: FindDirectoryByIdRepository,
    @Inject('FindDirectoryByNameRepository')
    private findDirectoryByNameRepository: FindDirectoryByNameRepository,
    @Inject('EditDirectoryRepository')
    private editDirectoryRepository: EditDirectoryRepository
  ) {}

  async execute(
    input: EditDirectoryDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { id, loggedUserId, newName } = input;

    if (Object.keys(newName).length < 1) {
      return left(new EntityNotEmpty('name'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const directoryValidation = await ValidationDirectoryId(
      id,
      this.findDirectoryByIdRepository
    );

    if (directoryValidation.isLeft()) {
      return left(directoryValidation.value);
    }

    const directoryValidationByName = await ValidationDirectoryByName(
      newName,
      loggedUserId,
      this.findDirectoryByNameRepository
    );

    if (directoryValidationByName.isLeft()) {
      return left(directoryValidationByName.value);
    }

    const editDirectoryId = await this.editDirectoryRepository.edit(input);

    if (Object.keys(editDirectoryId).length < 1) {
      return left(new EntityNotEdit('directory'));
    }

    return right(editDirectoryId);
  }
}
