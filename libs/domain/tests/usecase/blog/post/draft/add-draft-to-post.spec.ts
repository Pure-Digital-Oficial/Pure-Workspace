import {
  AddDraftToPost,
  AddDraftToPostDto,
  AddDraftToPostRepository,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindPostByIdRepository,
  FindUserByIdRepository,
  PostResponseDto,
  UserList,
} from '../../../../../src';
import { PostMock, userMock } from '../../../../entity';
import {
  AddDraftToPostRepositoryMock,
  FindPostByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../../repository';

interface SutTypes {
  sut: AddDraftToPost;
  addDraftToPostDto: AddDraftToPostDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPostByIdRepository: FindPostByIdRepository;
  addDraftToPostRepository: AddDraftToPostRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPostByIdRepository = new FindPostByIdRepositoryMock();
  const addDraftToPostRepository = new AddDraftToPostRepositoryMock();

  const addDraftToPostDto: AddDraftToPostDto = {
    id: PostMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new AddDraftToPost(
    findUserByIdRepository,
    findPostByIdRepository,
    addDraftToPostRepository
  );

  return {
    sut,
    addDraftToPostDto,
    findUserByIdRepository,
    findPostByIdRepository,
    addDraftToPostRepository,
  };
};

describe('AddDraftToPost', () => {
  it('should return Post ID when pass correct object in addDraftToPostDto', async () => {
    const { addDraftToPostDto, sut } = makeSut();

    const result = await sut.execute(addDraftToPostDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(PostMock.id);
  });

  it('should return EntityNotEmpty when pass empty user ID in addDraftToPostDto', async () => {
    const { addDraftToPostDto, sut } = makeSut();
    addDraftToPostDto.loggedUserId = '';
    const result = await sut.execute(addDraftToPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty post ID in addDraftToPostDto', async () => {
    const { addDraftToPostDto, sut } = makeSut();
    addDraftToPostDto.id = '';
    const result = await sut.execute(addDraftToPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { addDraftToPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(addDraftToPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Post in system', async () => {
    const { addDraftToPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findPostByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PostResponseDto);
    const result = await sut.execute(addDraftToPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotCreated when a not add draft Post to post in system', async () => {
    const { addDraftToPostDto, sut } = makeSut();
    jest
      .spyOn(sut['addDraftToPostRepository'], 'add')
      .mockResolvedValueOnce('');
    const result = await sut.execute(addDraftToPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });
});
