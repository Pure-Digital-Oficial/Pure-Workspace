import {
  Directory,
  EntityNotEmpty,
  EntityNotExists,
  FindDirectoryByIdRepository,
  ValidationDirectoryId,
} from '../../../src';
import { FindDirectoryByIdRespositoryMock } from '../../repository';

const makeSut = (id: string, repository: FindDirectoryByIdRepository) => {
  const sut = ValidationDirectoryId(id, repository);

  return {
    sut,
  };
};

describe('ValidationDirectoryId', () => {
  it('should return undefined when exist directory id in database', async () => {
    const { sut } = makeSut('any_id', new FindDirectoryByIdRespositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass correct directory id', async () => {
    const { sut } = makeSut('', new FindDirectoryByIdRespositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when no pass correct directory id', async () => {
    const mockEmptyItem = {} as Directory;

    const mockEmptyRepository: FindDirectoryByIdRepository = {
      find: jest.fn(async () => mockEmptyItem),
    };
    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
