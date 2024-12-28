import {
  CreateUser,
  CreateUserDto,
  CreateUserRepository,
  EntityAlreadyExists,
  InsufficientCharacters,
  FilterByEmailOrNicknameDto,
  EntityNotEmpty,
  FindAppByIdRepository,
  FilterByEmailOrNicknameRepository,
  EntityNotExists,
  App,
  EntityNotCreated,
} from '../../../src';
import { userMock } from '../../entity';
import {
  CreateUserRepositoryMock,
  FilterByEmailOrNicknameEmptyRepositoryMock,
  FindAppByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: CreateUser;
  createUserDto: CreateUserDto;
  filterNickNameDto: FilterByEmailOrNicknameDto;
  createUserRepository: CreateUserRepository;
  filterNickNameRepository: FilterByEmailOrNicknameRepository;
  findAppByIdRepository: FindAppByIdRepository;
}

const makeSut = (): SutTypes => {
  const createUserRepository = new CreateUserRepositoryMock();
  const filterNickNameRepository =
    new FilterByEmailOrNicknameEmptyRepositoryMock();
  const findAppByIdRepository = new FindAppByIdRepositoryMock();

  const createUserDto: CreateUserDto = {
    appId: 'any_id',
    name: userMock.name,
    nickname: userMock.nickname,
    birthDate: new Date(),
  };

  const filterNickNameDto: FilterByEmailOrNicknameDto = {
    nickName: userMock.nickname,
  };

  const sut = new CreateUser(
    createUserRepository,
    filterNickNameRepository,
    findAppByIdRepository
  );

  return {
    createUserRepository,
    filterNickNameRepository,
    findAppByIdRepository,
    createUserDto,
    filterNickNameDto,
    sut,
  };
};

describe('CreateUser', () => {
  it('should return void when a correct user is created', async () => {
    const { createUserDto, sut } = makeSut();

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(userMock.userId);
  });

  it('should return InsufficientCharacters when a incorrect name', async () => {
    const { sut } = makeSut();

    const createUserDto: CreateUserDto = {
      appId: 'any_id',
      name: '',
      nickname: userMock.nickname,
      birthDate: new Date(),
    };

    const result = await sut.execute(createUserDto);

    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return InsufficientCharacters when a incorrect nickName', async () => {
    const { sut } = makeSut();

    const createUserDto: CreateUserDto = {
      appId: 'any_id',
      name: userMock.name,
      nickname: '',
      birthDate: new Date(),
    };

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return EntityNotEmpty when a incorrect app id', async () => {
    const { sut } = makeSut();

    const createUserDto: CreateUserDto = {
      appId: '',
      name: userMock.name,
      nickname: userMock.nickname,
      birthDate: new Date(),
    };

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists if already exist  user in database', async () => {
    const { createUserDto, createUserRepository, findAppByIdRepository } =
      makeSut();

    const mockEmptyRepository: FilterByEmailOrNicknameRepository = {
      filter: jest.fn(async () => userMock),
    };

    const sut = new CreateUser(
      createUserRepository,
      mockEmptyRepository,
      findAppByIdRepository
    );

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists if already exist app in database', async () => {
    const { createUserDto, createUserRepository, filterNickNameRepository } =
      makeSut();

    const appMock = {
      id: '',
    } as App;

    const mockEmptyRepository: FindAppByIdRepository = {
      find: jest.fn(async () => appMock),
    };

    const sut = new CreateUser(
      createUserRepository,
      filterNickNameRepository,
      mockEmptyRepository
    );

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated if there is no user created in the database', async () => {
    const { createUserDto, filterNickNameRepository, findAppByIdRepository } =
      makeSut();

    const mockEmptyRepository: CreateUserRepository = {
      create: jest.fn(async () => ''),
    };

    const sut = new CreateUser(
      mockEmptyRepository,
      filterNickNameRepository,
      findAppByIdRepository
    );

    const result = await sut.execute(createUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
