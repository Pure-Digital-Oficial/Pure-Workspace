import {
  EditMediaPost,
  EditMediaPostDto,
  EditMediaPostRepository,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindMediaPostByIdRepository,
  FindUserByIdRepository,
  MediaPostResponseDto,
  UserList,
} from '../../../../../src';
import { MediaPostMock, userMock } from '../../../../entity';
import {
  EditMediaPostRepositoryMock,
  FindMediaPostByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../../repository';

interface SutTypes {
  sut: EditMediaPost;
  editMediaPostDto: EditMediaPostDto;
  findUserByIdRepository: FindUserByIdRepository;
  findMediaPostByIdRepository: FindMediaPostByIdRepository;
  editMediaPostRepository: EditMediaPostRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findMediaPostByIdRepository = new FindMediaPostByIdRepositoryMock();
  const editMediaPostRepository = new EditMediaPostRepositoryMock();

  const editMediaPostDto: EditMediaPostDto = {
    loggedUserId: userMock.userId,
    mediaId: MediaPostMock.id,
    name: MediaPostMock.name,
  };

  const sut = new EditMediaPost(
    findUserByIdRepository,
    findMediaPostByIdRepository,
    editMediaPostRepository
  );

  return {
    sut,
    editMediaPostDto,
    findUserByIdRepository,
    editMediaPostRepository,
    findMediaPostByIdRepository,
  };
};

describe('EditMediaPost', () => {
  it('should return Media Post ID when pass correct object in editMediaPostDto', async () => {
    const { editMediaPostDto, sut } = makeSut();

    const result = await sut.execute(editMediaPostDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(MediaPostMock.id);
  });

  it('should return EntityNotEmpty when pass empty user ID in deletePostDto', async () => {
    const { editMediaPostDto, sut } = makeSut();
    editMediaPostDto.loggedUserId = '';
    const result = await sut.execute(editMediaPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty Media Post ID in deletePostDto', async () => {
    const { editMediaPostDto, sut } = makeSut();
    editMediaPostDto.mediaId = '';
    const result = await sut.execute(editMediaPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty Name in deletePostDto', async () => {
    const { editMediaPostDto, sut } = makeSut();
    editMediaPostDto.name = '';
    const result = await sut.execute(editMediaPostDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { editMediaPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(editMediaPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist Media Post in system', async () => {
    const { editMediaPostDto, sut } = makeSut();
    jest
      .spyOn(sut['findMediaPostByIdRepository'], 'find')
      .mockResolvedValueOnce({} as MediaPostResponseDto);
    const result = await sut.execute(editMediaPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when a not edited Media Post in system', async () => {
    const { editMediaPostDto, sut } = makeSut();
    jest
      .spyOn(sut['editMediaPostRepository'], 'edit')
      .mockResolvedValueOnce('');
    const result = await sut.execute(editMediaPostDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
