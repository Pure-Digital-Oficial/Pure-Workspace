import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { MoveFileToDirectoryDto } from '../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindContentFileByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
  MoveFileToDirectoryRepository,
} from '../../repository';
import {
  ValidationContentFileId,
  ValidationDirectoryId,
  ValidationUserId,
} from '../../utils';

export class MoveFileToDirectory
  implements
    UseCase<
      MoveFileToDirectoryDto,
      Either<EntityNotEmpty | EntityNotExists, void>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDirectoryByIdRepository')
    private findDirectoryByIdRepository: FindDirectoryByIdRepository,
    @Inject('FindContentFileByIdRepository')
    private findContentFileByIdRepository: FindContentFileByIdRepository,
    @Inject('MoveFileToDirectoryRepository')
    private moveFileToDirectoryRepository: MoveFileToDirectoryRepository
  ) {}
  async execute(
    input: MoveFileToDirectoryDto
  ): Promise<Either<EntityNotEmpty | EntityNotExists, void>> {
    const { idToMove, idToMoveDirectory, loggedUserId } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const directoryValidation = await ValidationDirectoryId(
      idToMoveDirectory,
      this.findDirectoryByIdRepository
    );

    if (directoryValidation.isLeft()) {
      return left(directoryValidation.value);
    }

    const contentFileValidation = await ValidationContentFileId(
      idToMove,
      this.findContentFileByIdRepository
    );

    if (contentFileValidation.isLeft()) {
      return left(contentFileValidation.value);
    }

    await this.moveFileToDirectoryRepository.move(input);

    return right(undefined);
  }
}
