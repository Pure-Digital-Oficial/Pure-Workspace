import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import {
  DownloadContentFileDto,
  DownloadContentFileResponseDto,
} from '../../dto';
import { EntityNotEmpty, EntityNotExists } from '../../error';
import { Either, left, right } from '../../shared/either';
import {
  DownloadContentFileRepository,
  FindContentFileByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
} from '../../repository';
import { ValidationDirectoryId, ValidationUserId } from '../../utils';

export class DownloadContentFile
  implements
    UseCase<
      DownloadContentFileDto,
      Either<EntityNotEmpty | EntityNotExists, DownloadContentFileResponseDto>
    >
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindDirectoryByIdRepository')
    private findDirectoryByIdRepository: FindDirectoryByIdRepository,
    @Inject('FindContentFileByIdRepository')
    private findContentFileByIdRepository: FindContentFileByIdRepository,
    @Inject('DownloadContentFileRepository')
    private downloadContentFileRepository: DownloadContentFileRepository
  ) {}
  async execute(
    input: DownloadContentFileDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists, DownloadContentFileResponseDto>
  > {
    const { directoryId, idToDownload, loggedUserId } = input;

    if (Object.keys(idToDownload).length < 1) {
      return left(new EntityNotEmpty('ID to download'));
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
      idToDownload
    );

    if (
      Object.keys(filteredContentFile?.id ?? filteredContentFile).length < 1
    ) {
      return left(new EntityNotExists('Content File'));
    }

    const filteredUrl = await this.downloadContentFileRepository.download(
      filteredContentFile.fileName
    );

    if (Object.keys(filteredUrl).length < 1) {
      return left(new EntityNotExists('File'));
    }

    return right({
      url: filteredUrl,
      fileName: filteredContentFile.fileName,
    });
  }
}
