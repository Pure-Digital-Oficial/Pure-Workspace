import { Inject } from '@nestjs/common';
import { UseCase } from '../../../base/use-case';
import { EditImageCategoryDto } from '../../../dto';
import {
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotLoaded,
  FileNotAllowed,
} from '../../../error';
import { Either, left, right } from '../../../shared/either';
import {
  DeleteFileByNameRepository,
  EditImageCategoryRepository,
  FindCategoryByIdRepository,
  FindUserByIdRepository,
  UploadContentFileRepository,
} from '../../../repository';
import {
  removeSpecialCharacters,
  ValidationCategoryId,
  ValidationUserId,
} from '../../../utils';

export class EditImageCategory
  implements UseCase<EditImageCategoryDto, Either<EntityNotEmpty, string>>
{
  constructor(
    @Inject('FindUserByIdRepository')
    private findUserByIdRepository: FindUserByIdRepository,
    @Inject('FindCategoryByIdRepository')
    private findCategoryByIdRepository: FindCategoryByIdRepository,
    @Inject('UploadContentFileRepository')
    private uploadContentFileRepository: UploadContentFileRepository,
    @Inject('DeleteFileByNameRepository')
    private deleteFileByNameRepository: DeleteFileByNameRepository,
    @Inject('EditImageCategoryRepository')
    private editImageCategoryRepository: EditImageCategoryRepository
  ) {}
  async execute(
    input: EditImageCategoryDto
  ): Promise<Either<EntityNotEmpty, string>> {
    const { loggedUserId, categoryId, image } = input;

    const userValidation = await ValidationUserId(
      loggedUserId,
      this.findUserByIdRepository
    );

    if (userValidation.isLeft()) {
      return left(userValidation.value);
    }

    const categoryValidation = await ValidationCategoryId(
      categoryId,
      this.findCategoryByIdRepository
    );

    if (categoryValidation.isLeft()) {
      return left(categoryValidation.value);
    }

    if (Object.keys(image).length < 1) {
      return left(new EntityNotEmpty('Image'));
    }

    if (image && !image.mimetype.includes('image/')) {
      return left(new FileNotAllowed());
    }

    // image.originalname = removeSpecialCharacters(image.originalname);

    const key = `${Date.now()}-${image.originalname}`;

    const resultUpload = await this.uploadContentFileRepository.upload({
      file: image,
      bucket: process.env['NX_PUBLIC_STORAGE_BUCKET'] ?? '',
      key,
    });

    if (Object.keys(resultUpload).length < 1) {
      return left(new EntityNotLoaded('File'));
    }

    const filteredCategory = await this.findCategoryByIdRepository.find(
      categoryId
    );

    console.log('filteredCategory', filteredCategory);

    if (Object.keys(filteredCategory?.image_name ?? '').length > 0) {
      const imageCategory = filteredCategory?.image_name;
      console.log('imageCategory', imageCategory);
      await this.deleteFileByNameRepository.delete(imageCategory);
      console.log('deletando imagem');
    }

    const editedCategory = await this.editImageCategoryRepository.edit({
      loggedUserId,
      categoryId,
      image: {
        ...image,
        path: resultUpload,
        filename: key,
      },
    });

    if (Object.keys(editedCategory).length < 1) {
      return left(new EntityNotEdit('Category'));
    }

    return right(editedCategory);
  }
}
