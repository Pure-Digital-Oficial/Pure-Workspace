import {
  CompanyResponseDto,
  CreateCompanyData,
  CreateCompanyDataDto,
  CreateCompanyDataRepository,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanyDataMock, userMock } from '../../../entity';
import {
  CreateCompanyDataRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: CreateCompanyData;
  createCompanyDataDto: CreateCompanyDataDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  createCompanyDataRepository: CreateCompanyDataRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const createCompanyDataRepository = new CreateCompanyDataRepositoryMock();

  const createCompanyDataDto: CreateCompanyDataDto = {
    body: {
      legalNature: CompanyDataMock.legalNature,
      opening: CompanyDataMock.opening,
      phone: CompanyDataMock.phone,
      port: CompanyDataMock.port,
      situation: CompanyDataMock.situation,
      responsibleEmail: CompanyDataMock.responsibleEmail,
    },
    companyId: CompanyDataMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new CreateCompanyData(
    findUserByIdRepository,
    findCompanyByIdRepository,
    createCompanyDataRepository
  );

  return {
    sut,
    createCompanyDataDto,
    findUserByIdRepository,
    findCompanyByIdRepository,
    createCompanyDataRepository,
  };
};

describe('CreateCompanyData', () => {
  it('should return company ID when pass correct CreateCompanyDataDto', async () => {
    const { createCompanyDataDto, sut } = makeSut();

    const result = await sut.execute(createCompanyDataDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(CompanyDataMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect Legal Nature', async () => {
    const { sut, createCompanyDataDto } = makeSut();
    createCompanyDataDto.body.legalNature = '';
    const result = await sut.execute(createCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Opening', async () => {
    const { sut, createCompanyDataDto } = makeSut();
    createCompanyDataDto.body.opening = '';
    const result = await sut.execute(createCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Phone', async () => {
    const { sut, createCompanyDataDto } = makeSut();
    createCompanyDataDto.body.phone = '';
    const result = await sut.execute(createCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Port', async () => {
    const { sut, createCompanyDataDto } = makeSut();
    createCompanyDataDto.body.port = '';
    const result = await sut.execute(createCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Situation', async () => {
    const { sut, createCompanyDataDto } = makeSut();
    createCompanyDataDto.body.situation = '';
    const result = await sut.execute(createCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Responsible Email', async () => {
    const { sut, createCompanyDataDto } = makeSut();
    createCompanyDataDto.body.responsibleEmail = '';
    const result = await sut.execute(createCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { createCompanyDataDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(createCompanyDataDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { createCompanyDataDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(createCompanyDataDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when a not create Company in system', async () => {
    const { createCompanyDataDto, sut } = makeSut();
    jest
      .spyOn(sut['createCompanyDataRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createCompanyDataDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
