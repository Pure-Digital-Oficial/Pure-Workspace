import {
  App,
  ContactUsBodyDto,
  CreateContactUs,
  CreateContactUsDto,
  CreateContactUsRepository,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindAppByIdRepository,
} from '../../../../src';
import { appMock, ContactUsMock } from '../../../entity';
import { FindAppByIdRepositoryMock } from '../../../repository';
import { CreateContactUsRepositoryMock } from '../../../repository/general/contact-us/create-contact-us';

interface SutTypes {
  sut: CreateContactUs;
  createContactUsDto: CreateContactUsDto;
  findAppByIdRepository: FindAppByIdRepository;
  createContactUsRepository: CreateContactUsRepository;
}

const makeSut = (): SutTypes => {
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const createContactUsRepository = new CreateContactUsRepositoryMock();

  const createContactUsDto: CreateContactUsDto = {
    appId: appMock.id,
    body: {
      description: ContactUsMock.description,
      email: ContactUsMock.email,
      name: ContactUsMock.name,
      number: ContactUsMock.number,
    },
  };

  const sut = new CreateContactUs(
    findAppByIdRepository,
    createContactUsRepository
  );

  return {
    sut,
    createContactUsDto,
    findAppByIdRepository,
    createContactUsRepository,
  };
};

describe('CreateContactUs', () => {
  it('should return contact us ID when pass correct data in createContactUsDto', async () => {
    const { createContactUsDto, sut } = makeSut();

    const result = await sut.execute(createContactUsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ContactUsMock.id);
  });

  it('should return EntityNotEmpty when pass empty app ID in createContactUsDto', async () => {
    const { createContactUsDto, sut } = makeSut();
    createContactUsDto.appId = '';
    const result = await sut.execute(createContactUsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty body in createContactUsDto', async () => {
    const { createContactUsDto, sut } = makeSut();
    createContactUsDto.body = {} as ContactUsBodyDto;
    const result = await sut.execute(createContactUsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in createContactUsDto', async () => {
    const { createContactUsDto, sut } = makeSut();
    createContactUsDto.body.description = '';
    const result = await sut.execute(createContactUsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty email in createContactUsDto', async () => {
    const { createContactUsDto, sut } = makeSut();
    createContactUsDto.body.email = '';
    const result = await sut.execute(createContactUsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty name in createContactUsDto', async () => {
    const { createContactUsDto, sut } = makeSut();
    createContactUsDto.body.name = '';
    const result = await sut.execute(createContactUsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty number in createContactUsDto', async () => {
    const { createContactUsDto, sut } = makeSut();
    createContactUsDto.body.number = '';
    const result = await sut.execute(createContactUsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a return empty app ID in findAppByIdRepository', async () => {
    const { createContactUsDto, sut } = makeSut();
    jest
      .spyOn(sut['findAppByIdRepository'], 'find')
      .mockResolvedValueOnce({} as App);
    const result = await sut.execute(createContactUsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when a return empty contact us ID in createContactUsRepository', async () => {
    const { createContactUsDto, sut } = makeSut();
    jest
      .spyOn(sut['createContactUsRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createContactUsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
