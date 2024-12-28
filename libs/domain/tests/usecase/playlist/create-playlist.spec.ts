import {
  CompanyResponseDto,
  CreatePlaylist,
  CreatePlaylistDto,
  CreatePlaylistRepository,
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindPlaylistByNameRepository,
  FindPlaylistCategoryByIdRepository,
  FindUserByIdRepository,
  PlaylistCategory,
  UserList,
} from '../../../src';
import {
  CompanySimpleMock,
  PlaylistCategoryMock,
  PlaylistMock,
  userMock,
} from '../../entity';
import {
  CreatePlaylistRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindPlaylistByNameRepositoryMock,
  FindPlaylistCategoryByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';
interface SutTypes {
  sut: CreatePlaylist;
  createPlaylistDto: CreatePlaylistDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findPlaylistCategoryByIdRepository: FindPlaylistCategoryByIdRepository;
  findPlaylistByNameRepository: FindPlaylistByNameRepository;
  createPlaylistRepository: CreatePlaylistRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const findPlaylistCategoryByIdRepository =
    new FindPlaylistCategoryByIdRepositoryMock();
  const findPlaylistByNameRepository = new FindPlaylistByNameRepositoryMock();
  const createPlaylistRepository = new CreatePlaylistRepositoryMock();

  const createPlaylistDto: CreatePlaylistDto = {
    companyId: CompanySimpleMock.id,
    loggedUserId: userMock.userId,
    name: PlaylistMock.name,
    playlistCategoryId: PlaylistCategoryMock.id,
  };

  const sut = new CreatePlaylist(
    findUserByIdRepository,
    findCompanyByIdRepository,
    findPlaylistCategoryByIdRepository,
    findPlaylistByNameRepository,
    createPlaylistRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    findPlaylistCategoryByIdRepository,
    findPlaylistByNameRepository,
    createPlaylistRepository,
    createPlaylistDto,
    sut,
  };
};

describe('CreatePlaylist', () => {
  it('should return playlist id when a correct playlist created in database', async () => {
    const { sut, createPlaylistDto } = makeSut();

    const result = await sut.execute(createPlaylistDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(PlaylistMock.id);
  });

  it('should return EntityNotEmpty when a pass incorrect name', async () => {
    const { createPlaylistDto, sut } = makeSut();
    createPlaylistDto.name = '';
    const result = await sut.execute(createPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists if there is no user created in the database', async () => {
    const { createPlaylistDto, sut } = makeSut();

    jest
      .spyOn(sut['findPlaylistByNameRepository'], 'find')
      .mockResolvedValueOnce(PlaylistMock);
    const result = await sut.execute(createPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated if there is no user created in the database', async () => {
    const { createPlaylistDto, sut } = makeSut();

    jest
      .spyOn(sut['createPlaylistRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { createPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(createPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Playlist Category User ID', async () => {
    const { createPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistCategoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistCategory);
    const result = await sut.execute(createPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a no exist company in system', async () => {
    const { createPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(createPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
