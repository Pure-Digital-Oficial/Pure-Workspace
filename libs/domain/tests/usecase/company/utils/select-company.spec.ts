import {
  CompanyResponseDto,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  SelectCompany,
  SelectCompanyDto,
  SelectCompanyRepository,
  UserList,
  EntityNotSelected,
  FindUserIdByCompanyIdRepository,
  EntityAlreadyExists,
} from '../../../../src';
import { CompanyMock, userMock } from '../../../entity';
import {
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  FindUserIdByCompanyIdRepositoryEmptyMock,
  SelectCompanyRepositoryMock,
} from '../../../repository';

interface SutType {
  sut: SelectCompany;
  selectCompanyDto: SelectCompanyDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findUserIdByCompanyIdRepository: FindUserIdByCompanyIdRepository;
  selectCompanyRepository: SelectCompanyRepository;
}

const makeSut = (): SutType => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const findUserIdByCompanyIdRepository =
    new FindUserIdByCompanyIdRepositoryEmptyMock();
  const selectCompanyRepository = new SelectCompanyRepositoryMock();

  const selectCompanyDto: SelectCompanyDto = {
    companyId: CompanyMock.simple.id,
    loggedUserId: userMock.userId,
  };

  const sut = new SelectCompany(
    findUserByIdRepository,
    findCompanyByIdRepository,
    findUserIdByCompanyIdRepository,
    selectCompanyRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    findUserIdByCompanyIdRepository,
    selectCompanyRepository,
    selectCompanyDto,
    sut,
  };
};

describe('SelectCompany', () => {
  it('should return company ID when pass correct SelectCompanyDto', async () => {
    const { selectCompanyDto, sut } = makeSut();

    const result = await sut.execute(selectCompanyDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(CompanyMock.simple.id);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { selectCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(selectCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { selectCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(selectCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when a exist User in Company', async () => {
    const { selectCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce(userMock.userId);
    const result = await sut.execute(selectCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotSelected when a exist Company in system', async () => {
    const { selectCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['selectCompanyRepository'], 'select')
      .mockResolvedValueOnce('');
    const result = await sut.execute(selectCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotSelected);
  });
});
