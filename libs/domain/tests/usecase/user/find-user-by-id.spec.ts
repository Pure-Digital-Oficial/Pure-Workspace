import {
  EntityNotEmpty,
  EntityNotExists,
  FindUserById,
  FindUserByIdDto,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { listUserMock, userMock } from '../../entity';
import { FindUserByIdRepositoryMock } from '../../repository';

interface SutTypes {
  sut: FindUserById;
  findUserByIdDto: FindUserByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();

  const findUserByIdDto: FindUserByIdDto = {
    id: listUserMock[0].userId,
    loggedUserId: userMock.userId,
  };

  const sut = new FindUserById(findUserByIdRepository);

  return {
    sut,
    findUserByIdDto,
    findUserByIdRepository,
  };
};

describe('FindUserById', () => {
  it('should return user when a pass correct user id', async () => {
    const { sut, findUserByIdDto } = makeSut();

    const result = await sut.execute(findUserByIdDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(listUserMock[0]);
  });

  it('should return EntityNotEmpty when a pass incorrect user id', async () => {
    const { sut, findUserByIdDto } = makeSut();
    findUserByIdDto.id = '';
    const result = await sut.execute(findUserByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when not exist logged user id in database', async () => {
    const { sut, findUserByIdDto } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce(listUserMock[0]);

    const result = await sut.execute(findUserByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when not exist user id in database', async () => {
    const { sut, findUserByIdDto } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce(listUserMock[0]);
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(findUserByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
