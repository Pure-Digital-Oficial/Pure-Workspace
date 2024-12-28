import {
  CityResponseDto,
  CompanyResponseDto,
  CreateCompanyAddress,
  CreateCompanyAddressDto,
  CreateCompanyAddressRepository,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindCityByIdRepository,
  FindCompanyByIdRepository,
  FindCountryByIdRepository,
  FindStateByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import {
  CompanyAddressMock,
  CompanySimpleMock,
  userMock,
} from '../../../entity';
import {
  CreateCompanyAddressRepositoryMock,
  FindCityByIdRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindCountryByIdRepositoryMock,
  FindStateByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: CreateCompanyAddress;
  createCompanyAddressDto: CreateCompanyAddressDto;
  findUserByIdRespository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findCountryByIdRepository: FindCountryByIdRepository;
  findStateByIdRepository: FindStateByIdRepository;
  findCityByIdRepository: FindCityByIdRepository;
  createCompanyAddressRepository: CreateCompanyAddressRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRespository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const findCountryByIdRepository = new FindCountryByIdRepositoryMock();
  const findStateByIdRepository = new FindStateByIdRepositoryMock();
  const findCityByIdRepository = new FindCityByIdRepositoryMock();
  const createCompanyAddressRepository =
    new CreateCompanyAddressRepositoryMock();

  const createCompanyAddressDto: CreateCompanyAddressDto = {
    body: {
      cityId: CompanyAddressMock.city,
      complement: CompanyAddressMock.complement ?? '',
      countryId: CompanyAddressMock.country,
      district: CompanyAddressMock.district,
      number: CompanyAddressMock.number,
      stateId: CompanyAddressMock.state,
      street: CompanyAddressMock.street,
      zipcode: CompanyAddressMock.zipcode,
    },
    companyId: CompanySimpleMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new CreateCompanyAddress(
    findUserByIdRespository,
    findCompanyByIdRepository,
    findCountryByIdRepository,
    findStateByIdRepository,
    findCityByIdRepository,
    createCompanyAddressRepository
  );

  return {
    sut,
    createCompanyAddressDto,
    findUserByIdRespository,
    findCompanyByIdRepository,
    findCountryByIdRepository,
    findStateByIdRepository,
    findCityByIdRepository,
    createCompanyAddressRepository,
  };
};

describe('CreateCompanyAddress', () => {
  it('should return company address id when pass correct CreateCompanyAddressDto', async () => {
    const { sut, createCompanyAddressDto } = makeSut();
    const response = await sut.execute(createCompanyAddressDto);

    expect(response.isRight()).toBeTruthy();
    expect(response.isLeft()).toBeFalsy();
    expect(response.value).toBe(CompanyAddressMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect District', async () => {
    const { sut, createCompanyAddressDto } = makeSut();
    createCompanyAddressDto.body.district = '';
    const result = await sut.execute(createCompanyAddressDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Number', async () => {
    const { sut, createCompanyAddressDto } = makeSut();
    createCompanyAddressDto.body.number = '';
    const result = await sut.execute(createCompanyAddressDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Street', async () => {
    const { sut, createCompanyAddressDto } = makeSut();
    createCompanyAddressDto.body.street = '';
    const result = await sut.execute(createCompanyAddressDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Zipcode', async () => {
    const { sut, createCompanyAddressDto } = makeSut();
    createCompanyAddressDto.body.zipcode = '';
    const result = await sut.execute(createCompanyAddressDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { createCompanyAddressDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(createCompanyAddressDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { createCompanyAddressDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(createCompanyAddressDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist City in system', async () => {
    const { createCompanyAddressDto, sut } = makeSut();
    jest
      .spyOn(sut['findCityByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CityResponseDto);
    const result = await sut.execute(createCompanyAddressDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when not created Company Address in system', async () => {
    const { createCompanyAddressDto, sut } = makeSut();
    jest
      .spyOn(sut['createCompanyAddressRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createCompanyAddressDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
