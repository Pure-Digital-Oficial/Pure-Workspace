import {
  CompanyResponseDto,
  CreateCompanyResponsible,
  CreateCompanyResponsibleDto,
  CreateCompanyResponsibleRespository,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindCompanyResponsibleByDocumentRepository,
  FindUserByIdRepository,
  UserList,
  EntityNotCreated,
  EntityAlreadyExists,
} from '../../../../src';
import { CompanyMock, CompanyResponsibleMock, userMock } from '../../../entity';
import {
  CreateCompanyResponsibleRespositoryMock,
  FindCompanyByIdRepositoryMock,
  FindCompanyResponsibleByDocumentRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: CreateCompanyResponsible;
  createCompanyResponsibleDto: CreateCompanyResponsibleDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findCompanyResponsibleByDocumentRepository: FindCompanyResponsibleByDocumentRepository;
  createCompanyResponsibleRepository: CreateCompanyResponsibleRespository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const findCompanyResponsibleByDocumentRepository =
    new FindCompanyResponsibleByDocumentRepositoryMock();
  const createCompanyResponsibleRepository =
    new CreateCompanyResponsibleRespositoryMock();

  const createCompanyResponsibleDto: CreateCompanyResponsibleDto = {
    body: {
      email: CompanyResponsibleMock.email,
      name: CompanyResponsibleMock.name,
      phone: CompanyResponsibleMock.phone,
      birthdate: CompanyResponsibleMock.birthdate,
      document: CompanyResponsibleMock.document,
    },
    companyId: CompanyMock.simple.id,
    loggedUserId: userMock.userId,
  };

  const sut = new CreateCompanyResponsible(
    findUserByIdRepository,
    findCompanyByIdRepository,
    findCompanyResponsibleByDocumentRepository,
    createCompanyResponsibleRepository
  );

  return {
    sut,
    createCompanyResponsibleDto,
    findUserByIdRepository,
    findCompanyByIdRepository,
    findCompanyResponsibleByDocumentRepository,
    createCompanyResponsibleRepository,
  };
};

describe('CreateCompanyResponsible', () => {
  it('should return company responsible ID when pass correct CreateCompanyResponsibleDto', async () => {
    const { createCompanyResponsibleDto, sut } = makeSut();

    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(CompanyResponsibleMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect Name', async () => {
    const { sut, createCompanyResponsibleDto } = makeSut();
    createCompanyResponsibleDto.body.name = '';
    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect BirthDate', async () => {
    const { sut, createCompanyResponsibleDto } = makeSut();
    createCompanyResponsibleDto.body.birthdate = '';
    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Document', async () => {
    const { sut, createCompanyResponsibleDto } = makeSut();
    createCompanyResponsibleDto.body.document = '';
    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Email', async () => {
    const { sut, createCompanyResponsibleDto } = makeSut();
    createCompanyResponsibleDto.body.email = '';
    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Phone', async () => {
    const { sut, createCompanyResponsibleDto } = makeSut();
    createCompanyResponsibleDto.body.phone = '';
    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { createCompanyResponsibleDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { createCompanyResponsibleDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when a exist Company Responsible in system', async () => {
    const { createCompanyResponsibleDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyResponsibleByDocumentRepository'], 'find')
      .mockResolvedValueOnce(CompanyResponsibleMock);
    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when a Created Company Responsible in system', async () => {
    const { createCompanyResponsibleDto, sut } = makeSut();
    jest
      .spyOn(sut['createCompanyResponsibleRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createCompanyResponsibleDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
