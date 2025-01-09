import {
  EntityNotEmpty,
  EntityNotExists,
  FindPostByIdRepository,
  FindUserByIdRepository,
  ListMediasPost,
  ListMediasPostDto,
  ListMediasPostRepository,
  PostResponseDto,
  UserList,
} from '../../../../../src';
import {
  ListMediasPostResponseMock,
  PostMock,
  userMock,
} from '../../../../entity';
import {
  FindPostByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListMediasPostRepositoryMock,
} from '../../../../repository';

interface SutTypes {
  sut: ListMediasPost;
  listMediasPostDto: ListMediasPostDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPostByIdRepository: FindPostByIdRepository;
  listMediasPostRepository: ListMediasPostRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPostByIdRepository = new FindPostByIdRepositoryMock();
  const listMediasPostRepository = new ListMediasPostRepositoryMock();

  const listMediasPostDto: ListMediasPostDto = {
    filter: '',
    loggedUserId: userMock.userId,
    postId: PostMock.id,
  };

  const sut = new ListMediasPost(
    findUserByIdRepository,
    findPostByIdRepository,
    listMediasPostRepository
  );

  return {
    sut,
    listMediasPostDto,
    findUserByIdRepository,
    findPostByIdRepository,
    listMediasPostRepository,
  };
};

describe('ListMediasPost', () => {
  it('should return List Medias Post when pass correct user input in listMediasPostDto', async () => {
    const { listMediasPostDto, sut } = makeSut();

    const result = await sut.execute(listMediasPostDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListMediasPostResponseMock);
  });

  it('should return EntityNotEmpty when pass empty user ID in externalAuthDto', async () => {
    const { listMediasPostDto, sut } = makeSut();
    listMediasPostDto.loggedUserId = '';
    const result = await sut.execute(listMediasPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty post ID in externalAuthDto', async () => {
    const { listMediasPostDto, sut } = makeSut();
    listMediasPostDto.postId = '';
    const result = await sut.execute(listMediasPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { listMediasPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Post in system', async () => {
    const { listMediasPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findPostByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PostResponseDto);
    const result = await sut.execute(listMediasPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
