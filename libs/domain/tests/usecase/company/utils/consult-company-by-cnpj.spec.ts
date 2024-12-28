import {
  CompanyResponseDto,
  ConsultCompanyByCnpj,
  ConsultCompanyByCnpjDto,
  ConsultCompanyByCnpjRepository,
  EntityAlreadyExists,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyByCnpjRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanyMock, CompanySimpleMock, userMock } from '../../../entity';
import {
  ConsultCompanyByCnpjRepositoryMock,
  FindCompanyByCnpjRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ConsultCompanyByCnpj;
  consultCompanyByCnpjDto: ConsultCompanyByCnpjDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByCnpjRepository: FindCompanyByCnpjRepository;
  consultCompanyByCnpjRepository: ConsultCompanyByCnpjRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByCnpjRepository = new FindCompanyByCnpjRepositoryMock();
  const consultCompanyByCnpjRepository =
    new ConsultCompanyByCnpjRepositoryMock();

  const consultCompanyByCnpjDto: ConsultCompanyByCnpjDto = {
    cnpj: CompanySimpleMock.cnpj,
    loggedUserId: userMock.userId,
  };

  const sut = new ConsultCompanyByCnpj(
    findUserByIdRepository,
    findCompanyByCnpjRepository,
    consultCompanyByCnpjRepository
  );

  return {
    sut,
    consultCompanyByCnpjDto,
    findUserByIdRepository,
    findCompanyByCnpjRepository,
    consultCompanyByCnpjRepository,
  };
};

describe('ConsultCompanyByCnpj', () => {
  it('should return company when pass correct ConsultCompanyByCnpjDto', async () => {
    const { consultCompanyByCnpjDto, sut } = makeSut();

    const result = await sut.execute(consultCompanyByCnpjDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(CompanyMock);
  });

  it('should return EntityNotEmpty when pass incorrect cnpj', async () => {
    const { sut, consultCompanyByCnpjDto } = makeSut();
    consultCompanyByCnpjDto.cnpj = '';
    const result = await sut.execute(consultCompanyByCnpjDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { consultCompanyByCnpjDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(consultCompanyByCnpjDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when not exist cnpj in system', async () => {
    const { sut, consultCompanyByCnpjDto } = makeSut();
    jest
      .spyOn(sut['findCompanyByCnpjRepository'], 'find')
      .mockResolvedValueOnce(CompanySimpleMock);
    const result = await sut.execute(consultCompanyByCnpjDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when not exist cnpj in governament system', async () => {
    const { sut, consultCompanyByCnpjDto } = makeSut();
    jest
      .spyOn(sut['consultCompanyByCnpjRepository'], 'consult')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(consultCompanyByCnpjDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
