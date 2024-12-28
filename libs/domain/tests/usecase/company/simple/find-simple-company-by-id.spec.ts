import {
  CompanySimpleResponseDto,
  EntityNotEmpty,
  EntityNotExists,
  FindSimpleCompanyById,
  FindSimpleCompanyByIdDto,
  FindSimpleCompanyByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanySimpleMock, userMock } from '../../../entity';
import {
  FindSimpleCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: FindSimpleCompanyById;
  findSimpleCompanyByIdDto: FindSimpleCompanyByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findSimpleCompanyByIdRepository: FindSimpleCompanyByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findSimpleCompanyByIdRepository =
    new FindSimpleCompanyByIdRepositoryMock();

  const findSimpleCompanyByIdDto: FindSimpleCompanyByIdDto = {
    companyId: CompanySimpleMock.id,
    loggedUserId: userMock.userId,
  };
  const sut = new FindSimpleCompanyById(
    findUserByIdRepository,
    findSimpleCompanyByIdRepository
  );

  return {
    sut,
    findSimpleCompanyByIdDto,
    findUserByIdRepository,
    findSimpleCompanyByIdRepository,
  };
};

describe('FindSimpleCompanyById', () => {
  it('should return simple company response when pass correct FindSimpleCompanyByIdDto', async () => {
    const { sut, findSimpleCompanyByIdDto } = makeSut();

    const result = await sut.execute(findSimpleCompanyByIdDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toEqual(CompanySimpleMock);
  });

  it('should return EntityNotEmpty when pass incorrect Company id', async () => {
    const { sut, findSimpleCompanyByIdDto } = makeSut();
    findSimpleCompanyByIdDto.companyId = '';
    const result = await sut.execute(findSimpleCompanyByIdDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { findSimpleCompanyByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findSimpleCompanyByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { findSimpleCompanyByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findSimpleCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanySimpleResponseDto);
    const result = await sut.execute(findSimpleCompanyByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
