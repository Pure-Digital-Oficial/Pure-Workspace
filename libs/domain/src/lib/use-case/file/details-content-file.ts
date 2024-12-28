import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { DetailsContentFileDto } from '../../dto';
import { ContentFile } from '../../entity';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  FindContentFileByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { ValidationDirectoryId, ValidationUserId } from '../../utils';

export class DetailsContentFile
  implements
    UseCase<DetailsContentFileDto, Either<EntityNotEmpty, ContentFile>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDirectoryByIdRepository')
    private findDirectoryByIdRepository: FindDirectoryByIdRepository,
    @Inject('FindContentFileByIdRepository')
    private findContentFileByIdRepository: FindContentFileByIdRepository
  ) {}
  async execute(
    input: DetailsContentFileDto
  ): Promise<Either<EntityNotEmpty, ContentFile>> {
    const { id, directoryId, loggedUserId } = input;

    if (Object.keys(id).length < 1) {
      return left(new EntityNotEmpty('id'));
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
      id
    );

    if (
      Object.keys(filteredContentFile?.id ?? filteredContentFile).length < 1
    ) {
      return left(new EntityNotExists('Content File'));
    }

    return right(filteredContentFile);
  }
}
