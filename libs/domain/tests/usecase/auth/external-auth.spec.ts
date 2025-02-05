import {
  App,
  CreateAuthRepository,
  CreateUserRepository,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  ExternalAuth,
  ExternalAuthDto,
  FilterByEmailOrNicknameRepository,
  FindAppByIdRepository,
  HashGeneratorRepository,
  SignInRepository,
  User,
} from '../../../src';
import { AccessTokenMock, appMock, authMock, userMock } from '../../entity';
import {
  FindAppByIdRepositoryMock,
  FilterByEmailOrNicknameRepositoryMock,
  CreateUserRepositoryMock,
  SignInRepositoryMock,
  HashGeneratorRepositoryMock,
  CreateAuthRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: ExternalAuth;
  externalAuthDto: ExternalAuthDto;
  findAppByIdRepository: FindAppByIdRepository;
  filterEmailRepository: FilterByEmailOrNicknameRepository;
  createUserRepository: CreateUserRepository;
  hashGeneratorRepository: HashGeneratorRepository;
  createAuthRepository: CreateAuthRepository;
  signInRepository: SignInRepository;
}

const makeSut = (): SutTypes => {
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const filterEmailRepository = new FilterByEmailOrNicknameRepositoryMock();
  const createUserRepository = new CreateUserRepositoryMock();
  const hashGeneratorRepository = new HashGeneratorRepositoryMock();
  const createAuthRepository = new CreateAuthRepositoryMock();
  const signInRepository = new SignInRepositoryMock();

  const externalAuthDto: ExternalAuthDto = {
    appId: appMock.id,
    externalId: 'any_id',
    body: {
      email: authMock.email,
      name: userMock.name,
    },
  };

  const sut = new ExternalAuth(
    findAppByIdRepository,
    filterEmailRepository,
    createUserRepository,
    hashGeneratorRepository,
    createAuthRepository,
    signInRepository
  );

  return {
    sut,
    externalAuthDto,
    findAppByIdRepository,
    hashGeneratorRepository,
    createAuthRepository,
    filterEmailRepository,
    createUserRepository,
    signInRepository,
  };
};

describe('ExternalAuth', () => {
  it('should return Access Token when pass correct externalAuthDto', async () => {
    const { externalAuthDto, sut } = makeSut();

    const result = await sut.execute(externalAuthDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(AccessTokenMock);
  });

  it('should return EntityNotEmpty when pass empty appId in externalAuthDto', async () => {
    const { externalAuthDto, sut } = makeSut();
    externalAuthDto.appId = '';
    const result = await sut.execute(externalAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty externalId in externalAuthDto', async () => {
    const { externalAuthDto, sut } = makeSut();
    externalAuthDto.externalId = '';
    const result = await sut.execute(externalAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty email in externalAuthDto', async () => {
    const { externalAuthDto, sut } = makeSut();
    externalAuthDto.body.email = '';
    const result = await sut.execute(externalAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in externalAuthDto', async () => {
    const { externalAuthDto, sut } = makeSut();
    externalAuthDto.body.name = '';
    const result = await sut.execute(externalAuthDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a return empty app ID in findAppByIdRepository', async () => {
    const { externalAuthDto, sut } = makeSut();
    jest
      .spyOn(sut['findAppByIdRepository'], 'find')
      .mockResolvedValueOnce({} as App);
    const result = await sut.execute(externalAuthDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when a return empty user ID in createUserRepository', async () => {
    const { externalAuthDto, sut } = makeSut();
    jest
      .spyOn(sut['filterEmailRepository'], 'filter')
      .mockResolvedValueOnce({} as User);

    jest.spyOn(sut['createUserRepository'], 'create').mockResolvedValueOnce('');
    const result = await sut.execute(externalAuthDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return Access Token when pass correct externalAuthDto and created new user', async () => {
    const { externalAuthDto, sut } = makeSut();
    jest
      .spyOn(sut['filterEmailRepository'], 'filter')
      .mockResolvedValueOnce({} as User);

    const result = await sut.execute(externalAuthDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(AccessTokenMock);
  });
});
