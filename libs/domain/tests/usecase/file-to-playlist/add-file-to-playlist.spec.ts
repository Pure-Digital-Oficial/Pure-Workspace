import {
  AddFileToPlaylist,
  AddFileToPlaylistDto,
  AddFileToPlaylistRepository,
  ContentFile,
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotExists,
  FindContentFileByIdRepository,
  FindFileInFileToPlaylistRepository,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
  PlaylistResponseDto,
  UserList,
} from '../../../src';
import {
  ContentFileMock,
  FileToPlaylistMock,
  PlaylistMock,
  userMock,
} from '../../entity';
import {
  AddFileToPlaylistRepositoryMock,
  FindContentFileByIdRepositoryMock,
  FindFileInFileToPlaylistRepositoryMock,
  FindPlaylistByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: AddFileToPlaylist;
  addtFileToPlaylistDto: AddFileToPlaylistDto;
  findUserByIdRepository: FindUserByIdRepository;
  findContentFileByIdRepository: FindContentFileByIdRepository;
  findFileInFileToPlaylistRepository: FindFileInFileToPlaylistRepository;
  findPlaylistByIdRepository: FindPlaylistByIdRepository;
  addFileToPlaylistRepository: AddFileToPlaylistRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findContentFileByIdRepository = new FindContentFileByIdRepositoryMock();
  const findFileInFileToPlaylistRepository =
    new FindFileInFileToPlaylistRepositoryMock();
  const findPlaylistByIdRepository = new FindPlaylistByIdRepositoryMock();
  const addFileToPlaylistRepository = new AddFileToPlaylistRepositoryMock();

  const addtFileToPlaylistDto: AddFileToPlaylistDto = {
    filesId: [ContentFileMock.id],
    loggedUserId: userMock.userId,
    playlistId: PlaylistMock.id,
  };

  const sut = new AddFileToPlaylist(
    findUserByIdRepository,
    findContentFileByIdRepository,
    findFileInFileToPlaylistRepository,
    findPlaylistByIdRepository,
    addFileToPlaylistRepository
  );

  return {
    findUserByIdRepository,
    findContentFileByIdRepository,
    findFileInFileToPlaylistRepository,
    findPlaylistByIdRepository,
    addFileToPlaylistRepository,
    addtFileToPlaylistDto,
    sut,
  };
};

describe('AddFileToPlaylist', () => {
  it('should return file to playlist id when a correct add file to playlist dto', async () => {
    const { sut, addtFileToPlaylistDto } = makeSut();

    const result = await sut.execute(addtFileToPlaylistDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual([FileToPlaylistMock.id]);
  });

  it('should return EntityNotCreated if there is no file to playlist created in the database', async () => {
    const { addtFileToPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['addFileToPlaylistRepository'], 'add')
      .mockResolvedValueOnce([]);

    const result = await sut.execute(addtFileToPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityAlreadyExists if there is exist file in file to playlist in the database', async () => {
    const { sut, addtFileToPlaylistDto } = makeSut();
    jest
      .spyOn(sut['findFileInFileToPlaylistRepository'], 'find')
      .mockResolvedValueOnce(ContentFileMock.id);

    const result = await sut.execute(addtFileToPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { addtFileToPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(addtFileToPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect File ID', async () => {
    const { addtFileToPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFileByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ContentFile);
    const result = await sut.execute(addtFileToPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Playlist ID', async () => {
    const { addtFileToPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);
    const result = await sut.execute(addtFileToPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
