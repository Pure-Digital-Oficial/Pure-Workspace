import {
  EntityNotExists,
  FindUserByIdRepository,
  ListSimpleCountry,
  ListSimpleCountryDto,
  ListSimpleCountryRepository,
  UserList,
} from '../../../../src';
import { listSimpleCountryMock, userMock } from '../../../entity';
import {
  FindUserByIdRepositoryMock,
  ListSimpleCountryRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ListSimpleCountry;
  listSimpleCountryDto: ListSimpleCountryDto;
  findUserByIdRepository: FindUserByIdRepository;
  listSimpleCountryRepository: ListSimpleCountryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listSimpleCountryRepository = new ListSimpleCountryRepositoryMock();

  const listSimpleCountryDto: ListSimpleCountryDto = {
    loggedUserId: userMock.userId,
  };

  const sut = new ListSimpleCountry(
    findUserByIdRepository,
    listSimpleCountryRepository
  );

  return {
    findUserByIdRepository,
    listSimpleCountryRepository,
    listSimpleCountryDto,
    sut,
  };
};

describe('ListSimpleCountry', () => {
  it('should return list simple country when pass correct listSimpleCountryDto', async () => {
    const { listSimpleCountryDto, sut } = makeSut();

    const result = await sut.execute(listSimpleCountryDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual([listSimpleCountryMock]);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { listSimpleCountryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listSimpleCountryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
