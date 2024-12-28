import {
  CompanyDataResponseDto,
  CompanyResponseDto,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyByIdRepository,
  ValidationCompanyId,
} from '../../../src';
import { FindCompanyByIdRepositoryMock } from '../../repository';

const makeSut = (id: string, repository: FindCompanyByIdRepository) => {
  const sut = ValidationCompanyId(id, repository);

  return {
    sut,
  };
};

describe('ValidationCompanyId', () => {
  it('should return undefined when exist company id in database', async () => {
    const { sut } = makeSut('any_id', new FindCompanyByIdRepositoryMock());

    const result = await sut;

    expect(result?.isLeft()).toBe(false);
    expect(result?.isRight()).toBe(true);
    expect(result?.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass incorrect company id', async () => {
    const { sut } = makeSut('', new FindCompanyByIdRepositoryMock());

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when no pass incorrect company id', async () => {
    const mockEmptyItem = {} as CompanyResponseDto;

    const mockEmptyRepository: FindCompanyByIdRepository = {
      find: jest.fn(async () => mockEmptyItem),
    };

    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotExists);
  });
});
