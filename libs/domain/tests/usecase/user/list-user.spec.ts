import {
  BtrinSanitizeRepository,
  EntityNotExists,
  FindUserByIdRepository,
  ListUser,
  ListUserDto,
  ListUserRepository,
  EntityNotPermissions,
  PermissionsUserResponseDto,
  SyntaxError,
  UserList,
  VerifyUserPermissionsByIdRepository,
} from '../../../src';
import { userMock } from '../../entity';
import {
  BtrinSanitizeRepositoryMock,
  FindUserByIdRepositoryMock,
  ListUserRepositoryMock,
  VerifyUserPermissionsByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: ListUser;
  listUserDto: ListUserDto;
  listUserRepository: ListUserRepository;
  btrinSanitizeRepository: BtrinSanitizeRepository;
  findUserByIdRepository: FindUserByIdRepository;
  verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository;
}

const makeSut = (): SutTypes => {
  const listUserRepository = new ListUserRepositoryMock();
  const btrinSanitizeRepository = new BtrinSanitizeRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const verifyUserPermissionsByIdRepository =
    new VerifyUserPermissionsByIdRepositoryMock();
  const listUserDto: ListUserDto = {
    filter: 'any_input',
    loggedUserId: userMock.userId,
  };

  const sut = new ListUser(
    listUserRepository,
    btrinSanitizeRepository,
    findUserByIdRepository,
    verifyUserPermissionsByIdRepository
  );

  return {
    sut,
    listUserDto,
    listUserRepository,
    btrinSanitizeRepository,
    findUserByIdRepository,
    verifyUserPermissionsByIdRepository,
  };
};

describe('ListUser', () => {
  it('should return a list of users if the input is correct', async () => {
    const { listUserDto, sut } = makeSut();

    const result = await sut.execute(listUserDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value);
  });

  it('should left SyntaxError if sent an input with any syntax error not sanitized', async () => {
    const { sut, listUserDto } = makeSut();

    jest
      .spyOn(sut['btrinSanitizeRepository'], 'btrin')
      .mockResolvedValueOnce(undefined);

    const result = await sut.execute(listUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(SyntaxError);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { listUserDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotPermissions when a pass invalid logged User ID', async () => {
    const { listUserDto, sut } = makeSut();
    jest
      .spyOn(sut['verifyUserPermissionByIdRepository'], 'verify')
      .mockResolvedValueOnce({} as PermissionsUserResponseDto);
    const result = await sut.execute(listUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotPermissions);
  });
});
