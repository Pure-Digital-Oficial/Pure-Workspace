import {
  EntityNotActive,
  EntityNotEmpty,
  EntityNotPermissions,
  PermissionsUserResponseDto,
  ValidationUserPermisssions,
  VerifyUserPermissionsByIdRepository,
} from '../../../src';
import { PermissionsUserResponseMock, listUserMock } from '../../entity';
import { VerifyUserPermissionsByIdRepositoryMock } from '../../repository';

const makeSut = (
  id: string,
  repository: VerifyUserPermissionsByIdRepository
) => {
  const sut = ValidationUserPermisssions(
    id,
    ['ADMIN', 'DEFAULT_ADMIN'],
    repository
  );

  return {
    sut,
  };
};

describe('ValidationUserPermisssions', () => {
  it('should return undefined when exist user id in database', async () => {
    const { sut } = makeSut(
      'any_id',
      new VerifyUserPermissionsByIdRepositoryMock()
    );

    const result = await sut;

    expect(result?.isLeft()).toBe(false);
    expect(result?.isRight()).toBe(true);
    expect(result?.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when no pass correct user id', async () => {
    const { sut } = makeSut('', new VerifyUserPermissionsByIdRepositoryMock());

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return NotPermissionError when no pass correct user id', async () => {
    const mockEmptyItem = {} as PermissionsUserResponseDto;

    const mockEmptyRepository: VerifyUserPermissionsByIdRepository = {
      verify: jest.fn(async () => mockEmptyItem),
    };
    const { sut } = makeSut('any_id', mockEmptyRepository);

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotPermissions);
  });

  it('should return EntityNotActive when no pass incorrect user id', async () => {
    PermissionsUserResponseMock.status = 'INACTIVE';
    const mockRepository: VerifyUserPermissionsByIdRepository = {
      verify: jest.fn(async () => PermissionsUserResponseMock),
    };

    const { sut } = makeSut('any_id', mockRepository);

    const result = await sut;

    expect(result?.isLeft()).toBe(true);
    expect(result?.isRight()).toBe(false);
    expect(result?.value).toBeInstanceOf(EntityNotActive);
  });
});
