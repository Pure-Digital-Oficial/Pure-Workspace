import {
  CategoryResponseDto,
  DeleteCategory,
  DeleteCategoryDto,
  DeleteCategoryRepository,
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  FindCategoryByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CategoryMock, userMock } from '../../../entity';
import {
  DeleteCategoryRepositoryMock,
  FindCategoryByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: DeleteCategory;
  deleteCategoryDto: DeleteCategoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCategoryByIdRepository: FindCategoryByIdRepository;
  deleteCategoryRepository: DeleteCategoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCategoryByIdRepository = new FindCategoryByIdRepositoryMock();
  const deleteCategoryRepository = new DeleteCategoryRepositoryMock();

  const deleteCategoryDto: DeleteCategoryDto = {
    id: CategoryMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new DeleteCategory(
    findUserByIdRepository,
    findCategoryByIdRepository,
    deleteCategoryRepository
  );

  return {
    sut,
    deleteCategoryDto,
    findUserByIdRepository,
    findCategoryByIdRepository,
    deleteCategoryRepository,
  };
};

describe('DeleteCategory', () => {
  it('should return category ID when a deleted category when pass correct deleteCategoryDto', async () => {
    const { deleteCategoryDto, sut } = makeSut();

    const result = await sut.execute(deleteCategoryDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(CategoryMock.id);
  });

  it('should return EntityNotEmpty when pass empty user ID in deleteCategoryDto', async () => {
    const { deleteCategoryDto, sut } = makeSut();
    deleteCategoryDto.loggedUserId = '';
    const result = await sut.execute(deleteCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty category ID in deleteCategoryDto', async () => {
    const { deleteCategoryDto, sut } = makeSut();
    deleteCategoryDto.id = '';
    const result = await sut.execute(deleteCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass a not exist user ID in deleteCategoryDto', async () => {
    const { deleteCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deleteCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass a not exist category ID in deleteCategoryDto', async () => {
    const { deleteCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findCategoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryResponseDto);
    const result = await sut.execute(deleteCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotDeleted when not delete category in system', async () => {
    const { deleteCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['deleteCategoryRepository'], 'delete')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
