import { Inject } from '@nestjs/common';
import { CreateMediasPostDto } from '../../../../dto';
import { UseCase } from '../../../../base/use-case';
import { Either, left, right } from '../../../../shared/either';
import {
  EntityNotConverted,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotLoaded,
  FileNotAllowed,
} from '../../../../error';
import {
  CreateMediaPostRepository,
  FindPostByIdRepository,
  FindUserByIdRepository,
  GenerateThumbnailRepository,
  UploadContentFileRepository,
} from '../../../../repository';
import {
  bufferToStream,
  ValidationPostId,
  ValidationUserId,
} from '../../../../utils';
import { FileTypes } from '../../../../type';

export class CreateMediasPost
  implements UseCase<CreateMediasPostDto, Either<EntityNotEmpty, string[]>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindPostByIdRepository')
    private findPostByIdRepository: FindPostByIdRepository,
    @Inject('GenerateThumbnailRepository')
    private generateThumbnailRepository: GenerateThumbnailRepository,
    @Inject('UploadContentFileRepository')
    private uploadContentFileRepository: UploadContentFileRepository,
    @Inject('CreateMediaPostRepository')
    private createMediaPostRepository: CreateMediaPostRepository
  ) {}
  async execute(
    input: CreateMediasPostDto
  ): Promise<Either<EntityNotEmpty, string[]>> {
    const { files, loggedUserId, postId } = input;
    const listId: string[] = [];

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const postValidation = await ValidationPostId(
      postId,
      this.findPostByIdRepository
    );

    if (postValidation.isLeft()) {
      return left(postValidation.value);
    }

    if (files.length < 1) {
      return left(new EntityNotEmpty('Files'));
    }

    let error = false;
    for (const item of files) {
      if (!FileTypes.includes(item.mimetype)) {
        error = true;
      }
    }

    if (error === true) {
      return left(new FileNotAllowed());
    }

    for (const item of files) {
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

      const filteredContentFileId = await this.createMediaPostRepository.create(
        {
          file: {
            ...item,
            path: resultUpload,
            filename: key,
          },
          loggedUserId,
          postId,
          thumbnail: thumbNailUrl,
        }
      );
      if (Object.keys(filteredContentFileId).length < 1) {
        return left(new EntityNotCreated('Media'));
      }

      listId.push(filteredContentFileId);
    }

    return right(listId);
  }
}
