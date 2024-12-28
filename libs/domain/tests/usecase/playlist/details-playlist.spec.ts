import {
  DetailsPlaylist,
  DetailsPlaylistDto,
  DetailsPlaylistRepository,
  EntityNotExists,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
  PlaylistResponseDto,
  UserList,
} from '../../../src';
import { PlaylistMock, PlaylistResponseMock, userMock } from '../../entity';
import {
  DetailsPlaylistRepositoryMock,
  FindPlaylistByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: DetailsPlaylist;
  detailsPlaylistDto: DetailsPlaylistDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPlaylistByIdRepository: FindPlaylistByIdRepository;
  detailsPlaylistRepository: DetailsPlaylistRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPlaylistByIdRepository = new FindPlaylistByIdRepositoryMock();
  const detailsPlaylistRepository = new DetailsPlaylistRepositoryMock();

  const detailsPlaylistDto: DetailsPlaylistDto = {
    loggedUserId: userMock.userId,
    playlistId: PlaylistMock.id,
  };

  const sut = new DetailsPlaylist(
    findUserByIdRepository,
    findPlaylistByIdRepository,
    detailsPlaylistRepository
  );

  return {
    findUserByIdRepository,
    findPlaylistByIdRepository,
    detailsPlaylistRepository,
    detailsPlaylistDto,
    sut,
  };
};

describe('DetailsPlaylist', () => {
  it('should return PlaylistResponseDto when a correct DetailsPlaylistDto', async () => {
    const { sut, detailsPlaylistDto } = makeSut();

    const result = await sut.execute(detailsPlaylistDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(PlaylistResponseMock);
  });

  it('should return EntityNotExists if there is no playlist created in the database', async () => {
    const { detailsPlaylistDto, sut } = makeSut();

    jest
      .spyOn(sut['detailsPlaylistRepository'], 'details')
      .mockResolvedValueOnce({} as PlaylistResponseDto);

    const result = await sut.execute(detailsPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { detailsPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(detailsPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Playlist ID', async () => {
    const { detailsPlaylistDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);
    const result = await sut.execute(detailsPlaylistDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
