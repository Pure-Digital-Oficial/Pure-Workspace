import {
  CreateContentFileDto,
  CreateContentFile,
  FindUserByIdRepository,
  CreateContentFileRepository,
  FindDirectoryByIdRepository,
  EntityNotEmpty,
  EntityNotCreated,
  FileNotAllowed,
  UserList,
  EntityNotExists,
  Directory,
  UploadContentFileRepository,
  EntityNotLoaded,
  GenerateThumbnailRepository,
  EntityNotConverted,
  FindCompanyByIdRepository,
  CompanyResponseDto,
} from '../../../src';
import {
  CompanySimpleMock,
  ContentFileMock,
  DirectoryMock,
  FileMock,
  userMock,
} from '../../entity';
import {
  CreateContentFileRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindDirectoryByIdRespositoryMock,
  FindUserByIdRepositoryMock,
  GenerateThumbnailRepositoryMock,
  UploadContentFileRepositoryMock,
} from '../../repository';

interface SutTypes {
  sut: CreateContentFile;
  CreateContentFileDto: CreateContentFileDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  findDirectoryByIdRepository: FindDirectoryByIdRepository;
  CreateContentFileRepository: CreateContentFileRepository;
  generateThumbnailRepository: GenerateThumbnailRepository;
  uploadContentFileRepository: UploadContentFileRepository;
}

const makeSut = (): SutTypes => {
  const CreateContentFileRepository = new CreateContentFileRepositoryMock();
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const findDirectoryByIdRepository = new FindDirectoryByIdRespositoryMock();
  const generateThumbnailRepository = new GenerateThumbnailRepositoryMock();
  const uploadContentFileRepository = new UploadContentFileRepositoryMock();
  const CreateContentFileDto: CreateContentFileDto = {
    directoryId: DirectoryMock.id,
    loggedUserId: userMock.userId,
    companyId: CompanySimpleMock.id,
    file: [FileMock],
  };

  const sut = new CreateContentFile(
    CreateContentFileRepository,
    findUserByIdRepository,
    findCompanyByIdRepository,
    findDirectoryByIdRepository,
    generateThumbnailRepository,
    uploadContentFileRepository
  );

  return {
    CreateContentFileRepository,
    findUserByIdRepository,
    findCompanyByIdRepository,
    findDirectoryByIdRepository,
    generateThumbnailRepository,
    uploadContentFileRepository,
    CreateContentFileDto,
    sut,
  };
};

describe('CreateContentFile', () => {
  it('should return void when a correct content video is created', async () => {
    const { CreateContentFileDto, sut } = makeSut();

    const result = await sut.execute(CreateContentFileDto);
    const resultResponse = [ContentFileMock.id];
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(resultResponse);
  });

  it('should return EntityNotLoaded when not loaded content file in cloud', async () => {
    const { CreateContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['uploadContentFileRepository'], 'upload')
      .mockResolvedValueOnce('');
    const result = await sut.execute(CreateContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotLoaded);
  });

  it('should return EntityNotEmpty when a pass incorrect file', async () => {
    const { CreateContentFileDto, sut } = makeSut();
    CreateContentFileDto.file = [];
    const result = await sut.execute(CreateContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotCreated if there is no content video created in the database', async () => {
    const { sut, CreateContentFileDto } = makeSut();
    jest
      .spyOn(sut['createContentFileRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(CreateContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return FileNotAllowed when a pass incorrect file', async () => {
    const { CreateContentFileDto, sut } = makeSut();
    CreateContentFileDto.file[0].mimetype = '';
    const result = await sut.execute(CreateContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(FileNotAllowed);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { CreateContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(CreateContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Directory ID', async () => {
    const { CreateContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['findDirectoryByIdRepository'], 'find')
      .mockResolvedValueOnce({} as Directory);
    const result = await sut.execute(CreateContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotConverted when not converted content file in system', async () => {
    const { CreateContentFileDto, sut } = makeSut();

    CreateContentFileDto.file[0].mimetype = 'video/mp4';
    CreateContentFileDto.file[0].buffer = Buffer.from('valid buffer content');

    const result = await sut.execute(CreateContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotConverted);
  });

  it('should return EntityNotLoaded when not uploaded content file in system', async () => {
    const { CreateContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['generateThumbnailRepository'], 'generate')
      .mockResolvedValueOnce(Buffer.from('files'));
    jest
      .spyOn(sut['uploadContentFileRepository'], 'upload')
      .mockResolvedValueOnce('');

    CreateContentFileDto.file[0].mimetype = 'video/mp4';
    CreateContentFileDto.file[0].buffer = Buffer.from('valid buffer content');

    const result = await sut.execute(CreateContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotLoaded);
  });

  it('should return EntityNotExists when a no exist company in system', async () => {
    const { CreateContentFileDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(CreateContentFileDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
