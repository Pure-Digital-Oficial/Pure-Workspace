import {
  App,
  EntityNotEmpty,
  EntityNotExists,
  FindAppByIdRepository,
  FindUserByIdRepository,
  ListPosts,
  ListPostsDto,
  ListPostsRepository,
  UserList,
} from '../../../../src';
import { appMock, ListPostResponseMock, userMock } from '../../../entity';
import {
  FindAppByIdRepositoryMock,
  FindUserByIdRepositoryMock,
  ListPostsRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ListPosts;
  listPostsDto: ListPostsDto;
  findUserByIdRepository: FindUserByIdRepository;
  findAppByIdRepository: FindAppByIdRepository;
  listPostsRepository: ListPostsRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const listPostsRepository = new ListPostsRepositoryMock();

  const listPostsDto: ListPostsDto = {
    appId: appMock.id,
    filter: '',
    loggedUserId: userMock.userId,
  };

  const sut = new ListPosts(
    findUserByIdRepository,
    findAppByIdRepository,
    listPostsRepository
  );

  return {
    sut,
    listPostsDto,
    findUserByIdRepository,
    findAppByIdRepository,
    listPostsRepository,
  };
};

describe('ListPosts', () => {
  it('should return Post response list when pass correct data in listPostsDto', async () => {
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
