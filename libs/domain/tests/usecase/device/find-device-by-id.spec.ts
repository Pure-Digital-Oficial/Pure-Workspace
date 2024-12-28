import {
  Device,
  EntityNotEmpty,
  EntityNotExists,
  FindDeviceById,
  FindDeviceByIdDto,
  FindDeviceByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { DeviceMock, userMock } from '../../entity';
import {
  FindDeviceByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: FindDeviceById;
  findDeviceByIdDto: FindDeviceByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDeviceByIdRepository: FindDeviceByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDeviceByIdRepository = new FindDeviceByIdRepositoryMock();

  const findDeviceByIdDto: FindDeviceByIdDto = {
    id: DeviceMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new FindDeviceById(
    findUserByIdRepository,
    findDeviceByIdRepository
  );

  return {
    sut,
    findDeviceByIdDto,
    findUserByIdRepository,
    findDeviceByIdRepository,
  };
};

describe('FindDeviceById', () => {
  it('should return Device when pass correct FindDeviceByIdDto', async () => {
    const { sut, findDeviceByIdDto } = makeSut();

    const result = await sut.execute(findDeviceByIdDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toEqual(DeviceMock);
  });

  it('should return EntityNotEmpty when pass incorrect Device ID', async () => {
    const { sut, findDeviceByIdDto } = makeSut();
    findDeviceByIdDto.id = '';
    const result = await sut.execute(findDeviceByIdDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { findDeviceByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findDeviceByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist device in system', async () => {
    const { findDeviceByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findDeviceByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Device);
    const result = await sut.execute(findDeviceByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
