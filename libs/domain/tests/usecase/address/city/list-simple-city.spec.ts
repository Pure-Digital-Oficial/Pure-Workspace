import {
  EntityNotEmpty,
  EntityNotExists,
  FindStateByIdRepository,
  FindUserByIdRepository,
  ListSimpleCity,
  ListSimpleCityDto,
  ListSimpleCityRepository,
  StateResponseDto,
  UserList,
} from '../../../../src';
import { CityMock, StateMock, userMock } from '../../../entity';
import {
  FindStateByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListSimpleCityRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ListSimpleCity;
  listSimpleCityDto: ListSimpleCityDto;
  findUserByIdRepository: FindUserByIdRepository;
  findStateByIdRepository: FindStateByIdRepository;
  ListSimpleCityRepository: ListSimpleCityRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findStateByIdRepository = new FindStateByIdRepositoryMock();
  const ListSimpleCityRepository = new ListSimpleCityRepositoryMock();

  const listSimpleCityDto: ListSimpleCityDto = {
    loggedUserId: userMock.userId,
    stateId: StateMock.id,
  };

  const sut = new ListSimpleCity(
    findUserByIdRepository,
    findStateByIdRepository,
    ListSimpleCityRepository
  );

  return {
    findUserByIdRepository,
    findStateByIdRepository,
    ListSimpleCityRepository,
    listSimpleCityDto,
    sut,
  };
};

describe('ListSimpleCity', () => {
  it('should return list simple city when pass correct listSimpleCityDto', async () => {
    const { listSimpleCityDto, sut } = makeSut();

    const result = await sut.execute(listSimpleCityDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual([CityMock]);
  });

  it('should return EntityNotEmpty when pass incorrect State id', async () => {
    const { sut, listSimpleCityDto } = makeSut();
    listSimpleCityDto.stateId = '';
    const result = await sut.execute(listSimpleCityDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { listSimpleCityDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listSimpleCityDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist State in system', async () => {
    const { listSimpleCityDto, sut } = makeSut();
    jest
      .spyOn(sut['findStateByIdRepository'], 'find')
      .mockResolvedValueOnce({} as StateResponseDto);
    const result = await sut.execute(listSimpleCityDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
