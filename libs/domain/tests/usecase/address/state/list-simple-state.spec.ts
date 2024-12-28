import {
  CountryResponseDto,
  EntityNotEmpty,
  EntityNotExists,
  FindCountryByIdRepository,
  FindUserByIdRepository,
  ListSimpleState,
  ListSimpleStateDto,
  ListSimpleStateRepository,
  UserList,
} from '../../../../src';
import { CountryMock, ListSimpleStateMock, userMock } from '../../../entity';
import {
  FindCountryByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListSimpleStateRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ListSimpleState;
  listSimpleStateDto: ListSimpleStateDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCountryByIdRepository: FindCountryByIdRepository;
  listSimpleStateRepository: ListSimpleStateRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCountryByIdRepository = new FindCountryByIdRepositoryMock();
  const listSimpleStateRepository = new ListSimpleStateRepositoryMock();

  const listSimpleStateDto: ListSimpleStateDto = {
    countryId: CountryMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new ListSimpleState(
    findUserByIdRepository,
    findCountryByIdRepository,
    listSimpleStateRepository
  );

  return {
    findUserByIdRepository,
    findCountryByIdRepository,
    listSimpleStateRepository,
    listSimpleStateDto,
    sut,
  };
};

describe('ListSimpleState', () => {
  it('should return list simple state when pass correct listSimpleStateDto', async () => {
    const { listSimpleStateDto, sut } = makeSut();

    const result = await sut.execute(listSimpleStateDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual([ListSimpleStateMock]);
  });

  it('should return EntityNotEmpty when pass incorrect Counntry id', async () => {
    const { sut, listSimpleStateDto } = makeSut();
    listSimpleStateDto.countryId = '';
    const result = await sut.execute(listSimpleStateDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { listSimpleStateDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listSimpleStateDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Country in system', async () => {
    const { listSimpleStateDto, sut } = makeSut();
    jest
      .spyOn(sut['findCountryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CountryResponseDto);
    const result = await sut.execute(listSimpleStateDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
