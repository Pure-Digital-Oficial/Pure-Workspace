import {
  CompanyResponseDto,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  ListDirectory,
  ListDirectoryDto,
  ListDirectoryRepository,
  UserList,
} from '../../../src';
import { CompanyMock, userMock } from '../../entity';
import {
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListDirectoryRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: ListDirectory;
  listDirectoryDto: ListDirectoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  listDirectoryRepository: ListDirectoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listDirectoryRepository = new ListDirectoryRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();

  const listDirectoryDto: ListDirectoryDto = {
    loggedUserId: userMock.userId,
    companyId: CompanyMock.simple.id,
    userInput: '',
  };

  const sut = new ListDirectory(
    findUserByIdRepository,
    findCompanyByIdRepository,
    listDirectoryRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    listDirectoryRepository,
    listDirectoryDto,
    sut,
  };
};

describe('ListDirectory', () => {
  it('should return directory list when a correct input data', async () => {
    const { sut, listDirectoryDto } = makeSut();

    const result = await sut.execute(listDirectoryDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
  });

  it('should return EntityNotExists when a not exist User in system', async () => {
    const { listDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a not exist Comapany in system', async () => {
    const { listDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(listDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
