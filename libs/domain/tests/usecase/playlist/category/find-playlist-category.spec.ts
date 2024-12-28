import {
  EntityNotEmpty,
  EntityNotExists,
  FindPlaylistCategoryById,
  FindPlaylistCategoryByIdDto,
  FindPlaylistCategoryByIdRepository,
  FindUserByIdRepository,
  PlaylistCategory,
  UserList,
} from '../../../../src';
import { PlaylistCategoryMock, userMock } from '../../../entity';
import {
  FindPlaylistCategoryByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: FindPlaylistCategoryById;
  findPlaylistCategoryByIdDto: FindPlaylistCategoryByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPlaylistCategoryByIdRepository: FindPlaylistCategoryByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPlaylistCategoryByIdRepository =
    new FindPlaylistCategoryByIdRepositoryMock();

  const findPlaylistCategoryByIdDto: FindPlaylistCategoryByIdDto = {
    loggedUserId: userMock.userId,
    id: PlaylistCategoryMock.id,
  };

  const sut = new FindPlaylistCategoryById(
    findUserByIdRepository,
    findPlaylistCategoryByIdRepository
  );

  return {
    findUserByIdRepository,
    findPlaylistCategoryByIdRepository,
    findPlaylistCategoryByIdDto,
    sut,
  };
};

describe('FindPlaylistCategoryById', () => {
  it('should return PlaylistCategory when pass conrrect data', async () => {
    const { sut, findPlaylistCategoryByIdDto } = makeSut();

    const result = await sut.execute(findPlaylistCategoryByIdDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(PlaylistCategoryMock);
  });

  it('should return EntityNotEmpty when a pass incorrect ID', async () => {
    const { findPlaylistCategoryByIdDto, sut } = makeSut();
    findPlaylistCategoryByIdDto.id = '';
    const result = await sut.execute(findPlaylistCategoryByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists if there is no playlist category created in the database', async () => {
    const { findPlaylistCategoryByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistCategoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistCategory);

    const result = await sut.execute(findPlaylistCategoryByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { findPlaylistCategoryByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findPlaylistCategoryByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
