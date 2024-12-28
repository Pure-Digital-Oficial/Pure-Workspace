import {
  CompanyAllIdsResponseDto,
  CompanyResponseDto,
  EntityNotExists,
  FindAllCompanyIds,
  FindAllCompanyIdsDto,
  FindAllCompanyIdsRepository,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import {
  companyAllIdsMock,
  CompanySimpleMock,
  userMock,
} from '../../../entity';
import {
  FindAllCompanyIdsRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: FindAllCompanyIds;
  findAllCompanyIdsDto: FindAllCompanyIdsDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findAllCompanyIdsRepository: FindAllCompanyIdsRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const findAllCompanyIdsRepository = new FindAllCompanyIdsRepositoryMock();

  const findAllCompanyIdsDto: FindAllCompanyIdsDto = {
    companyId: CompanySimpleMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new FindAllCompanyIds(
    findUserByIdRepository,
    findCompanyByIdRepository,
    findAllCompanyIdsRepository
  );

  return {
    sut,
    findAllCompanyIdsDto,
    findUserByIdRepository,
    findCompanyByIdRepository,
    findAllCompanyIdsRepository,
  };
};

describe('FindAllCompanyIds', () => {
  it('should return All company ids when pass correct FindAllCompanyIdsDto', async () => {
    const { findAllCompanyIdsDto, sut } = makeSut();

    const result = await sut.execute(findAllCompanyIdsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(companyAllIdsMock);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { findAllCompanyIdsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(findAllCompanyIdsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { findAllCompanyIdsDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(findAllCompanyIdsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company ids system', async () => {
    const { findAllCompanyIdsDto, sut } = makeSut();
    jest
      .spyOn(sut['findAllCompanyIdsRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyAllIdsResponseDto);
    const result = await sut.execute(findAllCompanyIdsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
