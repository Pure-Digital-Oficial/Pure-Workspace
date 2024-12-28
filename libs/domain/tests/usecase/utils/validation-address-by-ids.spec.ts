import {
  CityResponseDto,
  ValidationAddressByIds,
  AddressValidationDto,
  AdressRepositoriesValidationDto,
  FindCityByIdRepository,
  StateResponseDto,
  FindStateByIdRepository,
  CountryResponseDto,
  FindCountryByIdRepository,
  EntityNotExists,
  EntityNotEmpty,
} from '../../../src';
import {
  FindCityByIdRepositoryMock,
  FindCountryByIdRepositoryMock,
  FindStateByIdRepositoryMock,
} from '../../repository';

const makeSut = (
  ids: AddressValidationDto,
  repository: AdressRepositoriesValidationDto
) => {
  const sut = ValidationAddressByIds(ids, repository);

  return {
    sut,
  };
};

describe('ValidationAddressByIds', () => {
  it('should return undefined when exist country, city and state in system', async () => {
    const { sut } = makeSut(
      {
        cityId: 'any_id',
        countryId: 'any_id',
        stateId: 'any_id',
      },
      {
        findCityById: new FindCityByIdRepositoryMock(),
        findCountryById: new FindCountryByIdRepositoryMock(),
        findStateById: new FindStateByIdRepositoryMock(),
      }
    );

    const result = await sut;

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when not pass city ID', async () => {
    const { sut } = makeSut(
      {
        cityId: '',
        countryId: 'any_id',
        stateId: 'any_id',
      },
      {
        findCityById: new FindCityByIdRepositoryMock(),
        findCountryById: new FindCountryByIdRepositoryMock(),
        findStateById: new FindStateByIdRepositoryMock(),
      }
    );

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when not pass state ID', async () => {
    const { sut } = makeSut(
      {
        cityId: 'any_id',
        countryId: 'any_id',
        stateId: '',
      },
      {
        findCityById: new FindCityByIdRepositoryMock(),
        findCountryById: new FindCountryByIdRepositoryMock(),
        findStateById: new FindStateByIdRepositoryMock(),
      }
    );

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when not pass country ID', async () => {
    const { sut } = makeSut(
      {
        cityId: 'any_id',
        countryId: '',
        stateId: 'any_id',
      },
      {
        findCityById: new FindCityByIdRepositoryMock(),
        findCountryById: new FindCountryByIdRepositoryMock(),
        findStateById: new FindStateByIdRepositoryMock(),
      }
    );

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when no exist City in database', async () => {
    const mockCityResponse = {} as CityResponseDto;
    const mockCityEmptyRepository: FindCityByIdRepository = {
      find: jest.fn(async () => mockCityResponse),
    };

    const { sut } = makeSut(
      {
        cityId: 'any_id',
        countryId: 'any_id',
        stateId: 'any_id',
      },
      {
        findCityById: mockCityEmptyRepository,
        findCountryById: new FindCountryByIdRepositoryMock(),
        findStateById: new FindStateByIdRepositoryMock(),
      }
    );

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when no exist State in database', async () => {
    const mockStateResponse = {} as StateResponseDto;
    const mockStateEmptyRepository: FindStateByIdRepository = {
      find: jest.fn(async () => mockStateResponse),
    };

    const { sut } = makeSut(
      {
        cityId: 'any_id',
        countryId: 'any_id',
        stateId: 'any_id',
      },
      {
        findCityById: new FindCityByIdRepositoryMock(),
        findCountryById: new FindCountryByIdRepositoryMock(),
        findStateById: mockStateEmptyRepository,
      }
    );

    const result = await sut;
    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when no exist Country in database', async () => {
    const mockCountryResponse = {} as CountryResponseDto;
    const mockCountryEmptyRepository: FindCountryByIdRepository = {
      find: jest.fn(async () => mockCountryResponse),
    };

    const { sut } = makeSut(
      {
        cityId: 'any_id',
        countryId: 'any_id',
        stateId: 'any_id',
      },
      {
        findCityById: new FindCityByIdRepositoryMock(),
        findCountryById: mockCountryEmptyRepository,
        findStateById: new FindStateByIdRepositoryMock(),
      }
    );

    const result = await sut;
    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
