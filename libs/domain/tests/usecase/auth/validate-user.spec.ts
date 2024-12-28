import {
  EntityNotExists,
  FilterByEmailOrNicknameRepository,
  IncorrectPassword,
  InsufficientCharacters,
  User,
  ValidateHashRepository,
  ValidateUser,
  ValidateUserDto,
} from '../../../src';
import {
  FilterByEmailOrNicknameRepositoryMock,
  ValidateHashRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: ValidateUser;
  validateUserDto: ValidateUserDto;
  filterByEmailOrNicknameRepository: FilterByEmailOrNicknameRepository;
  validateHashRespository: ValidateHashRepository;
}

const makeSut = (): SutTypes => {
  const filterByEmailOrNicknameRepository =
    new FilterByEmailOrNicknameRepositoryMock();
  const validateHashRespository = new ValidateHashRepositoryMock();

  const validateUserDto: ValidateUserDto = {
    email: 'any_email',
    password: 'any_password',
  };

  const sut = new ValidateUser(
    filterByEmailOrNicknameRepository,
    validateHashRespository
  );

  return {
    sut,
    validateUserDto,
    filterByEmailOrNicknameRepository,
    validateHashRespository,
  };
};

describe('ValidateUser', () => {
  it('should return valid email when pass correct validateUserDto', async () => {
    const { sut, validateUserDto } = makeSut();

    const result = await sut.execute(validateUserDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual({
      email: validateUserDto.email,
      error: '',
    });
  });

  it('should return InsufficientCharacters when pass incorrect email', async () => {
    const { sut, validateUserDto } = makeSut();
    validateUserDto.email = '';
    const result = await sut.execute(validateUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return InsufficientCharacters when pass incorrect password', async () => {
    const { sut, validateUserDto } = makeSut();
    validateUserDto.password = '';
    const result = await sut.execute(validateUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return EntityNotExists when not exist user in database', async () => {
    const { sut, validateUserDto } = makeSut();
    jest
      .spyOn(sut['filterByEmailOrNicknameRepository'], 'filter')
      .mockResolvedValueOnce({} as User);
    const result = await sut.execute(validateUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when not exist user auth in database', async () => {
    const { sut, validateUserDto } = makeSut();
    jest
      .spyOn(sut['filterByEmailOrNicknameRepository'], 'filter')
      .mockResolvedValueOnce({
        auth: [
          {
            status: 'any_status',
          },
        ],
      } as User);
    const result = await sut.execute(validateUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return IncorrectPassword when pass incorrect password', async () => {
    const { sut, validateUserDto } = makeSut();
    jest
      .spyOn(sut['validateHashRespository'], 'validate')
      .mockResolvedValueOnce(false);
    const result = await sut.execute(validateUserDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(IncorrectPassword);
  });
});
