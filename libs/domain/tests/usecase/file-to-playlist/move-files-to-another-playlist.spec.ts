import {
  ContentFile,
  EntityAlreadyExists,
  EntityNotAssociate,
  EntityNotExists,
  FindContentFileByIdRepository,
  FindFileInFileToPlaylistRepository,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
  MoveFilesToAnotherPlaylist,
  MoveFilesToAnotherPlaylistDto,
  MoveFileToAnotherPlaylistRepository,
  PlaylistResponseDto,
  UserList,
} from '../../../src';
import {
  ContentFileMock,
  PlaylistMock,
  PlaylistResponseMock,
  userMock,
} from '../../entity';
import {
  FindContentFileByIdRepositoryMock,
  FindPlaylistByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  MoveFileToAnotherPlaylistRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: MoveFilesToAnotherPlaylist;
  moveFilesToAnotherPlaylistDto: MoveFilesToAnotherPlaylistDto;
  findUserByIdRepository: FindUserByIdRepository;
  findContentFileByIdRepository: FindContentFileByIdRepository;
  findFileInFileToPlaylistRepository: FindFileInFileToPlaylistRepository;
  findPlaylistByIdRepository: FindPlaylistByIdRepository;
  moveFileToAnotherPlaylistRepository: MoveFileToAnotherPlaylistRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findContentFileByIdRepository = new FindContentFileByIdRepositoryMock();
  const findFileInFileToPlaylistRepository: FindFileInFileToPlaylistRepository =
    {
      find: jest.fn(async () => ContentFileMock.id),
    };
  const findPlaylistByIdRepository = new FindPlaylistByIdRepositoryMock();
  const moveFileToAnotherPlaylistRepository =
    new MoveFileToAnotherPlaylistRepositoryMock();

  const moveFilesToAnotherPlaylistDto: MoveFilesToAnotherPlaylistDto = {
    filesId: [ContentFileMock.id],
    loggedUserId: userMock.userId,
    newPlaylistId: 'any_id',
    oldPlaylistId: PlaylistMock.id,
  };

  const sut = new MoveFilesToAnotherPlaylist(
    findUserByIdRepository,
    findContentFileByIdRepository,
    findPlaylistByIdRepository,
    findFileInFileToPlaylistRepository,
    moveFileToAnotherPlaylistRepository
  );

  return {
    findUserByIdRepository,
    findContentFileByIdRepository,
    findFileInFileToPlaylistRepository,
    findPlaylistByIdRepository,
    moveFileToAnotherPlaylistRepository,
    moveFilesToAnotherPlaylistDto,
    sut,
  };
};

describe('MoveFilesToAnotherPlaylist', () => {
  it('should return void when a correct move files to another playlist dto', async () => {
    const { sut, moveFilesToAnotherPlaylistDto } = makeSut();
    jest
      .spyOn(sut['findFileInFileToPlaylistRepository'], 'find')
      .mockResolvedValueOnce(ContentFileMock.id);
    jest
      .spyOn(sut['findFileInFileToPlaylistRepository'], 'find')
      .mockResolvedValueOnce('');

    const result = await sut.execute(moveFilesToAnotherPlaylistDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotCreated if there is no file to new playlist created in the database', async () => {
    const { moveFilesToAnotherPlaylistDto, sut } = makeSut();

    jest
      .spyOn(sut['findFileInFileToPlaylistRepository'], 'find')
      .mockResolvedValueOnce('');

    const result = await sut.execute(moveFilesToAnotherPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotAssociate);
  });
  it('should return EntityAlreadyExists if there is no file to new playlist created in the database', async () => {
    const { moveFilesToAnotherPlaylistDto, sut } = makeSut();

    jest
      .spyOn(sut['findFileInFileToPlaylistRepository'], 'find')
      .mockResolvedValueOnce(ContentFileMock.id);
    jest
      .spyOn(sut['findFileInFileToPlaylistRepository'], 'find')
      .mockResolvedValueOnce('any_id');

    const result = await sut.execute(moveFilesToAnotherPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });
  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { moveFilesToAnotherPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(moveFilesToAnotherPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect File ID', async () => {
    const { moveFilesToAnotherPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFileByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ContentFile);
    const result = await sut.execute(moveFilesToAnotherPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect new Playlist ID', async () => {
    const { moveFilesToAnotherPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce(PlaylistResponseMock);
    const result = await sut.execute(moveFilesToAnotherPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect old Playlist ID', async () => {
    const { moveFilesToAnotherPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce(PlaylistResponseMock);
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);
    const result = await sut.execute(moveFilesToAnotherPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
