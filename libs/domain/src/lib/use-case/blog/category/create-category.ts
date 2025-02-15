import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { CreateCategoryDto } from '../../../dto';
import {
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotLoaded,
  FileNotAllowed,
} from '../../../error';
import {
  CreateCategoryRepository,
  FindUserByIdRepository,
  UploadContentFileRepository,
} from '../../../repository';
import { Either, left, right } from '../../../shared/either';
import { ValidationUserId } from '../../../utils';

export class CreateCategory
  implements UseCase<CreateCategoryDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('CreateCategoryRepository')
    private createCategoryRepository: CreateCategoryRepository,
    @Inject('UploadContentFileRepository')
    private uploadContentFileRepository: UploadContentFileRepository
  ) {}
  async execute(
    input: CreateCategoryDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const {
      loggedUserId,
      body: { name, description },
      image,
    } = input;

    if (Object.keys(image).length < 1) {
      return left(new EntityNotEmpty('image'));
    }

    if (image && !image.mimetype.includes('image/')) {
      return left(new FileNotAllowed());
    }

    const key = `${Date.now()}-${image.originalname}`;

    const resultUpload = await this.uploadContentFileRepository.upload({
      file: image,
      bucket: process.env['NX_PUBLIC_STORAGE_BUCKET'] ?? '',
      key,
    });

    if (Object.keys(resultUpload).length < 1) {
      return left(new EntityNotLoaded('File'));
    }

    if (Object.keys(name).length < 1) {
      return left(new EntityNotEmpty('Name'));
    }

    if (Object.keys(description).length < 1) {
      return left(new EntityNotEmpty('Description'));
    }

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const createdPost = await this.createCategoryRepository.create({
      loggedUserId,
      body: {
        name,
        description,
      },
      image: {
        ...image,
        path: resultUpload,
        filename: key,
      },
    });

    if (Object.keys(createdPost).length < 1) {
      return left(new EntityNotCreated('Category'));
    }

    return right(createdPost);
  }
}
