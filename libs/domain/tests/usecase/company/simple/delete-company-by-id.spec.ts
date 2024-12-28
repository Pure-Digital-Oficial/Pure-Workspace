import {
  CompanyResponseDto,
  DeleteCompanyById,
  DeleteCompanyByIdDto,
  DeleteCompanyByIdRepository,
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanySimpleMock, userMock } from '../../../entity';
import {
  DeleteCompanyByIdRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: DeleteCompanyById;
  deleteCompanyByIdDto: DeleteCompanyByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  deleteCompanyByIdRepository: DeleteCompanyByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const deleteCompanyByIdRepository = new DeleteCompanyByIdRepositoryMock();

  const deleteCompanyByIdDto: DeleteCompanyByIdDto = {
    companyId: CompanySimpleMock.id,
    loggedUserId: userMock.userId,
    description: 'any_description',
  };

  const sut = new DeleteCompanyById(
    findUserByIdRepository,
    findCompanyByIdRepository,
    deleteCompanyByIdRepository
  );

  return {
    sut,
    deleteCompanyByIdDto,
    findUserByIdRepository,
    findCompanyByIdRepository,
    deleteCompanyByIdRepository,
  };
};

describe('DeleteCompanyById', () => {
  it('should return company ID when pass correct DeleteCompanyByIdDto', async () => {
    const { deleteCompanyByIdDto, sut } = makeSut();

    const result = await sut.execute(deleteCompanyByIdDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(CompanySimpleMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect Description', async () => {
    const { sut, deleteCompanyByIdDto } = makeSut();
    deleteCompanyByIdDto.description = '';
    const result = await sut.execute(deleteCompanyByIdDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { deleteCompanyByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deleteCompanyByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { deleteCompanyByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(deleteCompanyByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotDeleted when a deleted Company in system', async () => {
    const { deleteCompanyByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['deleteCompanyByIdRepository'], 'delete')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteCompanyByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
