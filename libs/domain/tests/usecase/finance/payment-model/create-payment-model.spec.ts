import {
  CreatePaymentModel,
  CreatePaymentModelDto,
  CreatePaymentModelRepository,
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotPermissions,
  FindPaymentModelByNameRepository,
  FindUserByIdRepository,
  PermissionsUserResponseDto,
  UserList,
  VerifyUserPermissionsByIdRepository,
} from '../../../../src';
import { PaymentModelMock, userMock } from '../../../entity';
import {
  CreatePaymentModelRepositoryMock,
  FindPaymentModelByNameRepositoryMock,
  FindUserByIdRepositoryMock,
  VerifyUserPermissionsByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: CreatePaymentModel;
  createPaymentModelDto: CreatePaymentModelDto;
  findUserByIdRepository: FindUserByIdRepository;
  verifyUserPermissionsByIdRepository: VerifyUserPermissionsByIdRepository;
  findPaymentModelByNameReposiotory: FindPaymentModelByNameRepository;
  createPaymentModelRepository: CreatePaymentModelRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const verifyUserPermissionsByIdRepository =
    new VerifyUserPermissionsByIdRepositoryMock();
  const findPaymentModelByNameReposiotory =
    new FindPaymentModelByNameRepositoryMock();
  const createPaymentModelRepository = new CreatePaymentModelRepositoryMock();

  const createPaymentModelDto: CreatePaymentModelDto = {
    loggedUserId: userMock.userId,
    body: {
      description: PaymentModelMock.description,
      name: PaymentModelMock.name,
    },
  };

  const sut = new CreatePaymentModel(
    findUserByIdRepository,
    verifyUserPermissionsByIdRepository,
    findPaymentModelByNameReposiotory,
    createPaymentModelRepository
  );

  return {
    sut,
    createPaymentModelDto,
    findUserByIdRepository,
    verifyUserPermissionsByIdRepository,
    findPaymentModelByNameReposiotory,
    createPaymentModelRepository,
  };
};

describe('CreatePaymentModel', () => {
  it('should return Payment Model ID when passa correct createPaymentModelDto', async () => {
    const { createPaymentModelDto, sut } = makeSut();

    const result = await sut.execute(createPaymentModelDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(PaymentModelMock.id);
  });

  it('should return EntityNotEmpty when a pass empty loggedUserId in validateTokenDto', async () => {
    const { sut, createPaymentModelDto } = makeSut();
    createPaymentModelDto.loggedUserId = '';
    const result = await sut.execute(createPaymentModelDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty name in validateTokenDto', async () => {
    const { sut, createPaymentModelDto } = makeSut();
    createPaymentModelDto.body.name = '';
    const result = await sut.execute(createPaymentModelDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty description in validateTokenDto', async () => {
    const { sut, createPaymentModelDto } = makeSut();
    createPaymentModelDto.body.description = '';
    const result = await sut.execute(createPaymentModelDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a return empty user in findUserByIdRepository', async () => {
    const { sut, createPaymentModelDto } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(createPaymentModelDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a return empty Payment ID in verifyUserPermissionsByIdRepository', async () => {
    const { sut, createPaymentModelDto } = makeSut();

    jest
      .spyOn(sut['verifyUserPermissionsByIdRepository'], 'verify')
      .mockResolvedValueOnce({} as PermissionsUserResponseDto);

    const result = await sut.execute(createPaymentModelDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotPermissions);
  });

  it('should return EntityAlreadyExists when a return empty payment model in findPaymentModelByNameReposiotory', async () => {
    const { sut, createPaymentModelDto } = makeSut();

    jest
      .spyOn(sut['findPaymentModelByNameReposiotory'], 'find')
      .mockResolvedValueOnce(PaymentModelMock);

    const result = await sut.execute(createPaymentModelDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotCreated when a return empty payment ID in createPaymentModelRepository', async () => {
    const { sut, createPaymentModelDto } = makeSut();

    jest
      .spyOn(sut['createPaymentModelRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(createPaymentModelDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
