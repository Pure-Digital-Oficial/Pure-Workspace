import {
  EntityNotExists,
  FindFilesByPlaylist,
  FindFilesByPlaylistDto,
  FindFilesByPlaylistRepository,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
  PlaylistResponseDto,
  UserList,
} from '../../../src';
import { ContentFileMock, PlaylistMock, userMock } from '../../entity';
import {
  FindFilesByPlaylistRepositoryMock,
  FindPlaylistByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: FindFilesByPlaylist;
  findFilesByPlaylistDto: FindFilesByPlaylistDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPlaylistByIdRepository: FindPlaylistByIdRepository;
  findFilesByPlaylistRepository: FindFilesByPlaylistRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPlaylistByIdRepository = new FindPlaylistByIdRepositoryMock();
  const findFilesByPlaylistRepository = new FindFilesByPlaylistRepositoryMock();

  const findFilesByPlaylistDto: FindFilesByPlaylistDto = {
    idPlaylist: PlaylistMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new FindFilesByPlaylist(
    findUserByIdRepository,
    findPlaylistByIdRepository,
    findFilesByPlaylistRepository
  );

  return {
    sut,
    findFilesByPlaylistDto,
    findUserByIdRepository,
    findPlaylistByIdRepository,
    findFilesByPlaylistRepository,
  };
};

describe('FindFilesByPlaylist', () => {
  it('should return PlaylistResponseDto when a correct DetailsPlaylistDto', async () => {
    const { findFilesByPlaylistDto, sut } = makeSut();
    [ContentFileMock];
    const result = await sut.execute(findFilesByPlaylistDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual({
      total: 1,
      totalPages: 1,
      files: [ContentFileMock],
    });
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { findFilesByPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findFilesByPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Playlist ID', async () => {
    const { findFilesByPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);
    const result = await sut.execute(findFilesByPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
