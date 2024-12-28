import {
  AuthorizeUserToCompany,
  AuthorizeUserToCompanyDto,
  AuthorizeUserToCompanyRepository,
  CompanyResponseDto,
  EntityIsNotAuthorized,
  EntityNotExists,
  EntityNotPermissions,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  FindUserIdByCompanyIdRepository,
  PermissionsUserResponseDto,
  UserList,
  VerifyUserPermissionsByIdRepository,
} from '../../../../src';
import { CompanyMock, listUserMock, userMock } from '../../../entity';
import {
  AuthorizeUserToCompanyRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  FindUserIdByCompanyIdRepositoryMock,
  VerifyUserPermissionsByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: AuthorizeUserToCompany;
  authorizeUserToCompanyDto: AuthorizeUserToCompanyDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findUserIdByCompanyIdRepository: FindUserIdByCompanyIdRepository;
  verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository;
  authorizeUserToCompanyRepository: AuthorizeUserToCompanyRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const findUserIdByCompanyIdRepository =
    new FindUserIdByCompanyIdRepositoryMock();
  const verifyUserPermissionsByIdRepository =
    new VerifyUserPermissionsByIdRepositoryMock();
  const authorizeUserToCompanyRepository =
    new AuthorizeUserToCompanyRepositoryMock();

  const authorizeUserToCompanyDto: AuthorizeUserToCompanyDto = {
    companyId: CompanyMock.simple.id,
    loggedUserId: userMock.userId,
    userId: userMock.userId,
  };

  const sut = new AuthorizeUserToCompany(
    findUserByIdRepository,
    findCompanyByIdRepository,
    findUserIdByCompanyIdRepository,
    verifyUserPermissionsByIdRepository,
    authorizeUserToCompanyRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    findUserIdByCompanyIdRepository,
    authorizeUserToCompanyRepository,
    verifyUserPermissionsByIdRepository,
    authorizeUserToCompanyDto,
    sut,
  };
};

describe('AuthorizeUserToCompany', () => {
  it('should return user ID when pass correct AuthorizeUserToCompanyDto', async () => {
    const { authorizeUserToCompanyDto, sut } = makeSut();

    const result = await sut.execute(authorizeUserToCompanyDto);
    expect(result.value).toStrictEqual(userMock.userId);
    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
  });

  it('should return EntityNotExists when a exist Logged User in system', async () => {
    const { authorizeUserToCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(authorizeUserToCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { authorizeUserToCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce(listUserMock[0]);
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(authorizeUserToCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { authorizeUserToCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(authorizeUserToCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist user in Company in system', async () => {
    const { authorizeUserToCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(authorizeUserToCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotPermissions when a exist user in Company in system', async () => {
    const { authorizeUserToCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['verifyUserPermissionsByIdRepository'], 'verify')
      .mockResolvedValueOnce({} as PermissionsUserResponseDto);
    const result = await sut.execute(authorizeUserToCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotPermissions);
  });

  it('should return EntityIsNotAuthorized when a not authorized user in system', async () => {
    const { authorizeUserToCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['authorizeUserToCompanyRepository'], 'auth')
      .mockResolvedValueOnce('');
    const result = await sut.execute(authorizeUserToCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityIsNotAuthorized);
  });
});
