import {
  Device,
  EntityNotExists,
  FindDeviceByIdRepository,
  FindSchedulesByDeviceId,
  FindSchedulesByDeviceIdDto,
  FindSchedulesByDeviceIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { DeviceMock, SchedulingMock, userMock } from '../../entity';
import {
  FindDeviceByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  FindSchedulesByDeviceIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: FindSchedulesByDeviceId;
  findSchedulesByDeviceIdDto: FindSchedulesByDeviceIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDeviceByIdRepository: FindDeviceByIdRepository;
  finSchedulesByDeviceIdRepository: FindSchedulesByDeviceIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDeviceByIdRepository = new FindDeviceByIdRepositoryMock();
  const finSchedulesByDeviceIdRepository =
    new FindSchedulesByDeviceIdRepositoryMock();

  const findSchedulesByDeviceIdDto: FindSchedulesByDeviceIdDto = {
    idDevice: DeviceMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new FindSchedulesByDeviceId(
    findUserByIdRepository,
    findDeviceByIdRepository,
    finSchedulesByDeviceIdRepository
  );

  return {
    sut,
    findSchedulesByDeviceIdDto,
    findUserByIdRepository,
    findDeviceByIdRepository,
    finSchedulesByDeviceIdRepository,
  };
};

describe('FindSchedulesByDeviceId', () => {
  it('should return Scheduling List when pass correct FindSchedulesByDeviceIdDto', async () => {
    const { sut, findSchedulesByDeviceIdDto } = makeSut();

    const result = await sut.execute(findSchedulesByDeviceIdDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toEqual([SchedulingMock]);
  });

  it('should return EntityAlreadyExists when a exist User in system', async () => {
    const { findSchedulesByDeviceIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findSchedulesByDeviceIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when a exist device in system', async () => {
    const { findSchedulesByDeviceIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findDeviceByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Device);
    const result = await sut.execute(findSchedulesByDeviceIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
