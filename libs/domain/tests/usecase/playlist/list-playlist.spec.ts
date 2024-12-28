import {
  CompanyResponseDto,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  ListPlaylist,
  ListPlaylistDto,
  ListPlaylistRepository,
  UserList,
} from '../../../src';
import { CompanyMock, ListPlaylistResponseMock, userMock } from '../../entity';
import {
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListPlaylistRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: ListPlaylist;
  listPlaylistDto: ListPlaylistDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  listPlaylistRepository: ListPlaylistRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listPlaylistRepository = new ListPlaylistRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();

  const listPlaylistDto: ListPlaylistDto = {
    loggedUserId: userMock.userId,
    companyId: CompanyMock.simple.id,
    userInput: '',
  };

  const sut = new ListPlaylist(
    findUserByIdRepository,
    findCompanyByIdRepository,
    listPlaylistRepository
  );

  return {
    findUserByIdRepository,
    listPlaylistRepository,
    findCompanyByIdRepository,
    listPlaylistDto,
    sut,
  };
};

describe('ListPlaylist', () => {
  it('should return playlist list when a correct input data', async () => {
    const { sut, listPlaylistDto } = makeSut();

    const result = await sut.execute(listPlaylistDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(ListPlaylistResponseMock);
  });

  it('should return EntityNotExists when a not exist User in system', async () => {
    const { listPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a not exist Company in system', async () => {
    const { listPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(listPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
