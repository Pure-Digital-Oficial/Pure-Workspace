import {
  DeletePlaylistToScheduling,
  DeletePlaylistToSchedulingDto,
  DeletePlaylistToSchedulingRepository,
  EntityNotExists,
  FindPlaylistByIdRepository,
  FindSchedulingByIdRepository,
  FindUserByIdRepository,
  PlaylistResponseDto,
  Scheduling,
  UserList,
} from '../../../src';
import { PlaylistMock, SchedulingMock, userMock } from '../../entity';
import {
  DeletePlaylistToSchedulingRepositoryMock,
  FindPlaylistByIdRepositoryMock,
  FindSchedulingByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: DeletePlaylistToScheduling;
  deletePlaylistToSchedulingDto: DeletePlaylistToSchedulingDto;
  findUserByIdRepository: FindUserByIdRepository;
  findSchedulingByIdRepository: FindSchedulingByIdRepository;
  findPlaylistByIdRepository: FindPlaylistByIdRepository;
  deletePlaylistToSchedulingRepository: DeletePlaylistToSchedulingRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findSchedulingByIdRepository = new FindSchedulingByIdRepositoryMock();
  const findPlaylistByIdRepository = new FindPlaylistByIdRepositoryMock();
  const deletePlaylistToSchedulingRepository =
    new DeletePlaylistToSchedulingRepositoryMock();

  const deletePlaylistToSchedulingDto: DeletePlaylistToSchedulingDto = {
    loggedUserId: userMock.userId,
    schedulingId: SchedulingMock.id,
    playlistId: PlaylistMock.id,
  };

  const sut = new DeletePlaylistToScheduling(
    findUserByIdRepository,
    findSchedulingByIdRepository,
    findPlaylistByIdRepository,
    deletePlaylistToSchedulingRepository
  );

  return {
    sut,
    deletePlaylistToSchedulingDto,
    findUserByIdRepository,
    findSchedulingByIdRepository,
    findPlaylistByIdRepository,
    deletePlaylistToSchedulingRepository,
  };
};

describe('DeletePlaylistToScheduling', () => {
  it('should return void when a pass correct DeletePlaylistToSchedulingDto', async () => {
    const { sut, deletePlaylistToSchedulingDto } = makeSut();

    const result = await sut.execute(deletePlaylistToSchedulingDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { deletePlaylistToSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deletePlaylistToSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Scheduling ID', async () => {
    const { deletePlaylistToSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Scheduling);
    const result = await sut.execute(deletePlaylistToSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Playlist ID', async () => {
    const { deletePlaylistToSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);
    const result = await sut.execute(deletePlaylistToSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
