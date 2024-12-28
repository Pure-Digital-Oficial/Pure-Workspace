import {
  ContentFile,
  Directory,
  EntityNotExists,
  FindContentFileByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
  MoveFileToDirectory,
  MoveFileToDirectoryDto,
  MoveFileToDirectoryRepository,
  UserList,
} from '../../../src';
import { ContentFileMock, DirectoryMock, userMock } from '../../entity';
import {
  FindContentFileByIdRepositoryMock,
  FindDirectoryByIdRespositoryMock,
  FindUserByIdRepositoryMock,
  MoveFileToDirectoryRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: MoveFileToDirectory;
  moveFileToDirectoryDto: MoveFileToDirectoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDirectoryByIdRepository: FindDirectoryByIdRepository;
  findContentFileByIdRepository: FindContentFileByIdRepository;
  moveFileToDirectoryRepository: MoveFileToDirectoryRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDirectoryByIdRepository = new FindDirectoryByIdRespositoryMock();
  const findContentFileByIdRepository = new FindContentFileByIdRepositoryMock();
  const moveFileToDirectoryRepository = new MoveFileToDirectoryRepositoryMock();
  const moveFileToDirectoryDto: MoveFileToDirectoryDto = {
    idToMove: ContentFileMock.id,
    idToMoveDirectory: DirectoryMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new MoveFileToDirectory(
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository,
    moveFileToDirectoryRepository
  );

  return {
    moveFileToDirectoryRepository,
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository,
    moveFileToDirectoryDto,
    sut,
  };
};

describe('MoveFileToDirectory', () => {
  it('should return void when a correct move file to directory', async () => {
    const { moveFileToDirectoryDto, sut } = makeSut();

    const result = await sut.execute(moveFileToDirectoryDto);
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { moveFileToDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(moveFileToDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Directory ID', async () => {
    const { moveFileToDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findDirectoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Directory);
    const result = await sut.execute(moveFileToDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect File ID', async () => {
    const { moveFileToDirectoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFileByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ContentFile);
    const result = await sut.execute(moveFileToDirectoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
