import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreatePostDto } from '../../../dto';
import {
  EntityNotComplete,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
} from '../../../error';
import {
  CreatePostRepository,
  FindAppByIdRepository,
  FindUserByIdRepository,
  UploadContentFileRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationUserId } from '../../../utils';

export class CreatePost
  implements UseCase<CreatePostDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindAppByIdRepository')
    private findAppByIdRepository: FindAppByIdRepository,
    @Inject('UploadContentFileRepository')
    private uploadContentFileRepository: UploadContentFileRepository,
    @Inject('CreatePostRepository')
    private createPostRepository: CreatePostRepository
  ) {}
  async execute(input: CreatePostDto): Promise<Either<EntityNotEmpty, string>> {
    const {
      appId,
      loggedUserId,
      body: { content, description, subTitle, title, coverImage },
    } = input;

    if (Object.keys(appId).length < 1) {
      return left(new EntityNotEmpty('App ID'));
    }

    if (Object.keys(input.body).length < 1) {
      return left(new EntityNotEmpty('Body'));
    }

    if (Object.keys(content).length < 1) {
      return left(new EntityNotEmpty('Content'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    if (Object.keys(subTitle).length < 1) {
      return left(new EntityNotEmpty('SubTitle'));
    }

    if (Object.keys(title).length < 1) {
      return left(new EntityNotEmpty('Title'));
    }

    if (Object.keys(coverImage).length < 1) {
      return left(new EntityNotEmpty('Cover Image'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const filteredAppId = await this.findAppByIdRepository.find(appId);
    if (
      Object.keys(filteredAppId).length < 1 ||
      Object.keys(filteredAppId?.id).length < 1
    ) {
      return left(new EntityNotExists('app ID'));
    }

    const key = `${Date.now()}-${coverImage.originalname}`;

    const resultUpload = await this.uploadContentFileRepository.upload({
      file: coverImage,
      bucket: process.env['NX_PUBLIC_STORAGE_BUCKET'] ?? '',
      key,
    });

    if (Object.keys(resultUpload).length < 1) {
      return left(new EntityNotComplete('Upload from Cover Image'));
    }

    const createdPost = await this.createPostRepository.create({
      ...input,
      body: {
        ...input.body,
        coverImage: resultUpload,
      },
    });

    if (Object.keys(createdPost).length < 1) {
      return left(new EntityNotCreated('Post'));
    }

    return right(createdPost);
  }
}
