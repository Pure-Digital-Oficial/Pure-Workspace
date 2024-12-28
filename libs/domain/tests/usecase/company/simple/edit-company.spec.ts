import {
  CompanyResponseDto,
  EditCompany,
  EditCompanyDto,
  EditCompanyRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanySimpleMock, userMock } from '../../../entity';
import {
  EditCompanyRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: EditCompany;
  editCompanyDto: EditCompanyDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  editCompanyRepository: EditCompanyRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const editCompanyRepository = new EditCompanyRepositoryMock();

  const editCompanyDto: EditCompanyDto = {
    body: {
      cnpj: CompanySimpleMock.cnpj,
      fantasyName: CompanySimpleMock.fantasyName,
      socialReason: CompanySimpleMock.socialReason,
    },
    companyId: CompanySimpleMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new EditCompany(
    findUserByIdRepository,
    findCompanyByIdRepository,
    editCompanyRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    editCompanyRepository,
    editCompanyDto,
    sut,
  };
};

describe('EditCompany', () => {
  it('should return company ID when pass correct EditCompanyDto', async () => {
    const { editCompanyDto, sut } = makeSut();

    const result = await sut.execute(editCompanyDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(CompanySimpleMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect CNPJ', async () => {
    const { sut, editCompanyDto } = makeSut();
    editCompanyDto.body.cnpj = '';
    const result = await sut.execute(editCompanyDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Social Reason', async () => {
    const { sut, editCompanyDto } = makeSut();
    editCompanyDto.body.socialReason = '';
    const result = await sut.execute(editCompanyDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { editCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company in system', async () => {
    const { editCompanyDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(editCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when a edited Company in system', async () => {
    const { editCompanyDto, sut } = makeSut();
    jest.spyOn(sut['editCompanyRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editCompanyDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
