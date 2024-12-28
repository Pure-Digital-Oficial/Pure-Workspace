import {
  ContentFile,
  DetailsContentFile,
  DetailsContentFileDto,
  Directory,
  EntityNotEmpty,
  EntityNotExists,
  FindContentFileByIdRepository,
  FindDirectoryByIdRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../src';
import { ContentFileMock, DirectoryMock, userMock } from '../../entity';
import {
  FindContentFileByIdRepositoryMock,
  FindDirectoryByIdRespositoryMock,
  FindUserByIdRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: DetailsContentFile;
  detailsContentFileByIdDto: DetailsContentFileDto;
  findUserByIdRepository: FindUserByIdRepository;
  findDirectoryByIdRepository: FindDirectoryByIdRepository;
  findContentFileByIdRepository: FindContentFileByIdRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findDirectoryByIdRepository = new FindDirectoryByIdRespositoryMock();
  const findContentFileByIdRepository = new FindContentFileByIdRepositoryMock();
  const detailsContentFileByIdDto: DetailsContentFileDto = {
    directoryId: DirectoryMock.id,
    loggedUserId: userMock.userId,
    id: ContentFileMock.id,
  };

  const sut = new DetailsContentFile(
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository
  );

  return {
    findUserByIdRepository,
    findDirectoryByIdRepository,
    findContentFileByIdRepository,
    detailsContentFileByIdDto,
    sut,
  };
};

describe('DetailsContentFile', () => {
  it('should return content file when a exist content file in database', async () => {
    const { detailsContentFileByIdDto, sut } = makeSut();

    const result = await sut.execute(detailsContentFileByIdDto);
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(ContentFileMock);
  });

  it('should return EntityNotEmpty when a pass incorrect id to delete', async () => {
    const { detailsContentFileByIdDto, sut } = makeSut();
    detailsContentFileByIdDto.id = '';
    const result = await sut.execute(detailsContentFileByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists if there is no content file created in the database', async () => {
    const { detailsContentFileByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findContentFileByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ContentFile);

    const result = await sut.execute(detailsContentFileByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { detailsContentFileByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(detailsContentFileByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Directory ID', async () => {
    const { detailsContentFileByIdDto, sut } = makeSut();
    jest
      .spyOn(sut['findDirectoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Directory);
    const result = await sut.execute(detailsContentFileByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
