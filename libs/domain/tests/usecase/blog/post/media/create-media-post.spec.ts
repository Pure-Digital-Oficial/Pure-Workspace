import {
  CreateMediaPostRepository,
  CreateMediasPost,
  CreateMediasPostDto,
  EntityNotConverted,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  EntityNotLoaded,
  FileNotAllowed,
  FindPostByIdRepository,
  FindUserByIdRepository,
  GenerateThumbnailRepository,
  PostResponseDto,
  UploadContentFileRepository,
  UserList,
} from '../../../../../src';
import {
  FileMock,
  MediaPostMock,
  PostMock,
  userMock,
} from '../../../../entity';
import {
  CreateMediaPostRepositoryMock,
  FindPostByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  GenerateThumbnailRepositoryMock,
  UploadContentFileRepositoryMock,
} from '../../../../repository';

interface SutTypes {
  sut: CreateMediasPost;
  createMediasPostDto: CreateMediasPostDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPostByIdRepository: FindPostByIdRepository;
  generateThumbnailRepository: GenerateThumbnailRepository;
  uploadContentFileRepository: UploadContentFileRepository;
  createMediaPostRepository: CreateMediaPostRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPostByIdRepository = new FindPostByIdRepositoryMock();
  const generateThumbnailRepository = new GenerateThumbnailRepositoryMock();
  const uploadContentFileRepository = new UploadContentFileRepositoryMock();
  const createMediaPostRepository = new CreateMediaPostRepositoryMock();

  const createMediasPostDto: CreateMediasPostDto = {
    files: [FileMock],
    loggedUserId: userMock.userId,
    postId: PostMock.id,
  };

  const sut = new CreateMediasPost(
    findUserByIdRepository,
    findPostByIdRepository,
    generateThumbnailRepository,
    uploadContentFileRepository,
    createMediaPostRepository
  );

  return {
    sut,
    createMediasPostDto,
    findUserByIdRepository,
    findPostByIdRepository,
    generateThumbnailRepository,
    uploadContentFileRepository,
    createMediaPostRepository,
  };
};

describe('CreateMediasPost', () => {
  it('should return list IDs when a pass correct createMediasPostDto', async () => {
    const { createMediasPostDto, sut } = makeSut();

    const result = await sut.execute(createMediasPostDto);
    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual([MediaPostMock.id]);
  });
  it('should return EntityNotCreated when a pass not created Media Post', async () => {
    const { createMediasPostDto, sut } = makeSut();
    jest
      .spyOn(sut['createMediaPostRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityNotEmpty when a pass incorrect Post ID in createMediasPostDto', async () => {
    const { createMediasPostDto, sut } = makeSut();
    createMediasPostDto.postId = '';
    const result = await sut.execute(createMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotLoaded when not loaded content file in cloud', async () => {
    const { createMediasPostDto, sut } = makeSut();
    jest
      .spyOn(sut['uploadContentFileRepository'], 'upload')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotLoaded);
  });

  it('should return EntityNotEmpty when a pass incorrect file', async () => {
    const { createMediasPostDto, sut } = makeSut();
    createMediasPostDto.files = [];
    const result = await sut.execute(createMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return FileNotAllowed when a pass incorrect file', async () => {
    const { createMediasPostDto, sut } = makeSut();
    createMediasPostDto.files[0].mimetype = '';
    const result = await sut.execute(createMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(FileNotAllowed);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { createMediasPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(createMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a pass incorrect Post ID', async () => {
    const { createMediasPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findPostByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PostResponseDto);
    const result = await sut.execute(createMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotConverted when not converted content file in system', async () => {
    const { createMediasPostDto, sut } = makeSut();

    createMediasPostDto.files[0].mimetype = 'video/mp4';
    createMediasPostDto.files[0].buffer = Buffer.from('valid buffer content');

    const result = await sut.execute(createMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotConverted);
  });

  it('should return EntityNotLoaded when not uploaded content file in system', async () => {
    const { createMediasPostDto, sut } = makeSut();
    jest
      .spyOn(sut['generateThumbnailRepository'], 'generate')
      .mockResolvedValueOnce(Buffer.from('files'));
    jest
      .spyOn(sut['uploadContentFileRepository'], 'upload')
      .mockResolvedValueOnce('');

    createMediasPostDto.files[0].mimetype = 'video/mp4';
    createMediasPostDto.files[0].buffer = Buffer.from('valid buffer content');

    const result = await sut.execute(createMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotLoaded);
  });
});
