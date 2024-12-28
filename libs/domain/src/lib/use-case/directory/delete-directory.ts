import { Inject } from '@nestjs/common';
import {
  DeleteDirectoryRepository,
  FindContentFilesByDirectoryIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { DeleteDirectoryDto } from '../../dto';
import { Either, left, right } from '../../shared/either';
import { EntityIsNotEmpty, EntityNotEmpty } from '../../error';
import { ValidationDirectoryId, ValidationUserId } from '../../utils';

export class DeleteDirectory {
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDirectoryByIdRepository')
    private findDirectoryByIdRepository: FindDirectoryByIdRepository,
    @Inject('FindContentFilesByDirectoryIdRepository')
    private findContentFilesByDirectoryIdRepository: FindContentFilesByDirectoryIdRepository,
    @Inject('DeleteDirectoryRepository')
    private deleteDirectoryRepository: DeleteDirectoryRepository
  ) {}

  async execute(
    input: DeleteDirectoryDto
  ): Promise<Either<EntityNotEmpty, void>> {
    const { id, loggedUserId } = input;

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

    const filteredContentFiles =
      await this.findContentFilesByDirectoryIdRepository.find(id);

    if (filteredContentFiles.length > 0) {
      return left(new EntityIsNotEmpty('Directory'));
    }

    await this.deleteDirectoryRepository.delete(input);

    return right(undefined);
  }
}
