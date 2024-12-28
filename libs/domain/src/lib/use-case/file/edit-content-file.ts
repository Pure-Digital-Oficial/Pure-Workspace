import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { EditContentFileDto } from '../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  EditContentFileRepository,
  FindContentFileByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import {
  ValidationContentFileId,
  ValidationDirectoryId,
  ValidationUserId,
} from '../../utils';

export class EditContentFile
  implements
    UseCase<EditContentFileDto, Either<EntityNotEmpty | EntityNotExists, void>>
{
  constructor(
    @Inject('EditContentFileRepository')
    private editContentFileRepository: EditContentFileRepository,
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDirectoryByIdRepository')
    private findDirectoryByIdRepository: FindDirectoryByIdRepository,
    @Inject('FindContentFileByIdRepository')
    private findContentFileByIdRepository: FindContentFileByIdRepository
  ) {}

  async execute(
    input: EditContentFileDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
    const { idToEdit, directoryId, loggedUserId, newFileName } = input;

    if (Object.keys(newFileName).length < 1) {
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
      directoryId,
      this.findDirectoryByIdRepository
    );

    if (directoryValidation.isLeft()) {
      return left(directoryValidation.value);
    }

    const contentFileValidation = await ValidationContentFileId(
      idToEdit,
      this.findContentFileByIdRepository
    );

    if (contentFileValidation.isLeft()) {
      return left(contentFileValidation.value);
    }

    await this.editContentFileRepository.edit(input);

    return right(undefined);
  }
}
