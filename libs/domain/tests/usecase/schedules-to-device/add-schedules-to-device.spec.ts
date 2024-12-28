import {
  AddSchedulesToDevice,
  AddSchedulesToDeviceDto,
  AddSchedulingToDeviceRepository,
  Device,
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindDeviceByIdRepository,
  FindSchedulingByIdRepository,
  FindSchedulingToDeviceByIdsRepository,
  FindUserByIdRepository,
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
  AddSchedulingToDeviceRepositoryMock,
  FindDeviceByIdRepositoryMock,
  FindSchedulingByIdRepositoryMock,
  FindSchedulingToDeviceByIdsRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: AddSchedulesToDevice;
  addSchedulesToDeviceDto: AddSchedulesToDeviceDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDeviceByIdRepository: FindDeviceByIdRepository;
  findSchedulingByIdRepository: FindSchedulingByIdRepository;
  findSchedulingToDeviceByIdsRepository: FindSchedulingToDeviceByIdsRepository;
  addSchedulingToDeviceRepository: AddSchedulingToDeviceRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDeviceByIdRepository = new FindDeviceByIdRepositoryMock();
  const findSchedulingByIdRepository = new FindSchedulingByIdRepositoryMock();
  const findSchedulingToDeviceByIdsRepository =
    new FindSchedulingToDeviceByIdsRepositoryMock();
  const addSchedulingToDeviceRepository =
    new AddSchedulingToDeviceRepositoryMock();

  const addSchedulesToDeviceDto: AddSchedulesToDeviceDto = {
    idDevice: DeviceMock.id,
    loggedUserId: userMock.userId,
    schedulesIds: [SchedulingMock.id],
  };

  const sut = new AddSchedulesToDevice(
    findUserByIdRepository,
    findDeviceByIdRepository,
    findSchedulingByIdRepository,
    findSchedulingToDeviceByIdsRepository,
    addSchedulingToDeviceRepository
  );

  return {
    sut,
    addSchedulesToDeviceDto,
    findUserByIdRepository,
    findDeviceByIdRepository,
    findSchedulingByIdRepository,
    findSchedulingToDeviceByIdsRepository,
    addSchedulingToDeviceRepository,
  };
};

describe('AddSchedulesToDevice', () => {
  it('should return device and scheduling ID when pass correct AddSchedulesToDeviceDto', async () => {
    const { sut, addSchedulesToDeviceDto } = makeSut();

    const result = await sut.execute(addSchedulesToDeviceDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual([SchedulesToDeviceMock.id]);
  });

  it('should return EntityNotEmpty when pass correct Schedules', async () => {
    const { sut, addSchedulesToDeviceDto } = makeSut();
    addSchedulesToDeviceDto.schedulesIds = [];
    const result = await sut.execute(addSchedulesToDeviceDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists when a exist User in system', async () => {
    const { addSchedulesToDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(addSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when a exist device in system', async () => {
    const { addSchedulesToDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findDeviceByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Device);
    const result = await sut.execute(addSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Scheduling ID', async () => {
    const { addSchedulesToDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Scheduling);
    const result = await sut.execute(addSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when exist scheduling to device in system', async () => {
    const { addSchedulesToDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingToDeviceByIdsRepository'], 'find')
      .mockResolvedValueOnce('any_id');
    const result = await sut.execute(addSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when a not created scheduling in device', async () => {
    const { addSchedulesToDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['addSchedulingToDeviceRepository'], 'add')
      .mockResolvedValueOnce('');
    const result = await sut.execute(addSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
