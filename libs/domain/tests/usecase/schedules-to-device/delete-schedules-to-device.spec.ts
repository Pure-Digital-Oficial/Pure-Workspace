import {
  DeleteSchedulesToDevice,
  DeleteSchedulesToDeviceDto,
  DeleteSchedulingToDeviceRepository,
  Device,
  EntityNotDeleted,
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
  DeleteSchedulingToDeviceRepositoryMock,
  FindDeviceByIdRepositoryMock,
  FindSchedulingByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: DeleteSchedulesToDevice;
  deleteSchedulesToDeviceDto: DeleteSchedulesToDeviceDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDeviceByIdRepository: FindDeviceByIdRepository;
  findSchedulingByIdRepository: FindSchedulingByIdRepository;
  findSchedulingToDeviceByIdsRepository: FindSchedulingToDeviceByIdsRepository;
  deleteSchedulingToDeviceRepository: DeleteSchedulingToDeviceRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDeviceByIdRepository = new FindDeviceByIdRepositoryMock();
  const findSchedulingByIdRepository = new FindSchedulingByIdRepositoryMock();
  const findSchedulingToDeviceByIdsRepository: FindSchedulingToDeviceByIdsRepository =
    {
      find: jest.fn(async () => SchedulesToDeviceMock.id),
    };
  const deleteSchedulingToDeviceRepository =
    new DeleteSchedulingToDeviceRepositoryMock();

  const sut = new DeleteSchedulesToDevice(
    findUserByIdRepository,
    findDeviceByIdRepository,
    findSchedulingByIdRepository,
    findSchedulingToDeviceByIdsRepository,
    deleteSchedulingToDeviceRepository
  );

  return {
    sut,
    findUserByIdRepository,
    findDeviceByIdRepository,
    findSchedulingByIdRepository,
    findSchedulingToDeviceByIdsRepository,
    deleteSchedulingToDeviceRepository,
    deleteSchedulesToDeviceDto: {
      idDevice: DeviceMock.id,
      loggedUserId: userMock.userId,
      schedulesIds: [SchedulingMock.id],
    },
  };
};

describe('DeleteSchedulesToDevice', () => {
  it('should return Deleted Schedules List when pass correct DeleteSchedulesToDeviceDto', async () => {
    const { sut, deleteSchedulesToDeviceDto } = makeSut();
    const result = await sut.execute(deleteSchedulesToDeviceDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toEqual([SchedulesToDeviceMock.id]);
  });

  it('should return EntityNotEmpty when pass correct Schedules', async () => {
    const { sut, deleteSchedulesToDeviceDto } = makeSut();
    deleteSchedulesToDeviceDto.schedulesIds = [];
    const result = await sut.execute(deleteSchedulesToDeviceDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists when a exist User in system', async () => {
    const { deleteSchedulesToDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deleteSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when a exist device in system', async () => {
    const { deleteSchedulesToDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findDeviceByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Device);
    const result = await sut.execute(deleteSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Scheduling ID', async () => {
    const { deleteSchedulesToDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Scheduling);
    const result = await sut.execute(deleteSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when exist scheduling to device in system', async () => {
    const { deleteSchedulesToDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingToDeviceByIdsRepository'], 'find')
      .mockResolvedValueOnce('');

    const result = await sut.execute(deleteSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when exist scheduling to device in system', async () => {
    const { deleteSchedulesToDeviceDto, sut } = makeSut();

    jest
      .spyOn(sut['deleteSchedulingToDeviceRepository'], 'delete')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteSchedulesToDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
