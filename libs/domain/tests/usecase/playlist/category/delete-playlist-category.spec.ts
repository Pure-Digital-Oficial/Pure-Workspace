import {
  EntityNotExists,
  FindPlaylistCategoryByIdRepository,
  PlaylistCategory,
  UserList,
} from '../../../../src';
import {
  DeletePlaylistCategory,
  DeletePlaylistCategoryDto,
  DeletePlaylistCategoryRepository,
  FindUserByIdRepository,
} from '../../../../src';
import { PlaylistCategoryMock, userMock } from '../../../entity';
import {
  DeletePlaylistCategoryRepositoryMock,
  FindPlaylistCategoryByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: DeletePlaylistCategory;
  deletePlaylistCategoryDto: DeletePlaylistCategoryDto;
  findUserRepository: FindUserByIdRepository;
  findPlaylistCategoryRepository: FindPlaylistCategoryByIdRepository;
  deletePlaylistCategoryRepository: DeletePlaylistCategoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserRepository = new FindUserByIdRepositoryMock();
  const findPlaylistCategoryRepository =
    new FindPlaylistCategoryByIdRepositoryMock();
  const deletePlaylistCategoryRepository =
    new DeletePlaylistCategoryRepositoryMock();
  const deletePlaylistCategoryDto: DeletePlaylistCategoryDto = {
    id: PlaylistCategoryMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new DeletePlaylistCategory(
    findUserRepository,
    findPlaylistCategoryRepository,
    deletePlaylistCategoryRepository
  );

  return {
    findPlaylistCategoryRepository,
    deletePlaylistCategoryRepository,
    findUserRepository,
    deletePlaylistCategoryDto,
    sut,
  };
};

describe('DeletePlaylistCategory', () => {
  it('should return void if deletected playlist category in system', async () => {
    const { deletePlaylistCategoryDto, sut } = makeSut();

    const result = await sut.execute(deletePlaylistCategoryDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { deletePlaylistCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deletePlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Playlist Category User ID', async () => {
    const { deletePlaylistCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findPlaylistCategoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PlaylistCategory);
    const result = await sut.execute(deletePlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
