import {
  EntityNotEmpty,
  EntityNotExists,
  FilterByEmailOrNicknameRepository,
  IncorrectPassword,
  Login,
  LoginDto,
  SignInRepository,
  User,
} from '../../../src';
import { FilterByEmailOrNicknameRepositoryMock } from '../../repository';
import { SignInRepositoryMock } from '../../repository/auth/sign-in.mock';
import { AccessTokenMock } from '../../entity';

interface SutTypes {
  sut: Login;
  loginDto: LoginDto;
  signInRepository: SignInRepository;
  filterEmailRepository: FilterByEmailOrNicknameRepository;
}

const makeSut: () => SutTypes = () => {
  const signInRepository = new SignInRepositoryMock();
  const filterEmailRepository = new FilterByEmailOrNicknameRepositoryMock();

  const loginDto: LoginDto = {
    email: 'any_email',
    error: '',
  };

  const sut = new Login(signInRepository, filterEmailRepository);

  return {
    sut,
    loginDto,
    signInRepository,
    filterEmailRepository,
  };
};

describe('Login', () => {
  it('should return access token object when pass correct LoginDto', async () => {
    const { sut, loginDto } = makeSut();

    const result = await sut.execute(loginDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toEqual(AccessTokenMock);
  });

  it('should return IncorrectPassword when return error from system', async () => {
    const { sut, loginDto } = makeSut();
    loginDto.error = 'any_error';
    const result = await sut.execute(loginDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(IncorrectPassword);
  });

  it('should return EntityNotEmpty when pass incorrect email', async () => {
    const { sut, loginDto } = makeSut();
    loginDto.email = '';
    const result = await sut.execute(loginDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when not exist user in database', async () => {
    const { sut, loginDto } = makeSut();
    jest
      .spyOn(sut['filterEmailRepository'], 'filter')
      .mockResolvedValueOnce({} as User);

    const result = await sut.execute(loginDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
