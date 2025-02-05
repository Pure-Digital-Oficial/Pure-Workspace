import {
  CategoryBodyDto,
  CategoryResponseDto,
  EditCategory,
  EditCategoryDto,
  EditCategoryRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindCategoryByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CategoryMock, userMock } from '../../../entity';
import {
  EditCategoryRepositoryMock,
  FindCategoryByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: EditCategory;
  editCategoryDto: EditCategoryDto;
  findCategoryByIdRepository: FindCategoryByIdRepository;
  findUserByIdRepository: FindUserByIdRepository;
  editCategoryRepostory: EditCategoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCategoryByIdRepository = new FindCategoryByIdRepositoryMock();
  const editCategoryRepostory = new EditCategoryRepositoryMock();

  const editCategoryDto: EditCategoryDto = {
    id: CategoryMock.id,
    loggedUserId: userMock.userId,
    body: {
      name: CategoryMock.name,
      description: CategoryMock.description,
    },
  };

  const sut = new EditCategory(
    findUserByIdRepository,
    editCategoryRepostory,
    findCategoryByIdRepository
  );

  return {
    sut,
    editCategoryDto,
    findUserByIdRepository,
    findCategoryByIdRepository,
    editCategoryRepostory,
  };
};

describe('EditCategory', () => {
  it('should return Category ID when pass correct data in editCategoryDto', async () => {
    const { sut, editCategoryDto } = makeSut();

    const response = await sut.execute(editCategoryDto);

    expect(response.isLeft()).toBeFalsy();
    expect(response.isRight()).toBeTruthy();
    expect(response.value).toStrictEqual(CategoryMock.id);
  });

  it('should return EntityNotEmpty when pass empty body in editCategoryDto', async () => {
    const { sut, editCategoryDto } = makeSut();

    editCategoryDto.body = {} as CategoryBodyDto;

    const response = await sut.execute(editCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty user ID in editCategoryDto', async () => {
    const { sut, editCategoryDto } = makeSut();

    editCategoryDto.loggedUserId = '';

    const response = await sut.execute(editCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty category ID in editCategoryDto', async () => {
    const { sut, editCategoryDto } = makeSut();

    editCategoryDto.id = '';

    const response = await sut.execute(editCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in editCategoryDto', async () => {
    const { sut, editCategoryDto } = makeSut();

    editCategoryDto.body.name = '';

    const response = await sut.execute(editCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in editCategoryDto', async () => {
    const { sut, editCategoryDto } = makeSut();

    editCategoryDto.body.description = '';

    const response = await sut.execute(editCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass inexistent User ID in editCategoryDto', async () => {
    const { sut, editCategoryDto } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const response = await sut.execute(editCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when pass inexistent Category ID in editCategoryDto', async () => {
    const { sut, editCategoryDto } = makeSut();

    jest
      .spyOn(sut['findCategoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CategoryResponseDto);

    const response = await sut.execute(editCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when not edit any field in editCategoryDto', async () => {
    const { sut, editCategoryDto } = makeSut();

    jest.spyOn(sut['editCategoryRepository'], 'edit').mockResolvedValueOnce('');

    const response = await sut.execute(editCategoryDto);

    expect(response.isLeft()).toBeTruthy();
    expect(response.isRight()).toBeFalsy();
    expect(response.value).toBeInstanceOf(EntityNotEdit);
  });
});
