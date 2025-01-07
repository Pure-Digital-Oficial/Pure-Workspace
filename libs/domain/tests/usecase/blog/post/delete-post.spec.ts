import {
  DeletePost,
  DeletePostDto,
  DeletePostRepository,
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  FindPostByIdRepository,
  FindUserByIdRepository,
  PostResponseDto,
  UserList,
} from '../../../../src';
import { PostMock, userMock } from '../../../entity';
import {
  FindPostByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  DeletePostRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: DeletePost;
  deletePostDto: DeletePostDto;
  findUserByIdRepository: FindUserByIdRepository;
  findPostByIdRepository: FindPostByIdRepository;
  deletePostRepository: DeletePostRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findPostByIdRepository = new FindPostByIdRepositoryMock();
  const deletePostRepository = new DeletePostRepositoryMock();

  const deletePostDto: DeletePostDto = {
    id: PostMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new DeletePost(
    findUserByIdRepository,
    findPostByIdRepository,
    deletePostRepository
  );

  return {
    sut,
    deletePostDto,
    findUserByIdRepository,
    findPostByIdRepository,
    deletePostRepository,
  };
};

describe('DeletePost', () => {
  it('should return post ID when a deleted post when pass correct deletePostDto', async () => {
    const { deletePostDto, sut } = makeSut();

    const result = await sut.execute(deletePostDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(PostMock.id);
  });

  it('should return EntityNotEmpty when pass empty user ID in deletePostDto', async () => {
    const { deletePostDto, sut } = makeSut();
    deletePostDto.loggedUserId = '';
    const result = await sut.execute(deletePostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty post ID in deletePostDto', async () => {
    const { deletePostDto, sut } = makeSut();
    deletePostDto.id = '';
    const result = await sut.execute(deletePostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { deletePostDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deletePostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Post in system', async () => {
    const { deletePostDto, sut } = makeSut();
    jest
      .spyOn(sut['findPostByIdRepository'], 'find')
      .mockResolvedValueOnce({} as PostResponseDto);
    const result = await sut.execute(deletePostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotDeleted when a not delete Post in system', async () => {
    const { deletePostDto, sut } = makeSut();
    jest.spyOn(sut['deletePostRepository'], 'delete').mockResolvedValueOnce('');
    const result = await sut.execute(deletePostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
