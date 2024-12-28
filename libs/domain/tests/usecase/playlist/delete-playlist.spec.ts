import {
  DeleteFileByPlaylistRepository,
  DeletePlaylist,
  DeletePlaylistDto,
  DeletePlaylistRepoistory,
  EntityNotExists,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
  PlaylistResponseDto,
  UserList,
} from '../../../src';
import { PlaylistMock, userMock } from '../../entity';
import {
  DeleteFileByPlaylistRepositoryMock,
  DeletePlaylistRepositoryMock,
  FindPlaylistByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: DeletePlaylist;
  deletePlaylistDto: DeletePlaylistDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPlaylistByIdRepository: FindPlaylistByIdRepository;
  deleteFileByPlaylistRepository: DeleteFileByPlaylistRepository;
  deletePlaylistRepository: DeletePlaylistRepoistory;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPlaylistByIdRepository = new FindPlaylistByIdRepositoryMock();
  const deleteFileByPlaylistRepository =
    new DeleteFileByPlaylistRepositoryMock();
  const deletePlaylistRepository = new DeletePlaylistRepositoryMock();

  const deletePlaylistDto: DeletePlaylistDto = {
    id: PlaylistMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new DeletePlaylist(
    findUserByIdRepository,
    findPlaylistByIdRepository,
    deleteFileByPlaylistRepository,
    deletePlaylistRepository
  );

  return {
    findUserByIdRepository,
    findPlaylistByIdRepository,
    deleteFileByPlaylistRepository,
    deletePlaylistRepository,
    deletePlaylistDto,
    sut,
  };
};

describe('DeletePlaylist', () => {
  it('should return void when a correct playlist deleted in database', async () => {
    const { sut, deletePlaylistDto } = makeSut();

    const result = await sut.execute(deletePlaylistDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { deletePlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deletePlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Playlist ID', async () => {
    const { deletePlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);
    const result = await sut.execute(deletePlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
