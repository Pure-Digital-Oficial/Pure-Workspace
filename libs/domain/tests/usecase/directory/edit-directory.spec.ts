import {
  Directory,
  EditDirectory,
  EditDirectoryDto,
  EditDirectoryRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindDirectoryByIdRepository,
  FindDirectoryByNameRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { DirectoryMock, userMock } from '../../entity';
import {
  EditDirectoryRepositoryMock,
  FindDirectoryByIdRespositoryMock,
  FindDirectoryByNameRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: EditDirectory;
  editDirectoryDto: EditDirectoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDirectoryByIdRepository: FindDirectoryByIdRepository;
  editDirectoryRepository: EditDirectoryRepository;
  findDirectoryByNameRepository: FindDirectoryByNameRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDirectoryByIdRepository = new FindDirectoryByIdRespositoryMock();
  const editDirectoryRepository = new EditDirectoryRepositoryMock();
  const findDirectoryByNameRepository = new FindDirectoryByNameRepositoryMock();

  const editDirectoryDto: EditDirectoryDto = {
    id: DirectoryMock.id,
    loggedUserId: userMock.userId,
    newName: DirectoryMock.name,
  };

  const sut = new EditDirectory(
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findDirectoryByNameRepository,
    editDirectoryRepository
  );

  return {
    sut,
    editDirectoryDto,
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findDirectoryByNameRepository,
    editDirectoryRepository,
  };
};

describe('EditDirectory', () => {
  it('should return Directory ID when pass correct EditDirectoryDto', async () => {
    const { editDirectoryDto, sut } = makeSut();

    const result = await sut.execute(editDirectoryDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toBe(DirectoryMock.id);
  });

  it('should return EntityNotEmpty when pass incorrect Directory newName', async () => {
    const { editDirectoryDto, sut } = makeSut();
    editDirectoryDto.newName = '';
    const result = await sut.execute(editDirectoryDto);

    expect(result.isRight()).toBe(false);
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotNotExists when a exist not User in system', async () => {
    const { editDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotNotExists when a exist not Directory in system', async () => {
    const { editDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findDirectoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Directory);
    const result = await sut.execute(editDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('ensure it will return EntityAlreadyExists error if the directory already exists', async () => {
    const {
      sut,
      editDirectoryDto: EditDirectoryDto,
      findDirectoryByNameRepository: FindDirectoryByNameRepository,
    } = makeSut();
    jest
      .spyOn(FindDirectoryByNameRepository, 'find')
      .mockResolvedValueOnce(DirectoryMock);
    const result = await sut.execute(EditDirectoryDto);
    expect(result.isLeft()).toBe(true);
  });

  it('should return EntityNotEdit when a not edit Directory in system', async () => {
    const { editDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['editDirectoryRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
