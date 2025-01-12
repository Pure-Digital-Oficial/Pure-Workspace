import {
  EntityNotEmpty,
  EntityNotExists,
  FindUserByIdRepository,
  ListCategory,
  ListCategoryDto,
  ListCategoryRepository,
  UserList,
} from '../../../../src';
import { ListCategoryResponseMock, userMock } from '../../../entity';
import {
  FindUserByIdRepositoryMock,
  ListCategoryRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ListCategory;
  listCategoryDto: ListCategoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  listCategoryRepository: ListCategoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listCategoryRepository = new ListCategoryRepositoryMock();

  const listCategoryDto: ListCategoryDto = {
    filter: '',
    loggedUserId: userMock.userId,
  };

  const sut = new ListCategory(findUserByIdRepository, listCategoryRepository);

  return {
    sut,
    listCategoryDto,
    findUserByIdRepository,
    listCategoryRepository,
  };
};

describe('ListCategory', () => {
  it('should return Category response List when pass correct data in listCategoryDto', async () => {
    const { listCategoryDto, sut } = makeSut();

    const result = await sut.execute(listCategoryDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListCategoryResponseMock);
  });

  it('should return EntityNotEmpty when pass empty loggedUserId in listCategoryDto', async () => {
    const { listCategoryDto, sut } = makeSut();
    listCategoryDto.loggedUserId = '';
    const result = await sut.execute(listCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass not exists loggedUserId in listCategoryDto', async () => {
    const { listCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listCategoryDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
