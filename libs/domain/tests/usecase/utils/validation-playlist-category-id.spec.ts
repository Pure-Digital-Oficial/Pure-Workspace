import {
  EntityNotEmpty,
  EntityNotExists,
  FindPlaylistCategoryByIdRepository,
  PlaylistCategory,
  ValidationPlaylistCategoryId,
} from '../../../src';
import { FindPlaylistCategoryByIdRepositoryMock } from '../../repository';

const makeSut = (
  id: string,
  repository: FindPlaylistCategoryByIdRepository
) => {
  const sut = ValidationPlaylistCategoryId(id, repository);

  return {
    sut,
  };
};

describe('ValidationPlaylistCategoryId', () => {
  it('should return undefined when exist playlist id in database', async () => {
    const { sut } = makeSut(
      'any_id',
      new FindPlaylistCategoryByIdRepositoryMock()
    );

    const result = await sut;

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass correct playlist category id', async () => {
    const { sut } = makeSut('', new FindPlaylistCategoryByIdRepositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when no pass correct playlist id', async () => {
    const mockEmptyItem = {} as PlaylistCategory;

    const mockEmptyRepository: FindPlaylistCategoryByIdRepository = {
      find: jest.fn(async () => mockEmptyItem),
    };
    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
