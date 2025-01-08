import {
  CreateCategory,
  CreateCategoryDto,
  CreateCategoryRepository,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CategoryMock, userMock } from '../../../entity';
import {
  CreateCategoryRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: CreateCategory;
  createCategoryDto: CreateCategoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  createCategoryRepository: CreateCategoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const createCategoryRepository = new CreateCategoryRepositoryMock();

  const createCategoryDto: CreateCategoryDto = {
    loggedUserId: userMock.userId,
    body: {
      name: CategoryMock.name,
      description: CategoryMock.description,
    },
  };

  const sut = new CreateCategory(
    findUserByIdRepository,
    createCategoryRepository
  );

  return {
    sut,
    createCategoryDto,
    findUserByIdRepository,
    createCategoryRepository,
  };
};

describe('CreateCategory', () => {
  it('should return category ID when pass correct data in createCategoryDto', async () => {
    const { createCategoryDto, sut } = makeSut();

    const result = await sut.execute(createCategoryDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(CategoryMock.id);
  });

  it('should return EntityNotEmpty when pass empty LoggedUserId in externalAuthDto', async () => {
    const { createCategoryDto, sut } = makeSut();

    createCategoryDto.loggedUserId = '';

    const result = await sut.execute(createCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in body', async () => {
    const { createCategoryDto, sut } = makeSut();

    createCategoryDto.body.name = '';

    const result = await sut.execute(createCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in body', async () => {
    const { createCategoryDto, sut } = makeSut();

    createCategoryDto.body.description = '';

    const result = await sut.execute(createCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass not exists user ID in loggedUserId', async () => {
    const { createCategoryDto, sut } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(createCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when a not created category in system', async () => {
    const { createCategoryDto, sut } = makeSut();

    jest
      .spyOn(sut['createCategoryRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(createCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
