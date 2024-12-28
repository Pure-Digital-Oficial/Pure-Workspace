import {
  EntityNotEmpty,
  EntityNotExists,
  FindSchedulingById,
  FindSchedulingByIdDto,
  FindSchedulingByIdRepository,
  FindUserByIdRepository,
  Scheduling,
  UserList,
} from '../../../src';
import { SchedulingMock, userMock } from '../../entity';
import {
  FindSchedulingByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: FindSchedulingById;
  findSchedulingByIdDto: FindSchedulingByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findSchedulingByIdRepository: FindSchedulingByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findSchedulingByIdRepository = new FindSchedulingByIdRepositoryMock();

  const findSchedulingByIdDto: FindSchedulingByIdDto = {
    id: SchedulingMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new FindSchedulingById(
    findUserByIdRepository,
    findSchedulingByIdRepository
  );

  return {
    sut,
    findSchedulingByIdDto,
    findUserByIdRepository,
    findSchedulingByIdRepository,
  };
};

describe('FindSchedulingById', () => {
  it('should return Scheduling when a pass correct FindSchedulingByIdDto', async () => {
    const { sut, findSchedulingByIdDto } = makeSut();

    const result = await sut.execute(findSchedulingByIdDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(SchedulingMock);
  });

  it('should return EntityNotEmpty when pass incorrect Scheduling ID', async () => {
    const { sut, findSchedulingByIdDto } = makeSut();
    findSchedulingByIdDto.id = '';
    const result = await sut.execute(findSchedulingByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist scheduling in database', async () => {
    const { sut, findSchedulingByIdDto } = makeSut();
    jest
      .spyOn(sut['findSchedulingByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Scheduling);

    const result = await sut.execute(findSchedulingByIdDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { findSchedulingByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findSchedulingByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
