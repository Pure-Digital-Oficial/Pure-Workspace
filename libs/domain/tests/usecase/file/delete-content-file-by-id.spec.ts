import {
  FindUserByIdRepository,
  FindDirectoryByIdRepository,
  EntityNotEmpty,
  EntityNotExists,
  DeleteContentFileById,
  DeleteContentFileByIdDto,
  DeleteContentFileByIdRepository,
  FindContentFileByIdRepository,
  ContentFile,
  DeleteFileByNameRepository,
  UserList,
  Directory,
} from '../../../src';
import { ContentFileMock, DirectoryMock, userMock } from '../../entity';
import {
  DeleteContentFileByIdRepositoryMock,
  DeleteFileByNameRepositoryMock,
  FindContentFileByIdRepositoryMock,
  FindDirectoryByIdRespositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: DeleteContentFileById;
  deleteContentFileByIdDto: DeleteContentFileByIdDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDirectoryByIdRepository: FindDirectoryByIdRepository;
  deleteContentFileByIdRepository: DeleteContentFileByIdRepository;
  findContentFileByIdRepository: FindContentFileByIdRepository;
  deleteFileByNameRepository: DeleteFileByNameRepository;
}

const makeSut = (): SutTypes => {
  const deleteContentFileByIdRepository =
    new DeleteContentFileByIdRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDirectoryByIdRepository = new FindDirectoryByIdRespositoryMock();
  const findContentFileByIdRepository = new FindContentFileByIdRepositoryMock();
  const deleteFileByNameRepository = new DeleteFileByNameRepositoryMock();
  const deleteContentFileByIdDto: DeleteContentFileByIdDto = {
    directoryId: DirectoryMock.id,
    loggedUserId: userMock.userId,
    idToDelete: ContentFileMock.id,
  };

  const sut = new DeleteContentFileById(
    deleteContentFileByIdRepository,
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository,
    deleteFileByNameRepository
  );

  return {
    deleteContentFileByIdRepository,
    deleteFileByNameRepository,
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository,
    deleteContentFileByIdDto,
    sut,
  };
};

describe('DeleteContentFileById', () => {
  it('should return void when a correct content file is deleted', async () => {
    const { deleteContentFileByIdDto, sut } = makeSut();

    const result = await sut.execute(deleteContentFileByIdDto);
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when a pass incorrect id to delete', async () => {
    const { deleteContentFileByIdDto, sut } = makeSut();
    deleteContentFileByIdDto.idToDelete = '';
    const result = await sut.execute(deleteContentFileByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists if there is no content file created in the database', async () => {
    const { deleteContentFileByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFileByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ContentFile);

    const result = await sut.execute(deleteContentFileByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { deleteContentFileByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deleteContentFileByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Directory ID', async () => {
    const { deleteContentFileByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findDirectoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Directory);
    const result = await sut.execute(deleteContentFileByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return when a pass incorrect Directory ID', async () => {
    const { deleteContentFileByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFileByIdRepository'], 'find')
      .mockResolvedValueOnce({
        thumbnail: 'aa',
      } as ContentFile);
    const result = await sut.execute(deleteContentFileByIdDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });
});
