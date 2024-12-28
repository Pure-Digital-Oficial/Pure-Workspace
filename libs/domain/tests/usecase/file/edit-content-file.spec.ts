import {
  ContentFile,
  Directory,
  EditContentFile,
  EditContentFileDto,
  EditContentFileRepository,
  EntityNotEmpty,
  EntityNotExists,
  FindContentFileByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { ContentFileMock, DirectoryMock, userMock } from '../../entity';
import {
  EditContentFileRepositoryMock,
  FindContentFileByIdRepositoryMock,
  FindDirectoryByIdRespositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: EditContentFile;
  editContentFileDto: EditContentFileDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDirectoryByIdRepository: FindDirectoryByIdRepository;
  editContentFileRepository: EditContentFileRepository;
  findContentFileByIdRepository: FindContentFileByIdRepository;
}

const makeSut = (): SutTypes => {
  const editContentFileRepository = new EditContentFileRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDirectoryByIdRepository = new FindDirectoryByIdRespositoryMock();
  const findContentFileByIdRepository = new FindContentFileByIdRepositoryMock();
  const editContentFileDto: EditContentFileDto = {
    directoryId: DirectoryMock.id,
    loggedUserId: userMock.userId,
    idToEdit: ContentFileMock.id,
    newFileName: 'any_original_name',
  };

  const sut = new EditContentFile(
    editContentFileRepository,
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository
  );

  return {
    editContentFileRepository,
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository,
    editContentFileDto,
    sut,
  };
};

describe('EditContentFile', () => {
  it('should return void when a correct content file is edited', async () => {
    const { editContentFileDto, sut } = makeSut();

    const result = await sut.execute(editContentFileDto);
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(undefined);
  });

  it('should return EntityNotEmpty when a pass empty file name', async () => {
    const { editContentFileDto, sut } = makeSut();
    editContentFileDto.newFileName = '';
    const result = await sut.execute(editContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { editContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Directory ID', async () => {
    const { editContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['findDirectoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Directory);
    const result = await sut.execute(editContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect File ID', async () => {
    const { editContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFileByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ContentFile);
    const result = await sut.execute(editContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
