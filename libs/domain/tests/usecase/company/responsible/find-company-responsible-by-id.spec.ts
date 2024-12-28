import {
  CompanyResponsibleResponseDto,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyResponsibleById,
  FindCompanyResponsibleByIdDto,
  FindCompanyResponsibleByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanyResponsibleMock, userMock } from '../../../entity';
import {
  FindCompanyResponsibleByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: FindCompanyResponsibleById;
  findCompanyResponsibleByIdDto: FindCompanyResponsibleByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyResponsibleByIdRepository: FindCompanyResponsibleByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyResponsibleByIdRepository =
    new FindCompanyResponsibleByIdRepositoryMock();

  const findCompanyResponsibleByIdDto: FindCompanyResponsibleByIdDto = {
    companyResponsibleId: CompanyResponsibleMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new FindCompanyResponsibleById(
    findUserByIdRepository,
    findCompanyResponsibleByIdRepository
  );

  return {
    sut,
    findCompanyResponsibleByIdDto,
    findUserByIdRepository,
    findCompanyResponsibleByIdRepository,
  };
};

describe('FindCompanyResponsibleById', () => {
  it('should return Company Responsible when pass correct FindCompanyResponsibleByIdDto', async () => {
    const { findCompanyResponsibleByIdDto, sut } = makeSut();

    const result = await sut.execute(findCompanyResponsibleByIdDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toEqual(CompanyResponsibleMock);
  });

  it('should return EntityNotEmpty when pass incorrect Company Responsible id', async () => {
    const { sut, findCompanyResponsibleByIdDto } = makeSut();
    findCompanyResponsibleByIdDto.companyResponsibleId = '';
    const result = await sut.execute(findCompanyResponsibleByIdDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { findCompanyResponsibleByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findCompanyResponsibleByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company Responsible in system', async () => {
    const { findCompanyResponsibleByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyResponsibleByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponsibleResponseDto);
    const result = await sut.execute(findCompanyResponsibleByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
