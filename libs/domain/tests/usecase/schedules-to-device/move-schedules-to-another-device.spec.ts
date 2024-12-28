import {
  Device,
  EntityAlreadyExists,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotMoved,
  FindDeviceByIdRepository,
  FindSchedulingByIdRepository,
  FindSchedulingToDeviceByIdsRepository,
  FindUserByIdRepository,
  MoveSchedulesToAnotherDevice,
  MoveSchedulesToAnotherDeviceDto,
  MoveSchedulingToAnotherDeviceRepository,
  Scheduling,
  UserList,
} from '../../../src';
import {
  DeviceMock,
  SchedulesToDeviceMock,
  SchedulingMock,
  userMock,
} from '../../entity';
import {
  FindDeviceByIdRepositoryMock,
  FindSchedulingByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  MoveSchedulingToAnotherDeviceRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: MoveSchedulesToAnotherDevice;
  moveSchedulesToAnotherDeviceDto: MoveSchedulesToAnotherDeviceDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDeviceByIdRepository: FindDeviceByIdRepository;
  findSchedulingByIdRepository: FindSchedulingByIdRepository;
  findSchedulingToDeviceByIdsRepository: FindSchedulingToDeviceByIdsRepository;
  moveSchedulingToAnotherDeviceRepository: MoveSchedulingToAnotherDeviceRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDeviceByIdRepository = new FindDeviceByIdRepositoryMock();
  const findSchedulingByIdRepository = new FindSchedulingByIdRepositoryMock();
  const findSchedulingToDeviceByIdsRepository: FindSchedulingToDeviceByIdsRepository =
    {
      find: jest.fn(async () => SchedulesToDeviceMock.id),
    };
  const moveSchedulingToAnotherDeviceRepository =
    new MoveSchedulingToAnotherDeviceRepositoryMock();

  const sut = new MoveSchedulesToAnotherDevice(
    findUserByIdRepository,
    findDeviceByIdRepository,
    findSchedulingByIdRepository,
    findSchedulingToDeviceByIdsRepository,
    moveSchedulingToAnotherDeviceRepository
  );

  return {
    sut,
    findUserByIdRepository,
    findDeviceByIdRepository,
    findSchedulingByIdRepository,
    findSchedulingToDeviceByIdsRepository,
    moveSchedulingToAnotherDeviceRepository,
    moveSchedulesToAnotherDeviceDto: {
      loggedUserId: userMock.userId,
      newDeviceId: DeviceMock.id,
      oldDeviceId: DeviceMock.id,
      schedulesIds: [SchedulingMock.id],
    },
  };
};

describe('MoveSchedulesToAnotherDevice', () => {
  it('should return Scheduling ID and Device ID when pass correct MoveSchedulesToAnotherDeviceDto', async () => {
    const { sut, moveSchedulesToAnotherDeviceDto } = makeSut();
    jest
      .spyOn(sut['findSchedulingToDeviceByIdsRepository'], 'find')
      .mockResolvedValueOnce(SchedulesToDeviceMock.id);
    jest
      .spyOn(sut['findSchedulingToDeviceByIdsRepository'], 'find')
      .mockResolvedValueOnce('');

    const result = await sut.execute(moveSchedulesToAnotherDeviceDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toEqual([SchedulesToDeviceMock.id]);
  });

  it('should return EntityNotEmpty when a pass incorrect schedules id list', async () => {
    const { sut, moveSchedulesToAnotherDeviceDto } = makeSut();
    moveSchedulesToAnotherDeviceDto.schedulesIds = [];
    const result = await sut.execute(moveSchedulesToAnotherDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists when a exist User in system', async () => {
    const { moveSchedulesToAnotherDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(moveSchedulesToAnotherDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when a exist old device in system', async () => {
    const { moveSchedulesToAnotherDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findDeviceByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Device);
    const result = await sut.execute(moveSchedulesToAnotherDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when a exist new device in system', async () => {
    const { moveSchedulesToAnotherDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findDeviceByIdRepository'], 'find')
      .mockResolvedValueOnce(DeviceMock);
    jest
      .spyOn(sut['findDeviceByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Device);
    const result = await sut.execute(moveSchedulesToAnotherDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Scheduling ID', async () => {
    const { moveSchedulesToAnotherDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Scheduling);
    const result = await sut.execute(moveSchedulesToAnotherDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when exist old device in system', async () => {
    const { moveSchedulesToAnotherDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingToDeviceByIdsRepository'], 'find')
      .mockResolvedValueOnce('');

    const result = await sut.execute(moveSchedulesToAnotherDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when exist new device in system', async () => {
    const { moveSchedulesToAnotherDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingToDeviceByIdsRepository'], 'find')
      .mockResolvedValueOnce(SchedulesToDeviceMock.id);
    jest
      .spyOn(sut['findSchedulingToDeviceByIdsRepository'], 'find')
      .mockResolvedValueOnce(SchedulesToDeviceMock.id);

    const result = await sut.execute(moveSchedulesToAnotherDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotMoved when not moved scheduling in system', async () => {
    const { moveSchedulesToAnotherDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingToDeviceByIdsRepository'], 'find')
      .mockResolvedValueOnce(SchedulesToDeviceMock.id);
    jest
      .spyOn(sut['findSchedulingToDeviceByIdsRepository'], 'find')
      .mockResolvedValueOnce('');
    jest
      .spyOn(sut['moveSchedulingToAnotherDeviceRepository'], 'move')
      .mockResolvedValueOnce('');

    const result = await sut.execute(moveSchedulesToAnotherDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotMoved);
  });
});
