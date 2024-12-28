import {
  CompanyDataResponseDto,
  EntityNotExists,
  FindCompanyDataById,
  FindCompanyDataByIdDto,
  FindCompanyDataByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanyDataMock, userMock } from '../../../entity';
import {
  FindCompanyDataByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: FindCompanyDataById;
  findCompanyDataByIdDto: FindCompanyDataByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyDataByIdRepository: FindCompanyDataByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyDataByIdRepository = new FindCompanyDataByIdRepositoryMock();

  const findCompanyDataByIdDto: FindCompanyDataByIdDto = {
    companyDataId: CompanyDataMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new FindCompanyDataById(
    findUserByIdRepository,
    findCompanyDataByIdRepository
  );

  return {
    findUserByIdRepository,
    findCompanyDataByIdRepository,
    findCompanyDataByIdDto,
    sut,
  };
};

describe('FindCompanyDataById', () => {
  it('should return company data responde when pass correct FindCompanyDataByIdDto', async () => {
    const { findCompanyDataByIdDto, sut } = makeSut();

    const result = await sut.execute(findCompanyDataByIdDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(CompanyDataMock);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { findCompanyDataByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findCompanyDataByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { findCompanyDataByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyDataByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyDataResponseDto);
    const result = await sut.execute(findCompanyDataByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
