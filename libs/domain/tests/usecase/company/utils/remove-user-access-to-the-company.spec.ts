import {
  CompanyResponseDto,
  EntityMinValue,
  EntityNotComplete,
  EntityNotExists,
  EntityNotPermissions,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  FindUserIdByCompanyIdRepository,
  ListCompaniesByUserIdRepository,
  ListCompanyResponseDto,
  PermissionsUserResponseDto,
  RemoveUserAccessToTheCompany,
  RemoveUserAccessToTheCompanyDto,
  RemoveUserAccessToTheCompanyRepository,
  UserList,
  VerifyUserPermissionsByIdRepository,
} from '../../../../src';
import { CompanyMock, listUserMock, userMock } from '../../../entity';
import {
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  FindUserIdByCompanyIdRepositoryMock,
  ListCompaniesByUserIdRepositoryMock,
  RemoveUserAccessToTheCompanyRepositoryMock,
  VerifyUserPermissionsByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: RemoveUserAccessToTheCompany;
  removeUserAccessToTheCompanyDto: RemoveUserAccessToTheCompanyDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findUserIdByCompanyIdRepository: FindUserIdByCompanyIdRepository;
  verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository;
  listCompaniesByUserIdRepository: ListCompaniesByUserIdRepository;
  removeUserAccessToTheCompanyRepository: RemoveUserAccessToTheCompanyRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const findUserIdByCompanyIdRepository =
    new FindUserIdByCompanyIdRepositoryMock();
  const verifyUserPermissionsByIdRepository =
    new VerifyUserPermissionsByIdRepositoryMock();
  const listCompaniesByUserIdRepository =
    new ListCompaniesByUserIdRepositoryMock();
  const removeUserAccessToTheCompanyRepository =
    new RemoveUserAccessToTheCompanyRepositoryMock();

  const removeUserAccessToTheCompanyDto: RemoveUserAccessToTheCompanyDto = {
    companyId: CompanyMock.simple.id,
    loggedUserId: userMock.userId,
    userId: userMock.userId,
  };

  const sut = new RemoveUserAccessToTheCompany(
    findUserByIdRepository,
    findCompanyByIdRepository,
    findUserIdByCompanyIdRepository,
    verifyUserPermissionsByIdRepository,
    listCompaniesByUserIdRepository,
    removeUserAccessToTheCompanyRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    findUserIdByCompanyIdRepository,
    verifyUserPermissionsByIdRepository,
    removeUserAccessToTheCompanyRepository,
    listCompaniesByUserIdRepository,
    removeUserAccessToTheCompanyDto,
    sut,
  };
};

describe('RemoveUserAccessToTheCompany', () => {
  it('should return Company ID when pass correct RemoveUserAccessToTheCompanyDto', async () => {
    const { sut, removeUserAccessToTheCompanyDto } = makeSut();

    const result = await sut.execute(removeUserAccessToTheCompanyDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(CompanyMock.simple.id);
  });

  it('should return EntityNotExists when a exist Logged User in system', async () => {
    const { removeUserAccessToTheCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(removeUserAccessToTheCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { removeUserAccessToTheCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce(listUserMock[0]);
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(removeUserAccessToTheCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { removeUserAccessToTheCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(removeUserAccessToTheCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist user in Company in system', async () => {
    const { removeUserAccessToTheCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserIdByCompanyIdRepository'], 'find')
      .mockResolvedValueOnce('');
    const result = await sut.execute(removeUserAccessToTheCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotPermissions when a exist user in Company in system', async () => {
    const { removeUserAccessToTheCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['verifyUserPermissionsByIdRepository'], 'verify')
      .mockResolvedValueOnce({} as PermissionsUserResponseDto);
    const result = await sut.execute(removeUserAccessToTheCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotPermissions);
  });

  it('should return EntityMinValue when a exist one Company associate to User in system', async () => {
    const { removeUserAccessToTheCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['listCompaniesByUserIdRepository'], 'list')
      .mockResolvedValueOnce({} as ListCompanyResponseDto);
    const result = await sut.execute(removeUserAccessToTheCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityMinValue);
  });

  it('should return EntityNotComplete when a not complete action in system', async () => {
    const { removeUserAccessToTheCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['removeUserAccessToTheCompanyRepository'], 'remove')
      .mockResolvedValueOnce('');
    const result = await sut.execute(removeUserAccessToTheCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotComplete);
  });
});
