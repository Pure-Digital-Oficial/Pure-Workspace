import {
  CategoryResponseDto,
  CreateSubCategory,
  CreateSubCategoryDto,
  CreateSubCategoryRepository,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindCategoryByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { SubCategoryMock, userMock } from '../../../entity';
import {
  CreateSubCategoryRepositoryMock,
  FindCategoryByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: CreateSubCategory;
  createSubCategoryDto: CreateSubCategoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryByIdRepository: FindCategoryByIdRepository;
  createSubCategoryRepository: CreateSubCategoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const createSubCategoryRepository = new CreateSubCategoryRepositoryMock();
  const findCategoryByIdRepository = new FindCategoryByIdRepositoryMock();

  const createSubCategoryDto: CreateSubCategoryDto = {
    loggedUserId: userMock.userId,
    body: {
      name: SubCategoryMock.name,
      description: SubCategoryMock.description,
      categoryId: SubCategoryMock.categoryId,
    },
  };

  const sut = new CreateSubCategory(
    findUserByIdRepository,
    findCategoryByIdRepository,
    createSubCategoryRepository
  );

  return {
    sut,
    createSubCategoryDto,
    findUserByIdRepository,
    findCategoryByIdRepository,
    createSubCategoryRepository,
  };
};

describe('CreateSubCategory', () => {
  it('should return SubCategory created successfully when pass correct data in createSubCategoryDto', async () => {
    const { createSubCategoryDto, sut } = makeSut();

    const result = await sut.execute(createSubCategoryDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(SubCategoryMock.id);
  });

  it('should return EntityNotEmpty when pass empty LoggedUserId in createSubCategoryDto', async () => {
    const { createSubCategoryDto, sut } = makeSut();

    createSubCategoryDto.loggedUserId = '';

    const result = await sut.execute(createSubCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in body', async () => {
    const { createSubCategoryDto, sut } = makeSut();

    createSubCategoryDto.body.name = '';

    const result = await sut.execute(createSubCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in body', async () => {
    const { createSubCategoryDto, sut } = makeSut();

    createSubCategoryDto.body.description = '';

    const result = await sut.execute(createSubCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass not exists user ID in loggedUserId', async () => {
    const { createSubCategoryDto, sut } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(createSubCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass not exists category ID in body', async () => {
    const { createSubCategoryDto, sut } = makeSut();

    jest
      .spyOn(sut['findCategoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryResponseDto);

    const result = await sut.execute(createSubCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when a not created sub-category in system', async () => {
    const { createSubCategoryDto, sut } = makeSut();

    jest
      .spyOn(sut['createSubCategoryRepository'], 'create')
      .mockResolvedValueOnce({} as string);

    const result = await sut.execute(createSubCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
