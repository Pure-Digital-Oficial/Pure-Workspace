import {
  EntityNotEmpty,
  EntityAlreadyExists,
  FindCompanyByCnpjRepository,
  ValidationCompanyByCnpj,
} from '../../../src';
import { CompanySimpleMock } from '../../entity';
import { FindCompanyByCnpjRepositoryMock } from '../../repository';

const makeSut = (id: string, repository: FindCompanyByCnpjRepository) => {
  const sut = ValidationCompanyByCnpj(id, repository);

  return {
    sut,
  };
};

describe('ValidationCompanyByCnpj', () => {
  it('should return undefined when exist cnpj in database', async () => {
    const { sut } = makeSut('any_id', new FindCompanyByCnpjRepositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass correct cnpj', async () => {
    const { sut } = makeSut('', new FindCompanyByCnpjRepositoryMock());

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when no exist company in database', async () => {
    const mockEmptyRepository: FindCompanyByCnpjRepository = {
      find: jest.fn(async () => CompanySimpleMock),
    };
    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });
});
