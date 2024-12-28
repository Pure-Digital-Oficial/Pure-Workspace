import {
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindPreRegistrationByIdRepository,
  PreRegistartionResponseDto,
  UpdatePreRegistration,
  UpdatePreRegistrationDto,
  UpdatePreRegistrationRepository,
} from '../../../../src';
import { PreRegistartionResponseMock } from '../../../entity';
import { FindPreRegistrationByIdRepositoryMock } from '../../../repository/marketing/pre-registration/find-pre-registration-by-id.mock';
import { UpdatePreRegistrationRepositoryMock } from '../../../repository/marketing/pre-registration/update-pre-registration.mock';

interface SutType {
  sut: UpdatePreRegistration;
  updatePreRegistrationDto: UpdatePreRegistrationDto;
  findPreRegistrationByIdRepository: FindPreRegistrationByIdRepository;
  updatePreRegistrationRepository: UpdatePreRegistrationRepository;
}

const makeSut = (): SutType => {
  const findPreRegistrationByIdRepository =
    new FindPreRegistrationByIdRepositoryMock();
  const updatePreRegistrationRepository =
    new UpdatePreRegistrationRepositoryMock();

  const updatePreRegistrationDto: UpdatePreRegistrationDto = {
    id: PreRegistartionResponseMock.id,
    branchOfTheCompany: 'any',
  };

  const sut = new UpdatePreRegistration(
    findPreRegistrationByIdRepository,
    updatePreRegistrationRepository
  );

  return {
    findPreRegistrationByIdRepository,
    updatePreRegistrationRepository,
    updatePreRegistrationDto,
    sut,
  };
};

describe('UpdatePreRegistration', () => {
  it('should return Pre Registration ID when pass correct updatePreRegistrationDto', async () => {
    const { sut, updatePreRegistrationDto } = makeSut();

    const result = await sut.execute(updatePreRegistrationDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(PreRegistartionResponseMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect ID', async () => {
    const { sut, updatePreRegistrationDto } = makeSut();
    updatePreRegistrationDto.id = '';
    const result = await sut.execute(updatePreRegistrationDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass incorrect brach of the company', async () => {
    const { sut, updatePreRegistrationDto } = makeSut();
    updatePreRegistrationDto.branchOfTheCompany = '';
    const result = await sut.execute(updatePreRegistrationDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a not exist pre-registration in database', async () => {
    const { sut, updatePreRegistrationDto } = makeSut();
    jest
      .spyOn(sut['findPreRegistartionByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PreRegistartionResponseDto);

    const result = await sut.execute(updatePreRegistrationDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when a not exist pre-registration in database', async () => {
    const { sut, updatePreRegistrationDto } = makeSut();
    jest
      .spyOn(sut['updatePreRegistrationRepostiory'], 'update')
      .mockResolvedValueOnce('');

    const result = await sut.execute(updatePreRegistrationDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
