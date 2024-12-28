import {
  EntityNotEmpty,
  EntityNotExists,
  FindPlaylistById,
  FindPlaylistByIdDto,
  FindPlaylistByIdRepository,
  FindUserByIdRepository,
  PlaylistResponseDto,
  UserList,
} from '../../../src';
import { PlaylistMock, PlaylistResponseMock, userMock } from '../../entity';
import {
  FindPlaylistByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: FindPlaylistById;
  findPlaylistByIdDto: FindPlaylistByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPlaylistByIdRepository: FindPlaylistByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPlaylistByIdRepository = new FindPlaylistByIdRepositoryMock();

  const findPlaylistByIdDto: FindPlaylistByIdDto = {
    id: PlaylistMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new FindPlaylistById(
    findUserByIdRepository,
    findPlaylistByIdRepository
  );

  return {
    findUserByIdRepository,
    findPlaylistByIdRepository,
    findPlaylistByIdDto,
    sut,
  };
};

describe('FindPlaylistById', () => {
  it('should return playlist when a correct playlist exist in database', async () => {
    const { findPlaylistByIdDto, sut } = makeSut();

    const result = await sut.execute(findPlaylistByIdDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(PlaylistResponseMock);
  });

  it('should return EntityNotEmpty when a pass incorrect Playlist ID', async () => {
    const { findPlaylistByIdDto, sut } = makeSut();
    findPlaylistByIdDto.id = '';
    const result = await sut.execute(findPlaylistByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists if there is no playlist created in the database', async () => {
    const { findPlaylistByIdDto, sut } = makeSut();

    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);

    const result = await sut.execute(findPlaylistByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { findPlaylistByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findPlaylistByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
