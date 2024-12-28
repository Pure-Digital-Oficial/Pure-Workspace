import {
  EntityAlreadyExists,
  EntityNotEmpty,
  FindDirectoryByNameRepository,
  ValidationDirectoryByName,
} from '../../../src';
import { DirectoryMock, userMock } from '../../entity';
import { FindDirectoryByNameRepositoryMock } from '../../repository';

const makeSut = (name: string, repository: FindDirectoryByNameRepository) => {
  const sut = ValidationDirectoryByName(name, userMock.userId, repository);

  return {
    sut,
  };
};

describe('ValidationDirectoryId', () => {
  it('should return undefined when exist directory name in database', async () => {
    const { sut } = makeSut(
      'any_name',
      new FindDirectoryByNameRepositoryMock()
    );

    const result = await sut;

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass correct directory name', async () => {
    const { sut } = makeSut('', new FindDirectoryByNameRepositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists when no pass correct directory name', async () => {
    const mockEmptyRepository: FindDirectoryByNameRepository = {
      find: jest.fn(async () => DirectoryMock),
    };
    const { sut } = makeSut('any_name', mockEmptyRepository);

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });
});
