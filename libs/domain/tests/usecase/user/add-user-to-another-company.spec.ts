import {
  AddUserToAnotherCompany,
  AddUserToAnotherCompanyDto,
  AddUserToAnotherCompanyRepository,
  CompanyResponseDto,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  FindUserIdByCompanyIdRepository,
  UserList,
  VerifyUserPermissionsByIdRepository,
  EntityAlreadyExists,
  EntityNotAssociate,
  PermissionsUserResponseDto,
  EntityNotPermissions,
} from '../../../src';
import { CompanyMock, listUserMock, userMock } from '../../entity';
import {
  AddUserToAnotherCompanyRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  FindUserIdByCompanyIdRepositoryMock,
  VerifyUserPermissionsByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: AddUserToAnotherCompany;
  addUserToAnotherCompanyDto: AddUserToAnotherCompanyDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findUserIdByCompanyIdRepository: FindUserIdByCompanyIdRepository;
  verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository;
  addUserToAnotherCompanyRepository: AddUserToAnotherCompanyRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const findUserIdByCompanyIdRepository =
    new FindUserIdByCompanyIdRepositoryMock();
  const verifyUserPermissionsByIdRepository =
    new VerifyUserPermissionsByIdRepositoryMock();
  const addUserToAnotherCompanyRepository =
    new AddUserToAnotherCompanyRepositoryMock();

  const addUserToAnotherCompanyDto: AddUserToAnotherCompanyDto = {
    companyId: CompanyMock.simple.id,
    loggedUserId: userMock.userId,
    userId: userMock.userId,
  };

  const sut = new AddUserToAnotherCompany(
    findUserByIdRepository,
    findCompanyByIdRepository,
    findUserIdByCompanyIdRepository,
    verifyUserPermissionsByIdRepository,
    addUserToAnotherCompanyRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    findUserIdByCompanyIdRepository,
    verifyUserPermissionsByIdRepository,
    addUserToAnotherCompanyRepository,
    addUserToAnotherCompanyDto,
    sut,
  };
};

describe('AddUserToAnotherCompany', () => {
  it('should return user and company id when pass correct AddUserToAnotherCompanyDto', async () => {
    const { addUserToAnotherCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce(`${userMock.userId}- ${CompanyMock.simple.id}`);
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce('');

    const result = await sut.execute(addUserToAnotherCompanyDto);
    expect(result.value).toStrictEqual(
      `${userMock.userId}- ${CompanyMock.simple.id}`
    );
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('should return EntityNotExists when a not exist Logged User in system', async () => {
    const { addUserToAnotherCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(addUserToAnotherCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a not exist User in system', async () => {
    const { addUserToAnotherCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce(listUserMock[0]);
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(addUserToAnotherCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a not exist Company in system', async () => {
    const { addUserToAnotherCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(addUserToAnotherCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a not exist user in Company in system', async () => {
    const { addUserToAnotherCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(addUserToAnotherCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when a exist user in Company in system', async () => {
    const { addUserToAnotherCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce(`${userMock.userId}- ${CompanyMock.simple.id}`);
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce(`${userMock.userId}- ${CompanyMock.simple.id}`);

    const result = await sut.execute(addUserToAnotherCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotPermissions when a exist user in Company in system', async () => {
    const { addUserToAnotherCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce(`${userMock.userId}- ${CompanyMock.simple.id}`);
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce('');
    jest
      .spyOn(sut['verifyUserPermissionsByIdRepository'], 'verify')
      .mockResolvedValueOnce({} as PermissionsUserResponseDto);
    const result = await sut.execute(addUserToAnotherCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotPermissions);
  });

  it('should return EntityNotAssociate when a not added user in Company in system', async () => {
    const { addUserToAnotherCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce(`${userMock.userId}- ${CompanyMock.simple.id}`);
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce('');
    jest
      .spyOn(sut['addUserToAnotherCompanyRepository'], 'add')
      .mockResolvedValueOnce('');
    const result = await sut.execute(addUserToAnotherCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotAssociate);
  });
});
