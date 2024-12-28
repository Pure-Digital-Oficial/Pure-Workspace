import {
  EntityNotExists,
  FindSchedulingByIdRepository,
  FindUserByIdRepository,
  ListPlaylistBySchedulingId,
  ListPlaylistBySchedulingIdDto,
  ListPlaylistBySchedulingIdRepository,
  Scheduling,
  UserList,
} from '../../../src';
import {
  ListPlaylistResponseMock,
  SchedulingMock,
  userMock,
} from '../../entity';
import {
  FindUserByIdRepositoryMock,
  FindSchedulingByIdRepositoryMock,
  ListPlaylistBySchedulingIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: ListPlaylistBySchedulingId;
  listPlaylistBySchedulingIdDto: ListPlaylistBySchedulingIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findSchedulingByIdRepository: FindSchedulingByIdRepository;
  listPlaylistBySchedulingIdRepository: ListPlaylistBySchedulingIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findSchedulingByIdRepository = new FindSchedulingByIdRepositoryMock();
  const listPlaylistBySchedulingIdRepository =
    new ListPlaylistBySchedulingIdRepositoryMock();

  const listPlaylistBySchedulingIdDto: ListPlaylistBySchedulingIdDto = {
    filter: '',
    id: SchedulingMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new ListPlaylistBySchedulingId(
    findUserByIdRepository,
    findSchedulingByIdRepository,
    listPlaylistBySchedulingIdRepository
  );

  return {
    sut,
    listPlaylistBySchedulingIdDto,
    findUserByIdRepository,
    findSchedulingByIdRepository,
    listPlaylistBySchedulingIdRepository,
  };
};

describe('ListPlaylistBySchedulingId', () => {
  it('should return ListPlaylistResponseDto when a pass correct ListPlaylistDto', async () => {
    const { sut, listPlaylistBySchedulingIdDto } = makeSut();

    const result = await sut.execute(listPlaylistBySchedulingIdDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual(ListPlaylistResponseMock);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { listPlaylistBySchedulingIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listPlaylistBySchedulingIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Scheduling ID', async () => {
    const { listPlaylistBySchedulingIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Scheduling);
    const result = await sut.execute(listPlaylistBySchedulingIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
