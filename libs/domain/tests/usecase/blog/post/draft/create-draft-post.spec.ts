import {
  App,
  CreateDraftPost,
  CreateDraftPostRepository,
  CreatePostDto,
  EntityNotComplete,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindAppByIdRepository,
  FindUserByIdRepository,
  PostBodyDto,
  UploadContentFileRepository,
  UploadedFile,
  UserList,
} from '../../../../../src';
import { appMock, FileMock, PostMock, userMock } from '../../../../entity';
import {
  CreatePostRepositoryMock,
  FindAppByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  UploadContentFileRepositoryMock,
} from '../../../../repository';

interface SutTypes {
  sut: CreateDraftPost;
  createPostDto: CreatePostDto;
  findUserByIdRepository: FindUserByIdRepository;
  findAppByIdRepository: FindAppByIdRepository;
  uploadContentFileRepository: UploadContentFileRepository;
  createDrafPostRepository: CreateDraftPostRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const createDrafPostRepository = new CreatePostRepositoryMock();
  const uploadContentFileRepository = new UploadContentFileRepositoryMock();

  const createPostDto: CreatePostDto = {
    appId: appMock.id,
    loggedUserId: userMock.userId,
    body: {
      content: PostMock.content,
      description: PostMock.description,
      subTitle: PostMock.subTitle,
      title: PostMock.title,
      coverImage: FileMock,
    },
  };

  const sut = new CreateDraftPost(
    findUserByIdRepository,
    findAppByIdRepository,
    uploadContentFileRepository,
    createDrafPostRepository
  );

  return {
    sut,
    createPostDto,
    findUserByIdRepository,
    findAppByIdRepository,
    uploadContentFileRepository,
    createDrafPostRepository,
  };
};

describe('CreateDraftPost', () => {
  it('should return post ID when pass correct data in createPostDto', async () => {
    const { createPostDto, sut } = makeSut();

    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(PostMock.id);
  });

  it('should return EntityNotEmpty when pass empty body in createPostDto', async () => {
    const { createPostDto, sut } = makeSut();
    createPostDto.body = {} as PostBodyDto;
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty appId in createPostDto', async () => {
    const { createPostDto, sut } = makeSut();
    createPostDto.appId = '';
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty user ID in createPostDto', async () => {
    const { createPostDto, sut } = makeSut();
    createPostDto.loggedUserId = '';
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty content in createPostDto', async () => {
    const { createPostDto, sut } = makeSut();
    createPostDto.body.content = '';
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in createPostDto', async () => {
    const { createPostDto, sut } = makeSut();
    createPostDto.body.description = '';
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty subTitle in createPostDto', async () => {
    const { createPostDto, sut } = makeSut();
    createPostDto.body.subTitle = '';
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty title in createPostDto', async () => {
    const { createPostDto, sut } = makeSut();
    createPostDto.body.title = '';
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty cover image in createPostDto', async () => {
    const { createPostDto, sut } = makeSut();
    createPostDto.body.coverImage = {} as UploadedFile;
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a return empty app ID in findAppByIdRepository', async () => {
    const { createPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findAppByIdRepository'], 'find')
      .mockResolvedValueOnce({} as App);
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { createPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotComplete when a not uploaded cover image in system', async () => {
    const { createPostDto, sut } = makeSut();
    jest
      .spyOn(sut['uploadContentFileRepository'], 'upload')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotComplete);
  });

  it('should return EntityNotCreated when a not created draft post in system', async () => {
    const { createPostDto, sut } = makeSut();
    jest
      .spyOn(sut['createDraftPostRepository'], 'create')
      .mockResolvedValueOnce('');
    const result = await sut.execute(createPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
