import {
  CreateAuth,
  CreateAuthDto,
  CreateAuthRepository,
  EntityAlreadyExists,
  EntityNotExists,
  FilterByEmailOrNicknameRepository,
  FindUserByIdRepository,
  InsufficientCharacters,
  HashGeneratorRepository,
  UserList,
} from '../../../src';
import { userMock } from '../../entity';
import { authMock } from '../../entity/user/auth.mock';
import {
  CreateAuthRepositoryMock,
  FilterByEmailOrNicknameEmptyRepositoryMock,
  FindUserByIdRepositoryMock,
  HashGeneratorRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: CreateAuth;
  createAuthDto: CreateAuthDto;
  createAuthRepository: CreateAuthRepository;
  findUserByIdRepository: FindUserByIdRepository;
  filterByEmailOrNicknameRepository: FilterByEmailOrNicknameRepository;
  hashGenerator: HashGeneratorRepository;
}

const makeSut = (): SutTypes => {
  const createAuthRepository = new CreateAuthRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const hashGenerator = new HashGeneratorRepositoryMock();
  const filterByEmailOrNicknameRepository =
    new FilterByEmailOrNicknameEmptyRepositoryMock();
  const createAuthDto: CreateAuthDto = {
    email: authMock.email,
    password: 'any_password',
    userId: authMock.authId,
  };

  const sut = new CreateAuth(
    filterByEmailOrNicknameRepository,
    findUserByIdRepository,
    hashGenerator,
    createAuthRepository
  );

  return {
    sut,
    createAuthDto,
    createAuthRepository,
    findUserByIdRepository,
    filterByEmailOrNicknameRepository,
    hashGenerator,
  };
};

describe('CreateAuth', () => {
  it('should return undefined if send correct user', async () => {
    const { createAuthDto, sut } = makeSut();

    const result = await sut.execute(createAuthDto);

    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(undefined);
  });

  it('should left InsufficientCharacters if sent an email with less than three characters', async () => {
    const { sut, createAuthDto } = makeSut();

    createAuthDto.email = '';

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should left InsufficientCharacters if sent an password with less than three characters', async () => {
    const { sut, createAuthDto } = makeSut();

    createAuthDto.password = '';

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return EntityAlreadyExists if send email already exist in database', async () => {
    const { sut, createAuthDto } = makeSut();
    createAuthDto.email = authMock.email;

    jest
      .spyOn(sut['filterByEmailOrNicknameRepository'], 'filter')
      .mockResolvedValueOnce(userMock);

    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { createAuthDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(createAuthDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
