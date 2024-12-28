import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { DeleteContentFileByIdDto } from '../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import {
  DeleteContentFileByIdRepository,
  DeleteFileByNameRepository,
  FindContentFileByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import { ValidationDirectoryId, ValidationUserId } from '../../utils';

export class DeleteContentFileById
  implements
    UseCase<
      DeleteContentFileByIdDto,
      Either<EntityNotEmpty | EntityNotExists, void>
    >
{
  constructor(
    @Inject('DeleteContentFileByIdRepository')
    private deleteCotentFileByIdRepository: DeleteContentFileByIdRepository,
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDirectoryByIdRepository')
    private findDirectoryByIdRepository: FindDirectoryByIdRepository,
    @Inject('FindContentFileByIdRepository')
    private findContentFileByIdRepository: FindContentFileByIdRepository,
    @Inject('DeleteFileByNameRepository')
    private deleteFileByNameRepository: DeleteFileByNameRepository
  ) {}

  async execute(
    input: DeleteContentFileByIdDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
    const { directoryId, loggedUserId, idToDelete } = input;

    if (Object.keys(idToDelete).length < 1) {
      return left(new EntityNotEmpty('ID to delete'));
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

    const filteredContentFile = await this.findContentFileByIdRepository.find(
      idToDelete
    );

    if (
      Object.keys(filteredContentFile?.id ?? filteredContentFile).length < 1
    ) {
      return left(new EntityNotExists('Content File'));
    }

    await this.deleteCotentFileByIdRepository.delete(input);

    if (Object.keys(filteredContentFile?.thumbnail ?? '').length > 0) {
      const thumbnail = filteredContentFile?.thumbnail
        ? filteredContentFile?.thumbnail.split('/')
        : '';
      await this.deleteFileByNameRepository.delete(
        thumbnail[thumbnail.length - 1]
      );
      await this.deleteFileByNameRepository.delete(
        filteredContentFile.fileName
      );
    } else {
      await this.deleteFileByNameRepository.delete(
        filteredContentFile.fileName
      );
    }
    return right(undefined);
  }
}
