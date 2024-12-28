import {
  EditUser,
  EditUserDto,
  EditUserRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotPermissions,
  FindUserByIdRepository,
  InsufficientCharacters,
  PermissionsUserResponseDto,
  GeneralStatus,
  UserList,
  VerifyUserPermissionsByIdRepository,
} from '../../../src';
import { listUserMock, userMock } from '../../entity';
import {
  EditUserRepositoryMock,
  FindUserByIdRepositoryMock,
  VerifyUserPermissionsByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: EditUser;
  editUserDto: EditUserDto;
  editUserRepository: EditUserRepository;
  findUserByIdRepository: FindUserByIdRepository;
  verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository;
}

const makeSut = (): SutTypes => {
  const editUserRepository = new EditUserRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const verifyUserPermissionsByIdRepository =
    new VerifyUserPermissionsByIdRepositoryMock();

  const editUserDto: EditUserDto = {
    body: {
      id: userMock.userId,
      name: userMock.name,
      birthDate: new Date(),
      status: 'ACTIVE',
      type: listUserMock[0].type,
    },
    loggedUserId: userMock.userId,
  };

  const sut = new EditUser(
    editUserRepository,
    findUserByIdRepository,
    verifyUserPermissionsByIdRepository
  );

  return {
    editUserRepository,
    findUserByIdRepository,
    verifyUserPermissionsByIdRepository,
    editUserDto,
    sut,
  };
};

describe('EditUser', () => {
  it('should return void when a correct user is edited', async () => {
    const { editUserDto, sut } = makeSut();

    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(userMock.userId);
  });

  it('should return EntityNotEmpty if this status is empty', async () => {
    const { sut, editUserDto } = makeSut();
    editUserDto.body.status = {} as GeneralStatus;

    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return InsufficientCharacters when a incorrect name', async () => {
    const { sut, editUserDto } = makeSut();
    editUserDto.body.name = '';

    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return EntityNotEmpty if this Logged User id is empty', async () => {
    const { sut, editUserDto } = makeSut();
    editUserDto.loggedUserId = '';

    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { editUserDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotPermissions when a pass incorrect Logged User ID', async () => {
    const { editUserDto, sut } = makeSut();
    jest
      .spyOn(sut['verifyUserPermissionsByIdRepository'], 'verify')
      .mockResolvedValueOnce({} as PermissionsUserResponseDto);
    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotPermissions);
  });

  it('should return EntityNotEdit when a not edited user in system', async () => {
    const { editUserDto, sut } = makeSut();
    jest.spyOn(sut['editUserRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
