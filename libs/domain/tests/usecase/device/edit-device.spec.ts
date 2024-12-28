import {
  Device,
  EditDevice,
  EditDeviceDto,
  EditDeviceRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindDeviceByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { DeviceMock, userMock } from '../../entity';
import {
  EditDeviceRepositoryMock,
  FindDeviceByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: EditDevice;
  editDeviceDto: EditDeviceDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDeviceByIdRepository: FindDeviceByIdRepository;
  edtiDeviceRepository: EditDeviceRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDeviceByIdRepository = new FindDeviceByIdRepositoryMock();
  const edtiDeviceRepository = new EditDeviceRepositoryMock();

  const editDeviceDto: EditDeviceDto = {
    id: DeviceMock.id,
    loggedUserId: userMock.userId,
    name: DeviceMock.name,
  };

  const sut = new EditDevice(
    findUserByIdRepository,
    findDeviceByIdRepository,
    edtiDeviceRepository
  );

  return {
    sut,
    editDeviceDto,
    findUserByIdRepository,
    findDeviceByIdRepository,
    edtiDeviceRepository,
  };
};

describe('EditDevice', () => {
  it('should return Device ID when pass correct EditDeviceDto', async () => {
    const { editDeviceDto, sut } = makeSut();

    const result = await sut.execute(editDeviceDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toBe(DeviceMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect Device Name', async () => {
    const { editDeviceDto, sut } = makeSut();
    editDeviceDto.name = '';
    const result = await sut.execute(editDeviceDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityAlreadyExists when a exist User in system', async () => {
    const { editDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityAlreadyExists when a exist device in system', async () => {
    const { editDeviceDto, sut } = makeSut();
    jest
      .spyOn(sut['findDeviceByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Device);
    const result = await sut.execute(editDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when not edited device in system', async () => {
    const { editDeviceDto, sut } = makeSut();
    jest.spyOn(sut['editDeviceRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editDeviceDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
