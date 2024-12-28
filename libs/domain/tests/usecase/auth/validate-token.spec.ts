import {
  EntityNotEmpty,
  EntityNotExists,
  EntityNotValid,
  FindUserByIdRepository,
  UserList,
  ValidateToken,
  ValidateTokenDto,
  ValidateTokenExpirationRepository,
} from '../../../src';
import { AccessTokenMock, userMock } from '../../entity';
import {
  FindUserByIdRepositoryMock,
  ValidateTokenExpirationRepositoryMock,
} from '../../repository';

type SutTypes = {
  sut: ValidateToken;
  validateTokenDto: ValidateTokenDto;
  findUserByIdRepository: FindUserByIdRepository;
  validateTokenExpirationRepository: ValidateTokenExpirationRepository;
};

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const validateTokenExpirationRepository =
    new ValidateTokenExpirationRepositoryMock();

  const validateTokenDto: ValidateTokenDto = {
    loggedUserId: userMock.userId,
    token: AccessTokenMock.token,
  };

  const sut = new ValidateToken(
    findUserByIdRepository,
    validateTokenExpirationRepository
  );

  return {
    sut,
    validateTokenDto,
    findUserByIdRepository,
    validateTokenExpirationRepository,
  };
};

describe('ValidateToken', () => {
  it('should return true when a pass correct validateTokenDto', async () => {
    const { sut, validateTokenDto } = makeSut();

    const result = await sut.execute(validateTokenDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(AccessTokenMock.token);
  });

  it('should return EntityNotEmpty when a pass empty loggedUserId in validateTokenDto', async () => {
    const { sut, validateTokenDto } = makeSut();
    validateTokenDto.loggedUserId = '';
    const result = await sut.execute(validateTokenDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty token in validateTokenDto', async () => {
    const { sut, validateTokenDto } = makeSut();
    validateTokenDto.token = '';
    const result = await sut.execute(validateTokenDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a return empty user in findUserByIdRepository', async () => {
    const { sut, validateTokenDto } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(validateTokenDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotValid when a return false in validateTokenExpirationRepository', async () => {
    const { sut, validateTokenDto } = makeSut();

    jest
      .spyOn(sut['validateTokenExpirationRepository'], 'validate')
      .mockResolvedValueOnce(false);

    const result = await sut.execute(validateTokenDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotValid);
  });
});
