import {
  CityResponseDto,
  CompanyAddressResponseDto,
  EditCompanyAddress,
  EditCompanyAddressDto,
  EditCompanyAddressRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindCityByIdRepository,
  FindCompanyAddressByIdRepository,
  FindCountryByIdRepository,
  FindStateByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanyAddressMock, userMock } from '../../../entity';
import {
  EditCompanyAddressRepositoryMock,
  FindCityByIdRepositoryMock,
  FindCompanyAddressByIdRepositoryMock,
  FindCountryByIdRepositoryMock,
  FindStateByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: EditCompanyAddress;
  editCompanyAddressDto: EditCompanyAddressDto;
  findUserByIdRespository: FindUserByIdRepository;
  findCompanyAddressByIdRepository: FindCompanyAddressByIdRepository;
  findCountryByIdRepository: FindCountryByIdRepository;
  findStateByIdRepository: FindStateByIdRepository;
  findCityByIdRepository: FindCityByIdRepository;
  editCompanyAddressRepository: EditCompanyAddressRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRespository = new FindUserByIdRepositoryMock();
  const findCompanyAddressByIdRepository =
    new FindCompanyAddressByIdRepositoryMock();
  const findCountryByIdRepository = new FindCountryByIdRepositoryMock();
  const findStateByIdRepository = new FindStateByIdRepositoryMock();
  const findCityByIdRepository = new FindCityByIdRepositoryMock();
  const editCompanyAddressRepository = new EditCompanyAddressRepositoryMock();

  const editCompanyAddressDto: EditCompanyAddressDto = {
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
    companyAddressId: CompanyAddressMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new EditCompanyAddress(
    findUserByIdRespository,
    findCompanyAddressByIdRepository,
    findCountryByIdRepository,
    findStateByIdRepository,
    findCityByIdRepository,
    editCompanyAddressRepository
  );

  return {
    editCompanyAddressDto,
    editCompanyAddressRepository,
    findCityByIdRepository,
    findCompanyAddressByIdRepository,
    findCountryByIdRepository,
    findStateByIdRepository,
    findUserByIdRespository,
    sut,
  };
};

describe('EditCompanyAddress', () => {
  it('should return Company Address ID when pass correct EditCompanyAddressDto', async () => {
    const { editCompanyAddressDto, sut } = makeSut();

    const result = await sut.execute(editCompanyAddressDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toBe(CompanyAddressMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect District', async () => {
    const { sut, editCompanyAddressDto } = makeSut();
    editCompanyAddressDto.body.district = '';
    const result = await sut.execute(editCompanyAddressDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Number', async () => {
    const { sut, editCompanyAddressDto } = makeSut();
    editCompanyAddressDto.body.number = '';
    const result = await sut.execute(editCompanyAddressDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Street', async () => {
    const { sut, editCompanyAddressDto } = makeSut();
    editCompanyAddressDto.body.street = '';
    const result = await sut.execute(editCompanyAddressDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Zipcode', async () => {
    const { sut, editCompanyAddressDto } = makeSut();
    editCompanyAddressDto.body.zipcode = '';
    const result = await sut.execute(editCompanyAddressDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { editCompanyAddressDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editCompanyAddressDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { editCompanyAddressDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyAddressByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyAddressResponseDto);
    const result = await sut.execute(editCompanyAddressDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist City in system', async () => {
    const { editCompanyAddressDto, sut } = makeSut();
    jest
      .spyOn(sut['findCityByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CityResponseDto);
    const result = await sut.execute(editCompanyAddressDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when a edited Company Address in system', async () => {
    const { editCompanyAddressDto, sut } = makeSut();
    jest
      .spyOn(sut['editCompanyAddressRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editCompanyAddressDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
