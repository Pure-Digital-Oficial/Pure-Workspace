import {
  ListDevice,
  ListDeviceRepository,
  FindUserByIdRepository,
  ListDeviceDto,
  EntityNotExists,
  UserList,
  FindCompanyByIdRepository,
  CompanyResponseDto,
} from '../../../src';
import { CompanyMock, ListDeviceResponseMock, userMock } from '../../entity';
import {
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListDeviceRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: ListDevice;
  listDeviceDto: ListDeviceDto;
  finUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  listDeviceRepository: ListDeviceRepository;
}

export const makeSut = (): SutTypes => {
  const finUserByIdRepository = new FindUserByIdRepositoryMock();
  const listDeviceRepository = new ListDeviceRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();

  const listDeviceDto: ListDeviceDto = {
    loggedUserId: userMock.userId,
    companyId: CompanyMock.simple.id,
    filter: '',
  };

  const sut = new ListDevice(
    finUserByIdRepository,
    findCompanyByIdRepository,
    listDeviceRepository
  );

  return {
    sut,
    listDeviceDto,
    finUserByIdRepository,
    findCompanyByIdRepository,
    listDeviceRepository,
  };
};

describe('ListDevice', () => {
  it('should  return ListDeviceResponseDto when pass correct ListDeviceDto', async () => {
    const { listDeviceDto, sut } = makeSut();

    const result = await sut.execute(listDeviceDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual(ListDeviceResponseMock);
  });

  it('should return EntityNotExists when a not exist User in system', async () => {
    const { listDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a not exist company in system', async () => {
    const { listDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(listDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
