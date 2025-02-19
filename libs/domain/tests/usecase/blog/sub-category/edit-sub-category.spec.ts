import {
  CategoryResponseDto,
  EditSubCategory,
  EditSubCategoryDto,
  EditSubCategoryRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindCategoryByIdRepository,
  FindSubCategoryByIdRepository,
  FindUserByIdRepository,
  SubCategoryBodyDto,
  SubCategoryResponseDto,
  UserList,
} from '../../../../src';
import { SubCategoryMock, userMock } from '../../../entity';
import {
  EditSubCategoryRepositoryMock,
  FindCategoryByIdRepositoryMock,
  FindSubCategoryByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: EditSubCategory;
  editSubCategoryDto: EditSubCategoryDto;
  findSubCategoryByIdRepository: FindSubCategoryByIdRepository;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryByIdRepository: FindCategoryByIdRepository;
  editSubCategoryRepository: EditSubCategoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findSubCategoryByIdRepository = new FindSubCategoryByIdRepositoryMock();
  const findCategoryByIdRepository = new FindCategoryByIdRepositoryMock();
  const editSubCategoryRepository = new EditSubCategoryRepositoryMock();

  const editSubCategoryDto: EditSubCategoryDto = {
    id: SubCategoryMock.id,
    loggedUserId: userMock.userId,
    body: {
      name: SubCategoryMock.name,
      description: SubCategoryMock.description,
      categoryId: SubCategoryMock.categoryId,
    },
  };

  const sut = new EditSubCategory(
    findUserByIdRepository,
    editSubCategoryRepository,
    findSubCategoryByIdRepository,
    findCategoryByIdRepository
  );

  return {
    sut,
    editSubCategoryDto,
    findSubCategoryByIdRepository,
    findUserByIdRepository,
    findCategoryByIdRepository,
    editSubCategoryRepository,
  };
};

describe('EditSubCategory', () => {
  it('should return SubCategory ID when pass correct data in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeFalsy();
    expect(response.isRight()).toBeTruthy();
    expect(response.value).toStrictEqual(SubCategoryMock.id);
  });

  it('should retund EntityNotEmpty when pass empty body in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    editSubCategoryDto.body = {} as SubCategoryBodyDto;

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty user ID in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    editSubCategoryDto.loggedUserId = '';

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty category ID in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    editSubCategoryDto.body.categoryId = '';

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty subCategory ID in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    editSubCategoryDto.id = '';

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    editSubCategoryDto.body.name = '';

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    editSubCategoryDto.body.description = '';

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass inexistent User ID in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass inexistent SubCategory ID in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    jest
      .spyOn(sut['findSubCategoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as SubCategoryResponseDto);

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass inexistent Category ID in editSubCategoryDto', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    jest
      .spyOn(sut['findCategoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryResponseDto);

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when not edit SubCategory in editSubCategoryRepository', async () => {
    const { sut, editSubCategoryDto } = makeSut();

    jest
      .spyOn(sut['editSubCategoryRepository'], 'edit')
      .mockResolvedValueOnce('');

    const response = await sut.execute(editSubCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEdit);
  });
});
