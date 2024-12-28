import {
  EntityNotEmpty,
  EntityNotExists,
  FindUserIdByCompanyIdRepository,
  ValidationUserIdByCompanyId,
} from '../../../src';
import { FindUserIdByCompanyIdRepositoryMock } from '../../repository';

const makeSut = (
  userId: string,
  companyId: string,
  repository: FindUserIdByCompanyIdRepository
) => {
  const sut = ValidationUserIdByCompanyId(userId, companyId, repository);

  return {
    sut,
  };
};

describe('ValidationUserIdByCompanyId', () => {
  it('should return undefined when exist user id in database', async () => {
    const { sut } = makeSut(
      'any_user_id',
      'any_company_id',
      new FindUserIdByCompanyIdRepositoryMock()
    );

    const result = await sut;

    expect(result?.isLeft()).toBe(false);
    expect(result?.isRight()).toBe(true);
    expect(result?.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass incorrect user id', async () => {
    const { sut } = makeSut(
      '',
      'any_company_id',
      new FindUserIdByCompanyIdRepositoryMock()
    );

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when no pass incorrect Company id', async () => {
    const { sut } = makeSut(
      'any_user_id',
      '',
      new FindUserIdByCompanyIdRepositoryMock()
    );

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when no pass incorrect user id', async () => {
    const mockRepository: FindUserIdByCompanyIdRepository = {
      find: jest.fn(async () => ''),
    };

    const { sut } = makeSut('any_user_id', 'any_company_id', mockRepository);

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotExists);
  });
});
