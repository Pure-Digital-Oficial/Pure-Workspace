import {
  ConsultZipcode,
  ConsultZipcodeDto,
  ConsultZipcodeRepository,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotFound,
  FindUserByIdRepository,
  SimpleAddressResponseDto,
  UserList,
} from '../../../src';
import { SimpleAddressMock, userMock } from '../../entity';
import {
  ConsultZipcodeRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: ConsultZipcode;
  consultZipcodeDto: ConsultZipcodeDto;
  findUserByIdRepository: FindUserByIdRepository;
  consultZipcodeRepository: ConsultZipcodeRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const consultZipcodeRepository = new ConsultZipcodeRepositoryMock();

  const consultZipcodeDto: ConsultZipcodeDto = {
    loggedUserId: userMock.userId,
    zipcode: SimpleAddressMock.zipcode,
  };

  const sut = new ConsultZipcode(
    findUserByIdRepository,
    consultZipcodeRepository
  );

  return {
    findUserByIdRepository,
    consultZipcodeRepository,
    consultZipcodeDto,
    sut,
  };
};

describe('ConsultZipcode', () => {
  it('should return simple address wen pass correct ConsultZipcodeDto', async () => {
    const { consultZipcodeDto, sut } = makeSut();

    const result = await sut.execute(consultZipcodeDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(SimpleAddressMock);
  });

  it('should return EntityNotEmpty when pass incorrect Zipcode', async () => {
    const { sut, consultZipcodeDto } = makeSut();
    consultZipcodeDto.zipcode = '';
    const result = await sut.execute(consultZipcodeDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { consultZipcodeDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(consultZipcodeDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotFound when a exist zipcode in system', async () => {
    const { consultZipcodeDto, sut } = makeSut();
    jest
      .spyOn(sut['consultZipcodeRepository'], 'consult')
      .mockResolvedValueOnce({} as SimpleAddressResponseDto);
    const result = await sut.execute(consultZipcodeDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotFound);
  });
});
