import {
  ContentFile,
  Directory,
  DownloadContentFile,
  DownloadContentFileDto,
  DownloadContentFileRepository,
  EntityNotEmpty,
  EntityNotExists,
  FindContentFileByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { ContentFileMock, DirectoryMock, userMock } from '../../entity';
import {
  DownloadContentFileRepositoryMock,
  FindContentFileByIdRepositoryMock,
  FindDirectoryByIdRespositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: DownloadContentFile;
  downloadContentFileDto: DownloadContentFileDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDirectoryByIdRepository: FindDirectoryByIdRepository;
  findContentFileByIdRepository: FindContentFileByIdRepository;
  downloadContentFileRepository: DownloadContentFileRepository;
}

const makeSut = (): SutTypes => {
  const downloadContentFileRepository = new DownloadContentFileRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDirectoryByIdRepository = new FindDirectoryByIdRespositoryMock();
  const findContentFileByIdRepository = new FindContentFileByIdRepositoryMock();
  const downloadContentFileDto: DownloadContentFileDto = {
    directoryId: DirectoryMock.id,
    loggedUserId: userMock.userId,
    idToDownload: ContentFileMock.id,
  };

  const sut = new DownloadContentFile(
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository,
    downloadContentFileRepository
  );

  return {
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository,
    downloadContentFileRepository,
    downloadContentFileDto,
    sut,
  };
};

describe('DownloadContentFile', () => {
  it('should return void when a correct content file is download', async () => {
    const { downloadContentFileDto, sut } = makeSut();

    const result = await sut.execute(downloadContentFileDto);
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual({
      url: 'any_url',
      fileName: ContentFileMock.fileName,
    });
  });

  it('should return EntityNotEmpty when a pass incorrect id to delete', async () => {
    const { downloadContentFileDto, sut } = makeSut();
    downloadContentFileDto.idToDownload = '';
    const result = await sut.execute(downloadContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists if there is no content file created in the database', async () => {
    const { downloadContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFileByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ContentFile);

    const result = await sut.execute(downloadContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists if there is no generate url for download file', async () => {
    const { downloadContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['downloadContentFileRepository'], 'download')
      .mockResolvedValueOnce('');

    const result = await sut.execute(downloadContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { downloadContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(downloadContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Directory ID', async () => {
    const { downloadContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['findDirectoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Directory);
    const result = await sut.execute(downloadContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
