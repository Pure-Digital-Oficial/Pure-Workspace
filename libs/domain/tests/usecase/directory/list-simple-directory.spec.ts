import {
  CompanyResponseDto,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  ListSimpleDirectory,
  ListSimpleDirectoryDto,
  ListSimpleDirectoryRepository,
  UserList,
} from '../../../src';
import {
  CompanyMock,
  ListSimpleDirectoryResponseDtoMock,
  userMock,
} from '../../entity';
import {
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListSimpleDirectoryRespositoryMock,
} from '../../repository';

interface SutTypes {
  sut: ListSimpleDirectory;
  listSimpleDirectoryDto: ListSimpleDirectoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  listSimpleDirectoryRepository: ListSimpleDirectoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listSimpleDirectoryRepository =
    new ListSimpleDirectoryRespositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();

  const listSimpleDirectoryDto: ListSimpleDirectoryDto = {
    loggedUserId: userMock.userId,
    companyId: CompanyMock.simple.id,
    userInput: '',
  };

  const sut = new ListSimpleDirectory(
    findUserByIdRepository,
    findCompanyByIdRepository,
    listSimpleDirectoryRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    listSimpleDirectoryRepository,
    listSimpleDirectoryDto,
    sut,
  };
};

describe('ListSimpleDirectory', () => {
  it('should return ListSimpleDirectoryResponseDto when a correct pass data', async () => {
    const { sut, listSimpleDirectoryDto } = makeSut();

    const result = await sut.execute(listSimpleDirectoryDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(ListSimpleDirectoryResponseDtoMock);
  });

  it('should return EntityNotExists when a not exist User in system', async () => {
    const { listSimpleDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listSimpleDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a not exist Comapany in system', async () => {
    const { listSimpleDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(listSimpleDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
