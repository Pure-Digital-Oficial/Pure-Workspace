import {
  EntityNotEmpty,
  EntityNotExists,
  FindUserByEmail,
  FindUserByEmailDto,
  FindUserByEmailRepository,
  LoggedUser,
} from '../../../src';
import { LoggedUserMock } from '../../entity';
import { FindUserByEmailRepositoryMock } from '../../repository';

interface SutTypes {
  sut: FindUserByEmail;
  findUserByEmailDto: FindUserByEmailDto;
  findUserByEmailRepository: FindUserByEmailRepository;
}

const makeSut = (): SutTypes => {
  const findUserByEmailRepository = new FindUserByEmailRepositoryMock();

  const sut = new FindUserByEmail(findUserByEmailRepository);

  return {
    sut,
    findUserByEmailDto: {
      email: LoggedUserMock.email,
    },
    findUserByEmailRepository,
  };
};

describe('FindUserByEmail', () => {
  it('should return logged User when pass correct FindUserByEmailDto', async () => {
    const { sut, findUserByEmailDto } = makeSut();

    const result = await sut.execute(findUserByEmailDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toEqual(LoggedUserMock);
  });

  it('should return EntityNotEmpty when pass incorrect Logged User ID', async () => {
    const { sut, findUserByEmailDto } = makeSut();
    findUserByEmailDto.email = '';
    const result = await sut.execute(findUserByEmailDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when pass incorrect Logged User ID', async () => {
    const { sut, findUserByEmailDto } = makeSut();
    jest
      .spyOn(sut['findUserByEmailRepository'], 'find')
      .mockResolvedValueOnce({} as LoggedUser);
    const result = await sut.execute(findUserByEmailDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
