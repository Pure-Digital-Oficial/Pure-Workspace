import {
  DeleteMediaPost,
  DeleteMediaPostDto,
  DeleteMediaPostRepository,
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  FindMediaPostByIdRepository,
  FindUserByIdRepository,
  MediaPostResponseDto,
  UserList,
} from '../../../../../src';
import { MediaPostMock, userMock } from '../../../../entity';
import {
  DeleteMediaPostRepositoryMock,
  FindMediaPostByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../../repository';

interface SutTypes {
  sut: DeleteMediaPost;
  deleteMediaPostDto: DeleteMediaPostDto;
  findUserByIdRepository: FindUserByIdRepository;
  findMediaPostByIdRepository: FindMediaPostByIdRepository;
  deleteMediaPostRepository: DeleteMediaPostRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findMediaPostByIdRepository = new FindMediaPostByIdRepositoryMock();
  const deleteMediaPostRepository = new DeleteMediaPostRepositoryMock();

  const deleteMediaPostDto: DeleteMediaPostDto = {
    loggedUserId: userMock.userId,
    mediaId: MediaPostMock.id,
  };

  const sut = new DeleteMediaPost(
    findUserByIdRepository,
    findMediaPostByIdRepository,
    deleteMediaPostRepository
  );

  return {
    sut,
    deleteMediaPostDto,
    findUserByIdRepository,
    findMediaPostByIdRepository,
    deleteMediaPostRepository,
  };
};

describe('DeleteMediaPost', () => {
  it('should return Media Post ID when pass correct object in deleteMediaPostDto', async () => {
    const { deleteMediaPostDto, sut } = makeSut();

    const result = await sut.execute(deleteMediaPostDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(MediaPostMock.id);
  });

  it('should return EntityNotEmpty when pass empty user ID in deletePostDto', async () => {
    const { deleteMediaPostDto, sut } = makeSut();
    deleteMediaPostDto.loggedUserId = '';
    const result = await sut.execute(deleteMediaPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty Media Post ID in deletePostDto', async () => {
    const { deleteMediaPostDto, sut } = makeSut();
    deleteMediaPostDto.mediaId = '';
    const result = await sut.execute(deleteMediaPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { deleteMediaPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(deleteMediaPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Media Post in system', async () => {
    const { deleteMediaPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findMediaPostByIdRepository'], 'find')
      .mockResolvedValueOnce({} as MediaPostResponseDto);
    const result = await sut.execute(deleteMediaPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotDeleted when a not delted Media Post in system', async () => {
    const { deleteMediaPostDto, sut } = makeSut();
    jest
      .spyOn(sut['deleteMediaPostRepository'], 'delete')
      .mockResolvedValueOnce('');
    const result = await sut.execute(deleteMediaPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
