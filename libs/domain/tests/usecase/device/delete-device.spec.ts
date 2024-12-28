import {
  DeleteDevice,
  DeleteDeviceDto,
  DeleteDeviceRepository,
  Device,
  EntityNotExists,
  FindDeviceByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { DeviceMock, userMock } from '../../entity';
import {
  DeleteDeviceRepositoryMock,
  FindDeviceByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface sutTypes {
  sut: DeleteDevice;
  deleteDeviceDto: DeleteDeviceDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDeviceByIdRepository: FindDeviceByIdRepository;
  deleteDeviceRepository: DeleteDeviceRepository;
}

const makeSut = (): sutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDeviceByIdRepository = new FindDeviceByIdRepositoryMock();
  const deleteDeviceRepository = new DeleteDeviceRepositoryMock();

  const deleteDeviceDto: DeleteDeviceDto = {
    id: DeviceMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new DeleteDevice(
    findUserByIdRepository,
    findDeviceByIdRepository,
    deleteDeviceRepository
  );

  return {
    sut,
    deleteDeviceDto,
    findUserByIdRepository,
    findDeviceByIdRepository,
    deleteDeviceRepository,
  };
};

describe('DeleteDevice', () => {
  it('should return void when pass correct DeleteDeviceDto', async () => {
    const { sut, deleteDeviceDto } = makeSut();

    const result = await sut.execute(deleteDeviceDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toBe(undefined);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { deleteDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deleteDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist device in system', async () => {
    const { deleteDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findDeviceByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Device);
    const result = await sut.execute(deleteDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
