import {
  FindUserByIdRepositoryMock,
  ListCompanyRepositoryMock,
} from '../../../repository';
import {
  EntityNotExists,
  FindUserByIdRepository,
  ListCompany,
  ListCompanyDto,
  ListCompanyRepository,
  UserList,
} from '../../../../src';
import { ListCompanyMock, userMock } from '../../../entity';

interface SutTypes {
  sut: ListCompany;
  listCompanyDto: ListCompanyDto;
  findUserByIdRepository: FindUserByIdRepository;
  listCompanyRepository: ListCompanyRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listCompanyRepository = new ListCompanyRepositoryMock();

  const listCompanyDto: ListCompanyDto = {
    filter: '',
    loggedUserId: userMock.userId,
  };

  const sut = new ListCompany(findUserByIdRepository, listCompanyRepository);

  return {
    sut,
    listCompanyDto,
    findUserByIdRepository,
    listCompanyRepository,
  };
};

describe('ListCompany', () => {
  it('should return list company when pass correct ListCompanyDto', async () => {
    const { sut, listCompanyDto } = makeSut();
    const result = await sut.execute(listCompanyDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(ListCompanyMock);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { listCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
