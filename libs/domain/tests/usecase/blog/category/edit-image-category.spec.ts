import {
  DeleteFileByNameRepository,
  EditImageCategory,
  EditImageCategoryDto,
  EditImageCategoryRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotLoaded,
  FileNotAllowed,
  FindCategoryByIdRepository,
  FindUserByIdRepository,
  UploadContentFileRepository,
} from '../../../../src';
import { CategoryMock, userMock } from '../../../entity';
import {
  DeleteFileByNameRepositoryMock,
  EditImageCategoryRepositoryMock,
  FindCategoryByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  UploadContentFileRepositoryMock,
} from '../../../repository';
import { UploadedFile } from '../../../../src/lib/entity';

interface SutTypes {
  sut: EditImageCategory;
  editImageCategoryDto: EditImageCategoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryByIdRepository: FindCategoryByIdRepository;
  uploadContentFileRepository: UploadContentFileRepository;
  deleteFileByNameRepository: DeleteFileByNameRepository;
  editImageCategoryRepository: EditImageCategoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCategoryByIdRepository = new FindCategoryByIdRepositoryMock();
  const uploadContentFileRepository = new UploadContentFileRepositoryMock();
  const deleteFileByNameRepository = new DeleteFileByNameRepositoryMock();
  const editImageCategoryRepository = new EditImageCategoryRepositoryMock();

  const editImageCategoryDto: EditImageCategoryDto = {
    loggedUserId: userMock.userId,
    categoryId: CategoryMock.id,
    image: {
      mimetype: 'image/png',
      originalname: 'image.png',
      buffer: Buffer.from('image.png'),
      encoding: '7bit',
      fieldname: 'image',
      filename: 'image.png',
      path: 'image.png',
      size: 100,
    },
  };

  const sut = new EditImageCategory(
    findUserByIdRepository,
    findCategoryByIdRepository,
    uploadContentFileRepository,
    deleteFileByNameRepository,
    editImageCategoryRepository
  );

  return {
    sut,
    editImageCategoryDto,
    findUserByIdRepository,
    findCategoryByIdRepository,
    uploadContentFileRepository,
    deleteFileByNameRepository,
    editImageCategoryRepository,
  };
};

describe('EditImageCategory', () => {
  it('should return Category ID when pass correct data in editImageCategoryDto', async () => {
    const { sut, editImageCategoryDto } = makeSut();
    const response = await sut.execute(editImageCategoryDto);

    expect(response.isLeft()).toBeFalsy();
    expect(response.isRight()).toBeTruthy();
    expect(response.value).toEqual(CategoryMock.id);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in editImageCategoryDto', async () => {
    const { sut, editImageCategoryDto } = makeSut();
    editImageCategoryDto.loggedUserId = '';

    const response = await sut.execute(editImageCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty categoryId in editImageCategoryDto', async () => {
    const { sut, editImageCategoryDto } = makeSut();
    editImageCategoryDto.categoryId = '';

    const response = await sut.execute(editImageCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty image in editImageCategoryDto', async () => {
    const { sut, editImageCategoryDto } = makeSut();
    editImageCategoryDto.image = {} as UploadedFile;

    const response = await sut.execute(editImageCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return FileNotAllowed when pass invalid mimetype in editImageCategoryDto', async () => {
    const { sut, editImageCategoryDto } = makeSut();
    editImageCategoryDto.image.mimetype = '';

    const response = await sut.execute(editImageCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(FileNotAllowed);
  });

  it('should return EntityNotLoaded when file upload fails', async () => {
    const { sut, editImageCategoryDto } = makeSut();
    jest
      .spyOn(sut['uploadContentFileRepository'], 'upload')
      .mockResolvedValueOnce('');

    const response = await sut.execute(editImageCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotLoaded);
  });

  it('should return EntityNotEdit when edit image fails', async () => {
    const { sut, editImageCategoryDto } = makeSut();
    jest
      .spyOn(sut['editImageCategoryRepository'], 'edit')
      .mockResolvedValueOnce('');

    const response = await sut.execute(editImageCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEdit);
  });
});
