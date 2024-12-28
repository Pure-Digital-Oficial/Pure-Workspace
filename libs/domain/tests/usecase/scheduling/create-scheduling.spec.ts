import {
  CompanyResponseDto,
  ConvertStringInTimeRepository,
  CreateScheduling,
  CreateSchedulingDto,
  CreateSchedulingRepository,
  EntityAlreadyExists,
  EntityNotConverted,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotNegativeNumber,
  FindCompanyByIdRepository,
  FindSchedulingByNameRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { CompanySimpleMock, SchedulingMock, userMock } from '../../entity';
import {
  ConvertStringInTimeRepositoryMock,
  CreateSchedulingRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindSchedulingByNameRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: CreateScheduling;
  createSchedulingDto: CreateSchedulingDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findSchedulingByNameRepository: FindSchedulingByNameRepository;
  convertStringInTimeRepository: ConvertStringInTimeRepository;
  createSchedulingRepository: CreateSchedulingRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findSchedulingByNameRepository =
    new FindSchedulingByNameRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const convertStringInTimeRepository = new ConvertStringInTimeRepositoryMock();
  const createSchedulingRepository = new CreateSchedulingRepositoryMock();

  const createSchedulingDto: CreateSchedulingDto = {
    loggedUserId: userMock.userId,
    companyId: CompanySimpleMock.id,
    body: {
      name: SchedulingMock.name,
      lopping: SchedulingMock.lopping,
      priority: SchedulingMock.priority,
      startTime: SchedulingMock.startTime,
      endTime: SchedulingMock.endTime,
    },
  };

  const sut = new CreateScheduling(
    findUserByIdRepository,
    findCompanyByIdRepository,
    findSchedulingByNameRepository,
    convertStringInTimeRepository,
    createSchedulingRepository
  );

  return {
    sut,
    createSchedulingDto,
    findUserByIdRepository,
    findCompanyByIdRepository,
    convertStringInTimeRepository,
    findSchedulingByNameRepository,
    createSchedulingRepository,
  };
};

describe('CreateScheduling', () => {
  it('should return Scheduling ID when a pass correct createSchedulingDto', async () => {
    const { sut, createSchedulingDto } = makeSut();

    const result = await sut.execute(createSchedulingDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual(SchedulingMock.id);
  });

  it('should return EntityNotEmpty when a pass incorrect Name', async () => {
    const { sut, createSchedulingDto } = makeSut();
    createSchedulingDto.body.name = '';
    const result = await sut.execute(createSchedulingDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass incorrect End Time', async () => {
    const { sut, createSchedulingDto } = makeSut();
    createSchedulingDto.body.endTime = '';
    const result = await sut.execute(createSchedulingDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass incorrect Start Time', async () => {
    const { sut, createSchedulingDto } = makeSut();
    createSchedulingDto.body.startTime = '';
    const result = await sut.execute(createSchedulingDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotNegativeNumber when a pass incorrect Priority', async () => {
    const { sut, createSchedulingDto } = makeSut();
    createSchedulingDto.body.priority = '-1';
    const result = await sut.execute(createSchedulingDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotNegativeNumber);
  });

  it('should return EntityAlreadyExists when a exist scheduling in database', async () => {
    const { createSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingByNameRepository'], 'find')
      .mockResolvedValueOnce(SchedulingMock);

    const result = await sut.execute(createSchedulingDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when not created Scheduling in database', async () => {
    const { createSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['createSchedulingRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(createSchedulingDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { createSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(createSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Start or End Time', async () => {
    const { createSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['convertStringInTimeRepository'], 'convert')
      .mockResolvedValueOnce(new Date(''));
    const result = await sut.execute(createSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotConverted);
  });

  it('should return EntityNotExists when a no exist company in system', async () => {
    const { createSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(createSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
