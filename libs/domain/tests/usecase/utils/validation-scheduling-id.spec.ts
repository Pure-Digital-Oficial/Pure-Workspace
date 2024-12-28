import {
  EntityNotEmpty,
  EntityNotExists,
  FindSchedulingByIdRepository,
  Scheduling,
  ValidationSchedulingId,
} from '../../../src';
import { FindSchedulingByIdRepositoryMock } from '../../repository';

const makeSut = (id: string, repository: FindSchedulingByIdRepository) => {
  const sut = ValidationSchedulingId(id, repository);

  return {
    sut,
  };
};

describe('ValidationSchedulingId', () => {
  it('should return undefined when exist scheduling id in database', async () => {
    const { sut } = makeSut('any_id', new FindSchedulingByIdRepositoryMock());

    const result = await sut;

    expect(result?.isLeft()).toBe(false);
    expect(result?.isRight()).toBe(true);
    expect(result?.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass correct scheduling id', async () => {
    const { sut } = makeSut('', new FindSchedulingByIdRepositoryMock());

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when no pass correct scheduling id', async () => {
    const mockEmptyItem = {} as Scheduling;

    const mockEmptyRepository: FindSchedulingByIdRepository = {
      find: jest.fn(async () => mockEmptyItem),
    };
    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotExists);
  });
});
