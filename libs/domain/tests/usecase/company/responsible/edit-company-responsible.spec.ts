import {
  CompanyResponsibleResponseDto,
  EditCompanyResponsible,
  EditCompanyResponsibleDto,
  EditCompanyResponsibleRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyResponsibleByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanyResponsibleMock, userMock } from '../../../entity';
import {
  EditCompanyResponsibleRespositoryMock,
  FindCompanyResponsibleByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: EditCompanyResponsible;
  editCompanyResponsibleDto: EditCompanyResponsibleDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyResponsibleByIdRepository: FindCompanyResponsibleByIdRepository;
  editCompanyResponsibleRepository: EditCompanyResponsibleRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyResponsibleByIdRepository =
    new FindCompanyResponsibleByIdRepositoryMock();
  const editCompanyResponsibleRepository =
    new EditCompanyResponsibleRespositoryMock();

  const editCompanyResponsibleDto: EditCompanyResponsibleDto = {
    body: {
      email: CompanyResponsibleMock.email,
      birthdate: CompanyResponsibleMock.birthdate,
      name: CompanyResponsibleMock.name,
      phone: CompanyResponsibleMock.phone,
    },
    companyResponsibleId: CompanyResponsibleMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new EditCompanyResponsible(
    findUserByIdRepository,
    findCompanyResponsibleByIdRepository,
    editCompanyResponsibleRepository
  );

  return {
    sut,
    editCompanyResponsibleDto,
    findUserByIdRepository,
    findCompanyResponsibleByIdRepository,
    editCompanyResponsibleRepository,
  };
};

describe('EditCompanyResponsible', () => {
  it('should return Company Responsible ID when pass correct EditCompanyResponsibleDto', async () => {
    const { editCompanyResponsibleDto, sut } = makeSut();

    const result = await sut.execute(editCompanyResponsibleDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toBe(CompanyResponsibleMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect Company Responsible id', async () => {
    const { sut, editCompanyResponsibleDto } = makeSut();
    editCompanyResponsibleDto.companyResponsibleId = '';
    const result = await sut.execute(editCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Name', async () => {
    const { sut, editCompanyResponsibleDto } = makeSut();
    editCompanyResponsibleDto.body.name = '';
    const result = await sut.execute(editCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect BirthDate', async () => {
    const { sut, editCompanyResponsibleDto } = makeSut();
    editCompanyResponsibleDto.body.birthdate = '';
    const result = await sut.execute(editCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Email', async () => {
    const { sut, editCompanyResponsibleDto } = makeSut();
    editCompanyResponsibleDto.body.email = '';
    const result = await sut.execute(editCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Phone', async () => {
    const { sut, editCompanyResponsibleDto } = makeSut();
    editCompanyResponsibleDto.body.phone = '';
    const result = await sut.execute(editCompanyResponsibleDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { editCompanyResponsibleDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editCompanyResponsibleDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Company Responsible in system', async () => {
    const { editCompanyResponsibleDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyResponsibleByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponsibleResponseDto);
    const result = await sut.execute(editCompanyResponsibleDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when a edited Company Responsible in system', async () => {
    const { editCompanyResponsibleDto, sut } = makeSut();
    jest
      .spyOn(sut['editCompanyResponsibleRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editCompanyResponsibleDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
