import {
  CompanyResponseDto,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  ListPlaylistCategory,
  ListPlaylistCategoryDto,
  ListPlaylistCategoryRepository,
  UserList,
} from '../../../../src';
import {
  CompanyMock,
  ListPlaylistCategoryReponseMock,
  userMock,
} from '../../../entity';
import {
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListPlaylistCategoryRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ListPlaylistCategory;
  listPlaylistCategoryDto: ListPlaylistCategoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  listPlaylistCategoryRepository: ListPlaylistCategoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const listPlaylistCategoryRepository =
    new ListPlaylistCategoryRepositoryMock();

  const listPlaylistCategoryDto: ListPlaylistCategoryDto = {
    loggedUserId: userMock.userId,
    companyId: CompanyMock.simple.id,
    userInput: '',
  };

  const sut = new ListPlaylistCategory(
    findUserByIdRepository,
    findCompanyByIdRepository,
    listPlaylistCategoryRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    listPlaylistCategoryRepository,
    listPlaylistCategoryDto,
    sut,
  };
};

describe('ListPlaylistCategory', () => {
  it('should return playlist category list when a pass correct playlist category', async () => {
    const { sut, listPlaylistCategoryDto } = makeSut();

    const result = await sut.execute(listPlaylistCategoryDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(ListPlaylistCategoryReponseMock);
  });

  it('should return EntityNotExists when a not exist User in system', async () => {
    const { listPlaylistCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listPlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a not exist Company in system', async () => {
    const { listPlaylistCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(listPlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
