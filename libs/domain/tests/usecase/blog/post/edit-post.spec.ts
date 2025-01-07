import {
  EditPost,
  EditPostDto,
  EditPostRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindPostByIdRepository,
  FindUserByIdRepository,
  PostResponseDto,
  UserList,
} from '../../../../src';
import { PostMock, userMock } from '../../../entity';
import {
  EditPostRepositoryMock,
  FindPostByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: EditPost;
  editPostDto: EditPostDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPostByIdRepository: FindPostByIdRepository;
  editPostRepostory: EditPostRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPostByIdRepository = new FindPostByIdRepositoryMock();
  const editPostRepostory = new EditPostRepositoryMock();

  const editPostDto: EditPostDto = {
    id: PostMock.id,
    loggedUserId: userMock.userId,
    body: {
      content: PostMock.content,
      description: PostMock.description,
      subTitle: PostMock.subTitle,
      title: PostMock.title,
    },
  };

  const sut = new EditPost(
    findUserByIdRepository,
    findPostByIdRepository,
    editPostRepostory
  );

  return {
    sut,
    editPostDto,
    findUserByIdRepository,
    findPostByIdRepository,
    editPostRepostory,
  };
};

describe('EditPost', () => {
  it('should return Post ID when pass correct data in editPostDto', async () => {
    const { editPostDto, sut } = makeSut();

    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(PostMock.id);
  });

  it('should return EntityNotEmpty when pass empty user ID in editPostDto', async () => {
    const { editPostDto, sut } = makeSut();
    editPostDto.loggedUserId = '';
    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty post ID in editPostDto', async () => {
    const { editPostDto, sut } = makeSut();
    editPostDto.id = '';
    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty content in externalAuthDto', async () => {
    const { editPostDto, sut } = makeSut();
    editPostDto.body.content = '';
    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty description in externalAuthDto', async () => {
    const { editPostDto, sut } = makeSut();
    editPostDto.body.description = '';
    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty subTitle in externalAuthDto', async () => {
    const { editPostDto, sut } = makeSut();
    editPostDto.body.subTitle = '';
    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty title in externalAuthDto', async () => {
    const { editPostDto, sut } = makeSut();
    editPostDto.body.title = '';
    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { editPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Post in system', async () => {
    const { editPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findPostByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PostResponseDto);
    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when a not edited Post in system', async () => {
    const { editPostDto, sut } = makeSut();
    jest.spyOn(sut['editPostRepository'], 'edit').mockResolvedValueOnce('');
    const result = await sut.execute(editPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
