import {
  DeleteDirectory,
  DeleteDirectoryDto,
  DeleteDirectoryRepository,
  Directory,
  EntityIsNotEmpty,
  EntityNotExists,
  FindContentFilesByDirectoryIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { ContentFileMock, DirectoryMock, userMock } from '../../entity';
import {
  DeleteDirectoryRepositoryMock,
  FindContentFilesByDirectoryIdRepositoryMock,
  FindDirectoryByIdRespositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface sutTypes {
  sut: DeleteDirectory;
  deleteDirectoryDto: DeleteDirectoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDirectoryByIdRepository: FindDirectoryByIdRepository;
  findContentFilesByDirectoryIdRepository: FindContentFilesByDirectoryIdRepository;
  deleteDirectoryRepository: DeleteDirectoryRepository;
}

const makeSut = (): sutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDirectoryByIdRepository = new FindDirectoryByIdRespositoryMock();
  const findContentFilesByDirectoryIdRepository =
    new FindContentFilesByDirectoryIdRepositoryMock();
  const deleteDirectoryRepository = new DeleteDirectoryRepositoryMock();

  const deleteDirectoryDto: DeleteDirectoryDto = {
    id: DirectoryMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new DeleteDirectory(
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFilesByDirectoryIdRepository,
    deleteDirectoryRepository
  );

  return {
    sut,
    deleteDirectoryDto,
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFilesByDirectoryIdRepository,
    deleteDirectoryRepository,
  };
};

describe('DeleteDirectory', () => {
  it('should return void when pass correct DeleteDirectoryDto', async () => {
    const { sut, deleteDirectoryDto } = makeSut();

    const result = await sut.execute(deleteDirectoryDto);

    expect(result.isRight()).toBe(true);
    expect(result.isLeft()).toBe(false);
    expect(result.value).toBe(undefined);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { deleteDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deleteDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist device in system', async () => {
    const { deleteDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findDirectoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Directory);
    const result = await sut.execute(deleteDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityIsNotEmpty when a exist content files in directory', async () => {
    const { deleteDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFilesByDirectoryIdRepository'], 'find')
      .mockResolvedValueOnce([ContentFileMock]);
    const result = await sut.execute(deleteDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityIsNotEmpty);
  });
});
