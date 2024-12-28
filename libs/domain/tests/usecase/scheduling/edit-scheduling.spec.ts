import {
  ConvertStringInTimeRepository,
  EditScheduling,
  EditSchedulingDto,
  EditSchedulingRepository,
  EntityNotConverted,
  EntityNotEmpty,
  EntityNotExists,
  FindSchedulingByIdRepository,
  FindUserByIdRepository,
  Scheduling,
  UserList,
} from '../../../src';
import { SchedulingMock, userMock } from '../../entity';
import {
  ConvertStringInTimeRepositoryMock,
  EditSchedulingRepositoryMock,
  FindSchedulingByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: EditScheduling;
  editSchedulingDto: EditSchedulingDto;
  findUserByIdRepository: FindUserByIdRepository;
  findSchedulingByIdRepository: FindSchedulingByIdRepository;
  convertStringInTimeRepository: ConvertStringInTimeRepository;
  editSchedulingRepository: EditSchedulingRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findSchedulingByIdRepository = new FindSchedulingByIdRepositoryMock();
  const convertStringInTimeRepository = new ConvertStringInTimeRepositoryMock();
  const editSchedulingRepository = new EditSchedulingRepositoryMock();

  const editSchedulingDto: EditSchedulingDto = {
    id: SchedulingMock.id,
    body: {
      endTime: SchedulingMock.endTime,
      name: SchedulingMock.name,
      priority: SchedulingMock.priority,
      startTime: SchedulingMock.startTime,
      lopping: SchedulingMock.lopping,
    },
    loggedUserId: userMock.userId,
  };

  const sut = new EditScheduling(
    findUserByIdRepository,
    findSchedulingByIdRepository,
    convertStringInTimeRepository,
    editSchedulingRepository
  );

  return {
    sut,
    editSchedulingDto,
    findUserByIdRepository,
    findSchedulingByIdRepository,
    convertStringInTimeRepository,
    editSchedulingRepository,
  };
};

describe('EditScheduling', () => {
  it('should return undefined when delete scheduling and pass correct EditSchedulingDto', async () => {
    const { sut, editSchedulingDto } = makeSut();

    const result = await sut.execute(editSchedulingDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual(SchedulingMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect Name', async () => {
    const { sut, editSchedulingDto } = makeSut();
    editSchedulingDto.body.name = '';
    const result = await sut.execute(editSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect End Time', async () => {
    const { sut, editSchedulingDto } = makeSut();
    editSchedulingDto.body.endTime = '';
    const result = await sut.execute(editSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Start Time', async () => {
    const { sut, editSchedulingDto } = makeSut();
    editSchedulingDto.body.startTime = '';
    const result = await sut.execute(editSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Priority', async () => {
    const { sut, editSchedulingDto } = makeSut();
    editSchedulingDto.body.priority = '';
    const result = await sut.execute(editSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { editSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Scheduling ID', async () => {
    const { editSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['findSchedulingByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Scheduling);
    const result = await sut.execute(editSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Start or End Time', async () => {
    const { editSchedulingDto, sut } = makeSut();
    jest
      .spyOn(sut['convertStringInTimeRepository'], 'convert')
      .mockResolvedValueOnce(new Date(''));
    const result = await sut.execute(editSchedulingDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotConverted);
  });
});
