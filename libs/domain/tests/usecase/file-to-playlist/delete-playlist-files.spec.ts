import {
  ContentFile,
  DeletePlaylistFileRepository,
  DeletePlaylistFiles,
  DeletePlaylistFilesDto,
  EntityNotAssociate,
  EntityNotExists,
  FindContentFileByIdRepository,
  FindFileInFileToPlaylistRepository,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
  PlaylistResponseDto,
  UserList,
} from '../../../src';
import { ContentFileMock, PlaylistMock, userMock } from '../../entity';
import {
  DeletePlaylistFileRepositoryMock,
  FindContentFileByIdRepositoryMock,
  FindPlaylistByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: DeletePlaylistFiles;
  deletePlaylistFilesDto: DeletePlaylistFilesDto;
  findUserByIdRepository: FindUserByIdRepository;
  findContentFileByIdRepository: FindContentFileByIdRepository;
  findFileInFileToPlaylistRepository: FindFileInFileToPlaylistRepository;
  findPlaylistByIdRepository: FindPlaylistByIdRepository;
  deletePlaylistFileRepository: DeletePlaylistFileRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findContentFileByIdRepository = new FindContentFileByIdRepositoryMock();
  const findFileInFileToPlaylistRepository: FindFileInFileToPlaylistRepository =
    {
      find: jest.fn(async () => ContentFileMock.id),
    };
  const findPlaylistByIdRepository = new FindPlaylistByIdRepositoryMock();
  const deletePlaylistFileRepository = new DeletePlaylistFileRepositoryMock();

  const deletePlaylistFilesDto: DeletePlaylistFilesDto = {
    filesId: [ContentFileMock.id],
    loggedUserId: userMock.userId,
    playlistId: PlaylistMock.id,
  };

  const sut = new DeletePlaylistFiles(
    findUserByIdRepository,
    findContentFileByIdRepository,
    findFileInFileToPlaylistRepository,
    findPlaylistByIdRepository,
    deletePlaylistFileRepository
  );

  return {
    findUserByIdRepository,
    findContentFileByIdRepository,
    findFileInFileToPlaylistRepository,
    findPlaylistByIdRepository,
    deletePlaylistFileRepository,
    deletePlaylistFilesDto,
    sut,
  };
};

describe('DeletePlaylistFiles', () => {
  it('should return undefined when passa correct DeletePlaylistFilesDto', async () => {
    const { sut, deletePlaylistFilesDto } = makeSut();

    const result = await sut.execute(deletePlaylistFilesDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toBeUndefined();
  });

  it('should return EntityNotCreated if there is no file to playlist created in the database', async () => {
    const { sut, deletePlaylistFilesDto } = makeSut();
    jest
      .spyOn(sut['findFileInFileToPlaylistRepository'], 'find')
      .mockResolvedValueOnce('');

    const result = await sut.execute(deletePlaylistFilesDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotAssociate);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { deletePlaylistFilesDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deletePlaylistFilesDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect File ID', async () => {
    const { deletePlaylistFilesDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFileByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ContentFile);
    const result = await sut.execute(deletePlaylistFilesDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Playlist ID', async () => {
    const { deletePlaylistFilesDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);
    const result = await sut.execute(deletePlaylistFilesDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
