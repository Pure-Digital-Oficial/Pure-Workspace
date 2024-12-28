import { Inject } from '@nestjs/common';
import { UseCase } from '../../base/use-case';
import { CreateContentFileDto } from '../../dto';
import {
  EntityNotConverted,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotLoaded,
  FileNotAllowed,
} from '../../error';
import {
  CreateContentFileRepository,
  FindCompanyByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
  GenerateThumbnailRepository,
  UploadContentFileRepository,
} from '../../repository';
import { Either, left, right } from '../../shared/either';
import { FileTypes } from '../../type';
import {
  ValidationCompanyId,
  ValidationDirectoryId,
  ValidationUserId,
} from '../../utils';
import { bufferToStream } from '../../utils';

export class CreateContentFile
  implements
    UseCase<
      CreateContentFileDto,
      Either<EntityNotEmpty | EntityNotExists | EntityNotCreated, string[]>
    >
{
  constructor(
    @Inject('CreateContentFileRepository')
    private createContentFileRepository: CreateContentFileRepository,
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCompanyByIdRepository')
    private findCompanyByIdRepository: FindCompanyByIdRepository,
    @Inject('FindDirectoryByIdRepository')
    private findDirectoryByIdRepository: FindDirectoryByIdRepository,
    @Inject('GenerateThumbnailRepository')
    private generateThumbnailRepository: GenerateThumbnailRepository,
    @Inject('UploadContentFileRepository')
    private uploadContentFileRepository: UploadContentFileRepository
  ) {}
  async execute(
    input: CreateContentFileDto
  ): Promise<
    Either<EntityNotEmpty | EntityNotExists | EntityNotCreated, string[]>
  > {
    const listId = [];
    const { loggedUserId, directoryId, companyId, file } = input;

    if (Object.keys(file).length < 1) {
      return left(new EntityNotEmpty('File'));
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

    const directoryValidation = await ValidationDirectoryId(
      directoryId,
      this.findDirectoryByIdRepository
    );

    if (directoryValidation.isLeft()) {
      return left(directoryValidation.value);
    }

    let error = false;
    for (const item of file) {
      if (!FileTypes.includes(item.mimetype)) {
        error = true;
      }
    }

    if (error === true) {
      return left(new FileNotAllowed());
    }

    for (const item of file) {
      let thumbNailUrl = '';
      if (item.mimetype.startsWith('video/')) {
        const thumbNailKey = `${Date.now()}-${
          item.originalname.split('.')[0]
        }-thumbnail.PNG`;
        const videoStream = bufferToStream(item.buffer);

        const thumbnailBuffer = await this.generateThumbnailRepository.generate(
          {
            file: videoStream,
            key: thumbNailKey,
          }
        );

        if (Object.keys(thumbnailBuffer).length < 1) {
          return left(new EntityNotConverted('Thumbnail'));
        }
        thumbNailUrl = await this.uploadContentFileRepository.upload({
          file: {
            buffer: thumbnailBuffer,
            mimetype: 'image/png',
          },
          bucket: process.env['AWS_S3_BUCKET_NAME'] ?? '',
          key: thumbNailKey,
        });

        if (Object.keys(thumbNailUrl).length < 1) {
          return left(new EntityNotLoaded('Thumbnail'));
        }
      }
      const key = `${Date.now()}-${item.originalname}`;

      const resultUpload = await this.uploadContentFileRepository.upload({
        file: item,
        bucket: process.env['AWS_S3_BUCKET_NAME'] ?? '',
        key,
      });

      if (Object.keys(resultUpload).length < 1) {
        return left(new EntityNotLoaded('File'));
      }

      const filteredContentFileId =
        await this.createContentFileRepository.create({
          file: {
            ...item,
            path: resultUpload,
            filename: key,
          },
          directoryId,
          loggedUserId,
          thumbnail: thumbNailUrl,
          companyId,
        });
      if (Object.keys(filteredContentFileId).length < 1) {
        return left(new EntityNotCreated('Content File'));
      }

      listId.push(filteredContentFileId);
    }

    return right(listId);
  }
}
