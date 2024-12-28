import {
  ChangeProductStatus,
  ChangeProductStatusDto,
  ChangeProductStatusRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotPermissions,
  FindProductByIdRepository,
  FindUserByIdRepository,
  PermissionsUserResponseDto,
  ProductResponseDto,
  UserList,
  VerifyUserPermissionsByIdRepository,
} from '../../../../src';
import { ProductMock, userMock } from '../../../entity';
import {
  ChangeProductStatusRepositoryMock,
  FindProductByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  VerifyUserPermissionsByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ChangeProductStatus;
  changeProductStatusDto: ChangeProductStatusDto;
  findUserByIdRepository: FindUserByIdRepository;
  findProductByIdRepository: FindProductByIdRepository;
  verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository;
  changeProductStatusRepository: ChangeProductStatusRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findProductByIdRepository = new FindProductByIdRepositoryMock();
  const verifyUserPermissionsByIdRepository =
    new VerifyUserPermissionsByIdRepositoryMock();
  const changeProductStatusRepository = new ChangeProductStatusRepositoryMock();

  const changeProductStatusDto: ChangeProductStatusDto = {
    id: ProductMock.id,
    loggedUserId: userMock.userId,
    status: ProductMock.status,
  };

  const sut = new ChangeProductStatus(
    findUserByIdRepository,
    findProductByIdRepository,
    verifyUserPermissionsByIdRepository,
    changeProductStatusRepository
  );

  return {
    sut,
    changeProductStatusDto,
    findUserByIdRepository,
    findProductByIdRepository,
    verifyUserPermissionsByIdRepository,
    changeProductStatusRepository,
  };
};

describe('ChangeProductStatus', () => {
  it('should return Product ID when pass correct changeProductStatusDto', async () => {
    const { changeProductStatusDto, sut } = makeSut();

    const result = await sut.execute(changeProductStatusDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ProductMock.id);
  });

  it('should return EntityNotEmpty when a pass empty loggedUserId in changeProductStatusDto', async () => {
    const { sut, changeProductStatusDto } = makeSut();
    changeProductStatusDto.loggedUserId = '';
    const result = await sut.execute(changeProductStatusDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty Product ID in changeProductStatusDto', async () => {
    const { sut, changeProductStatusDto } = makeSut();
    changeProductStatusDto.id = '';
    const result = await sut.execute(changeProductStatusDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty Product Status in changeProductStatusDto', async () => {
    const { sut, changeProductStatusDto } = makeSut();
    changeProductStatusDto.status = '';
    const result = await sut.execute(changeProductStatusDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a return empty user in findUserByIdRepository', async () => {
    const { sut, changeProductStatusDto } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(changeProductStatusDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a return empty user in findUserByIdRepository', async () => {
    const { sut, changeProductStatusDto } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(changeProductStatusDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a return empty product in findProductByIdRepository', async () => {
    const { sut, changeProductStatusDto } = makeSut();

    jest
      .spyOn(sut['findProductByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ProductResponseDto);

    const result = await sut.execute(changeProductStatusDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotPermissions when a pass incorrect Logged User ID', async () => {
    const { changeProductStatusDto, sut } = makeSut();
    jest
      .spyOn(sut['verifyUserPermissionsByIdRepository'], 'verify')
      .mockResolvedValueOnce({} as PermissionsUserResponseDto);
    const result = await sut.execute(changeProductStatusDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotPermissions);
  });

  it('should return EntityNotEdit when a return empty product in findProductByIdRepository', async () => {
    const { sut, changeProductStatusDto } = makeSut();

    jest
      .spyOn(sut['changeProductStatusRepository'], 'change')
      .mockResolvedValueOnce('');

    const result = await sut.execute(changeProductStatusDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
