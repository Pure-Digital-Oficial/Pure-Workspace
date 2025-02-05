import {
  App,
  EntityNotEmpty,
  EntityNotExists,
  FindAppByIdRepository,
  FindUserByIdRepository,
  ListUserPostsDto,
  ListUserPosts,
  ListUserPostsRepository,
  UserList,
} from '../../../../src';
import { appMock, ListPostResponseMock, userMock } from '../../../entity';
import {
  FindAppByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListUserPostsRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ListUserPosts;
  listPostsDto: ListUserPostsDto;
  findUserByIdRepository: FindUserByIdRepository;
  findAppByIdRepository: FindAppByIdRepository;
  listUserPostsRepository: ListUserPostsRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const listUserPostsRepository = new ListUserPostsRepositoryMock();

  const listPostsDto: ListUserPostsDto = {
    appId: appMock.id,
    filter: '',
    loggedUserId: userMock.userId,
  };

  const sut = new ListUserPosts(
    findUserByIdRepository,
    findAppByIdRepository,
    listUserPostsRepository
  );

  return {
    sut,
    listPostsDto,
    findUserByIdRepository,
    findAppByIdRepository,
    listUserPostsRepository,
  };
};

describe('ListUserPosts', () => {
  it('should return Post response list when pass correct object in listPostsDto', async () => {
    const { listPostsDto, sut } = makeSut();

    const result = await sut.execute(listPostsDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListPostResponseMock);
  });

  it('should return EntityNotEmpty when pass empty appId in externalAuthDto', async () => {
    const { listPostsDto, sut } = makeSut();
    listPostsDto.appId = '';
    const result = await sut.execute(listPostsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when pass empty user ID in externalAuthDto', async () => {
    const { listPostsDto, sut } = makeSut();
    listPostsDto.loggedUserId = '';
    const result = await sut.execute(listPostsDto);

    expect(result.isLeft()).toBeTruthy();
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a return empty app ID in findAppByIdRepository', async () => {
    const { listPostsDto, sut } = makeSut();
    jest
      .spyOn(sut['findAppByIdRepository'], 'find')
      .mockResolvedValueOnce({} as App);
    const result = await sut.execute(listPostsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a exist User in system', async () => {
    const { listPostsDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(listPostsDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
