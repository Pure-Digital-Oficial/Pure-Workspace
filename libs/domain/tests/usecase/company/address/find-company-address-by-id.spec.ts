import {
  CompanyAddressResponseDto,
  EntityNotExists,
  FindCompanyAddressById,
  FindCompanyAddressByIdDto,
  FindCompanyAddressByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanyAddressMock, userMock } from '../../../entity';
import {
  FindCompanyAddressByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: FindCompanyAddressById;
  findCompanyAddressByIdDto: FindCompanyAddressByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyAddressByIdRepository: FindCompanyAddressByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyAddressByIdRepository =
    new FindCompanyAddressByIdRepositoryMock();

  const findCompanyAddressByIdDto: FindCompanyAddressByIdDto = {
    companyAddressId: CompanyAddressMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new FindCompanyAddressById(
    findUserByIdRepository,
    findCompanyAddressByIdRepository
  );

  return {
    findCompanyAddressByIdDto,
    findCompanyAddressByIdRepository,
    findUserByIdRepository,
    sut,
  };
};

describe('FindCompanyAddressById', () => {
  it('should return a company address when pass correct FindCompanyAddressByIdDto', async () => {
    const { sut, findCompanyAddressByIdDto } = makeSut();

    const result = await sut.execute(findCompanyAddressByIdDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(CompanyAddressMock);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { findCompanyAddressByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findCompanyAddressByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { findCompanyAddressByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyAddressByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyAddressResponseDto);
    const result = await sut.execute(findCompanyAddressByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
