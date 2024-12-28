import {
  CompanyResponseDto,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  ListUsersByCompanyId,
  ListUsersByCompanyIdDto,
  ListUsersByCompanyIdRepository,
  UserList,
} from '../../../../src';
import { CompanyMock, ListUsersByCompanyMock, userMock } from '../../../entity';
import {
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListUsersByCompanyIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ListUsersByCompanyId;
  listUsersByCompanyIdDto: ListUsersByCompanyIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  listUsersByCompanyIdRepository: ListUsersByCompanyIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const listUsersByCompanyIdRepository =
    new ListUsersByCompanyIdRepositoryMock();

  const listUsersByCompanyIdDto: ListUsersByCompanyIdDto = {
    companyId: CompanyMock.simple.id,
    filter: '',
    loggedUserId: userMock.userId,
  };

  const sut = new ListUsersByCompanyId(
    findUserByIdRepository,
    findCompanyByIdRepository,
    listUsersByCompanyIdRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    listUsersByCompanyIdRepository,
    listUsersByCompanyIdDto,
    sut,
  };
};

describe('ListUsersByCompanyId', () => {
  it('should return user list when pass correct ListUsersByCompanyIdDto', async () => {
    const { sut, listUsersByCompanyIdDto } = makeSut();
    const result = await sut.execute(listUsersByCompanyIdDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(ListUsersByCompanyMock);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { listUsersByCompanyIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listUsersByCompanyIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { listUsersByCompanyIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(listUsersByCompanyIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
