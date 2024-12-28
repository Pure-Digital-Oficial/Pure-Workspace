import {
  AddPlaylistsToScheduling,
  AddPlaylistsToSchedulingDto,
  AddPlaylistToSchedulingRepository,
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindPlaylistByIdRepository,
  FindPlaylistToSchedulingByIdsRepository,
  FindSchedulingByIdRepository,
  FindUserByIdRepository,
  PlaylistResponseDto,
  Scheduling,
  UserList,
} from '../../../src';
import {
  PlaylistMock,
  PlaylistToSchedulingMock,
  SchedulingMock,
  userMock,
} from '../../entity';
import {
  AddPlaylistsToSchedulingRepositoryMock,
  FindPlaylistByIdRepositoryMock,
  FindPlaylistToSchedulingByIdsRepositoryMock,
  FindSchedulingByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: AddPlaylistsToScheduling;
  addPlaylistToSchedulingDto: AddPlaylistsToSchedulingDto;
  findUserByIdRepository: FindUserByIdRepository;
  findSchedulingByIdRepository: FindSchedulingByIdRepository;
  findPlaylistByIdRepository: FindPlaylistByIdRepository;
  findPlaylistToSchedulingByIdsRepository: FindPlaylistToSchedulingByIdsRepository;
  addPlaylistsToSchedulingRepository: AddPlaylistToSchedulingRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findSchedulingByIdRepository = new FindSchedulingByIdRepositoryMock();
  const findPlaylistByIdRepository = new FindPlaylistByIdRepositoryMock();
  const findPlaylistToSchedulingByIdsRepository =
    new FindPlaylistToSchedulingByIdsRepositoryMock();
  const addPlaylistsToSchedulingRepository =
    new AddPlaylistsToSchedulingRepositoryMock();

  const addPlaylistToSchedulingDto: AddPlaylistsToSchedulingDto = {
    loggedUserId: userMock.userId,
    schedulingId: SchedulingMock.id,
    playlistIds: [PlaylistMock.id],
  };

  const sut = new AddPlaylistsToScheduling(
    findUserByIdRepository,
    findSchedulingByIdRepository,
    findPlaylistByIdRepository,
    findPlaylistToSchedulingByIdsRepository,
    addPlaylistsToSchedulingRepository
  );

  return {
    sut,
    addPlaylistToSchedulingDto,
    findUserByIdRepository,
    findSchedulingByIdRepository,
    findPlaylistByIdRepository,
    findPlaylistToSchedulingByIdsRepository,
    addPlaylistsToSchedulingRepository,
  };
};

describe('AddPlaylistsToScheduling', () => {
  it('should return list id when pass correct AddPlaylistsToSchedulingDto', async () => {
    const { sut, addPlaylistToSchedulingDto } = makeSut();

    const result = await sut.execute(addPlaylistToSchedulingDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual([PlaylistToSchedulingMock.id]);
  });

  it('should return EntityNotEmpty when pass incorrect Playlist IDs', async () => {
    const { sut, addPlaylistToSchedulingDto } = makeSut();
    addPlaylistToSchedulingDto.playlistIds = [];
    const result = await sut.execute(addPlaylistToSchedulingDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists when a exist scheduling in database', async () => {
    const { sut, addPlaylistToSchedulingDto } = makeSut();
    jest
      .spyOn(sut['addPlaylistToSchedulingRepository'], 'add')
      .mockResolvedValueOnce('');

    const result = await sut.execute(addPlaylistToSchedulingDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityAlreadyExists when a exist scheduling in database', async () => {
    const { sut, addPlaylistToSchedulingDto } = makeSut();
    jest
      .spyOn(sut['findPlaylistToSchedulingByIdsRepository'], 'find')
      .mockResolvedValueOnce(PlaylistToSchedulingMock.id);

    const result = await sut.execute(addPlaylistToSchedulingDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { addPlaylistToSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(addPlaylistToSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Scheduling ID', async () => {
    const { addPlaylistToSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Scheduling);
    const result = await sut.execute(addPlaylistToSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Playlist ID', async () => {
    const { addPlaylistToSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistResponseDto);
    const result = await sut.execute(addPlaylistToSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
