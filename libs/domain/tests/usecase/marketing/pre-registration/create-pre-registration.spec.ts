import { faker } from '@faker-js/faker';
import {
  CreatePreRegistration,
  CreatePreRegistrationDto,
  CreatePreRegistrationRepository,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindPreRegistrationBySendingIdRepository,
  FindSendingByIdRepository,
  PreRegistartionResponseDto,
  SendingResponseDto,
} from '../../../../src';
import { PreRegistrationMock } from '../../../entity';
import { CreatePreRegistrationRepositoryMock } from '../../../repository/marketing/pre-registration/create-pre-registration.mock';
import { FindPreRegistrationBySendingIdRepositoryMock } from '../../../repository/marketing/pre-registration/find-pre-registration-by-sending-id.mock';
import { FindSendingByIdRepositoryMock } from '../../../repository/marketing/sending/find-sending-by-id';

interface SutTypes {
  sut: CreatePreRegistration;
  createPreRegistrationDto: CreatePreRegistrationDto;
  findSendingByIdRepository: FindSendingByIdRepository;
  findPreRegistrationBySendingIdRepository: FindPreRegistrationBySendingIdRepository;
  createPreRegistrationRepository: CreatePreRegistrationRepository;
}

const makeSut = (): SutTypes => {
  const createPreRegistrationRepository =
    new CreatePreRegistrationRepositoryMock();
  const findSendingByIdRepository = new FindSendingByIdRepositoryMock();
  const findPreRegistrationBySendingIdRepository =
    new FindPreRegistrationBySendingIdRepositoryMock();

  const createPreRegistrationDto: CreatePreRegistrationDto = {
    sendingId: PreRegistrationMock.id,
  };

  const sut = new CreatePreRegistration(
    findSendingByIdRepository,
    findPreRegistrationBySendingIdRepository,
    createPreRegistrationRepository
  );

  return {
    findSendingByIdRepository,
    findPreRegistrationBySendingIdRepository,
    createPreRegistrationRepository,
    createPreRegistrationDto,
    sut,
  };
};

describe('CreatePreRegistration', () => {
  it('should return Created Pre Registration ID when pass correct createPreRegistrationDto', async () => {
    const { createPreRegistrationDto, sut } = makeSut();

    const result = await sut.execute(createPreRegistrationDto);

    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
    expect(result.value).toStrictEqual(PreRegistrationMock.id);
  });

  it('should return EntityNotEmpty when pass empty sendingId', async () => {
    const { createPreRegistrationDto, sut } = makeSut();
    createPreRegistrationDto.sendingId = '';
    const result = await sut.execute(createPreRegistrationDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotCreated when a not created pre-registration in database', async () => {
    const { sut, createPreRegistrationDto } = makeSut();
    jest
      .spyOn(sut['createPreRegistrationRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(createPreRegistrationDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityNotExists when a not exist sending in database', async () => {
    const { sut, createPreRegistrationDto } = makeSut();
    jest
      .spyOn(sut['findSendingByIdRepository'], 'find')
      .mockResolvedValueOnce({} as SendingResponseDto);

    const result = await sut.execute(createPreRegistrationDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a not exist sending in database', async () => {
    const { sut, createPreRegistrationDto } = makeSut();
    const preRegisrationMock: PreRegistartionResponseDto = {
      id: faker.string.uuid(),
      createdAt: new Date(),
      step: 'INITIAL',
    };
    jest
      .spyOn(sut['findPreRegistrationBySendingIdRepository'], 'find')
      .mockResolvedValueOnce(preRegisrationMock);

    const result = await sut.execute(createPreRegistrationDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toStrictEqual(preRegisrationMock.id);
  });
});
