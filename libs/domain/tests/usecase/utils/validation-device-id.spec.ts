import {
  Device,
  EntityNotEmpty,
  EntityNotExists,
  FindDeviceByIdRepository,
  ValidationDeviceId,
} from '../../../src';
import { FindDeviceByIdRepositoryMock } from '../../repository';

const makeSut = (id: string, repository: FindDeviceByIdRepository) => {
  const sut = ValidationDeviceId(id, repository);

  return {
    sut,
  };
};

describe('ValidationDeviceId', () => {
  it('should return undefined when exist device id in database', async () => {
    const { sut } = makeSut('any_id', new FindDeviceByIdRepositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass correct device id', async () => {
    const { sut } = makeSut('', new FindDeviceByIdRepositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when no exist device in database', async () => {
    const mockEmptyItem = {} as Device;

    const mockEmptyRepository: FindDeviceByIdRepository = {
      find: jest.fn(async () => mockEmptyItem),
    };
    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
