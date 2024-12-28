import {
  ContentFile,
  EntityNotEmpty,
  EntityNotExists,
  FindContentFileByIdRepository,
  ValidationContentFileId,
} from '../../../src';
import { FindContentFileByIdRepositoryMock } from '../../repository';

const makeSut = (id: string, repository: FindContentFileByIdRepository) => {
  const sut = ValidationContentFileId(id, repository);

  return {
    sut,
  };
};

describe('ValidationContentFileId', () => {
  it('should return undefined when exist content file id in database', async () => {
    const { sut } = makeSut('any_id', new FindContentFileByIdRepositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass correct content file id', async () => {
    const { sut } = makeSut('', new FindContentFileByIdRepositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when no pass correct Content File id', async () => {
    const mockEmptyItem = {} as ContentFile;

    const mockEmptyRepository: FindContentFileByIdRepository = {
      find: jest.fn(async () => mockEmptyItem),
    };
    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
