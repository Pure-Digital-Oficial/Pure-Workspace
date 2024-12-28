import {
  CompanyDataResponseDto,
  EditCompanyData,
  EditCompanyDataDto,
  EditCompanyDataRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyDataByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import { CompanyDataMock, userMock } from '../../../entity';
import {
  EditCompanyDataRepositoryMock,
  FindCompanyDataByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: EditCompanyData;
  editCompanyDataDto: EditCompanyDataDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyDataRepository: FindCompanyDataByIdRepository;
  editCompanyDataRepository: EditCompanyDataRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyDataRepository = new FindCompanyDataByIdRepositoryMock();
  const editCompanyDataRepository = new EditCompanyDataRepositoryMock();

  const editCompanyDataDto: EditCompanyDataDto = {
    body: {
      legalNature: CompanyDataMock.legalNature,
      opening: CompanyDataMock.opening,
      phone: CompanyDataMock.phone,
      port: CompanyDataMock.port,
      responsibleEmail: CompanyDataMock.responsibleEmail,
      situation: CompanyDataMock.situation,
    },
    loggedUserId: userMock.userId,
    companyDataId: CompanyDataMock.id,
  };

  const sut = new EditCompanyData(
    findUserByIdRepository,
    findCompanyDataRepository,
    editCompanyDataRepository
  );
  return {
    sut,
    editCompanyDataDto,
    findUserByIdRepository,
    findCompanyDataRepository,
    editCompanyDataRepository,
  };
};

describe('EditCompanyData', () => {
  it('should return Company Data ID when pass correct EditCompanyData', async () => {
    const { editCompanyDataDto, sut } = makeSut();

    const result = await sut.execute(editCompanyDataDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toBe(CompanyDataMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect Legal Nature', async () => {
    const { sut, editCompanyDataDto } = makeSut();
    editCompanyDataDto.body.legalNature = '';
    const result = await sut.execute(editCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Opening', async () => {
    const { sut, editCompanyDataDto } = makeSut();
    editCompanyDataDto.body.opening = '';
    const result = await sut.execute(editCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Phone', async () => {
    const { sut, editCompanyDataDto } = makeSut();
    editCompanyDataDto.body.phone = '';
    const result = await sut.execute(editCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Port', async () => {
    const { sut, editCompanyDataDto } = makeSut();
    editCompanyDataDto.body.port = '';
    const result = await sut.execute(editCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Responsible Email', async () => {
    const { sut, editCompanyDataDto } = makeSut();
    editCompanyDataDto.body.responsibleEmail = '';
    const result = await sut.execute(editCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect Situation', async () => {
    const { sut, editCompanyDataDto } = makeSut();
    editCompanyDataDto.body.situation = '';
    const result = await sut.execute(editCompanyDataDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { editCompanyDataDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editCompanyDataDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { editCompanyDataDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyDataByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyDataResponseDto);
    const result = await sut.execute(editCompanyDataDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when a not edited Company in system', async () => {
    const { editCompanyDataDto, sut } = makeSut();
    jest
      .spyOn(sut['editCompanyDataRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editCompanyDataDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
