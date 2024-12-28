import {
  CompanyResponseDto,
  CreatePlaylistCategory,
  CreatePlaylistCategoryDto,
  CreatePlaylistCategoryRepository,
  EntityAlreadyExists,
  EntityNotCreated,
  EntityNotEmpty,
  EntityNotExists,
  FindCompanyByIdRepository,
  FindPlaylistCategoryByNameRepository,
  FindUserByIdRepository,
  UserList,
} from '../../../../src';
import {
  CompanySimpleMock,
  PlaylistCategoryMock,
  userMock,
} from '../../../entity';
import {
  CreatePlaylistCategoryRepositoryMock,
  FindCompanyByIdRepositoryMock,
  FindPlaylistCategoryByNameRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: CreatePlaylistCategory;
  creatPlaylistCategoryDto: CreatePlaylistCategoryDto;
  findUserByIdRepository: FindUserByIdRepository;
  findCompanyByIdRepository: FindCompanyByIdRepository;
  createPlaylistCategoryRepository: CreatePlaylistCategoryRepository;
  findPlaylistCategoryByNameRepository: FindPlaylistCategoryByNameRepository;
}
const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findCompanyByIdRepository = new FindCompanyByIdRepositoryMock();
  const createPlaylistCategoryRepository =
    new CreatePlaylistCategoryRepositoryMock();
  const findPlaylistCategoryByNameRepository =
    new FindPlaylistCategoryByNameRepositoryMock();

  const creatPlaylistCategoryDto: CreatePlaylistCategoryDto = {
    loggedUserId: userMock.userId,
    companyId: CompanySimpleMock.id,
    body: {
      description: PlaylistCategoryMock.description,
      name: PlaylistCategoryMock.name,
    },
  };

  const sut = new CreatePlaylistCategory(
    findUserByIdRepository,
    findCompanyByIdRepository,
    createPlaylistCategoryRepository,
    findPlaylistCategoryByNameRepository
  );

  return {
    findUserByIdRepository,
    findCompanyByIdRepository,
    createPlaylistCategoryRepository,
    findPlaylistCategoryByNameRepository,
    creatPlaylistCategoryDto,
    sut,
  };
};

describe('CreatePlaylistCategory', () => {
  it('should return playlist category id when a correct playlist category created in database', async () => {
    const { sut, creatPlaylistCategoryDto } = makeSut();

    const result = await sut.execute(creatPlaylistCategoryDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toStrictEqual(PlaylistCategoryMock.id);
  });

  it('should return EntityNotEmpty when a pass incorrect name', async () => {
    const { creatPlaylistCategoryDto, sut } = makeSut();
    creatPlaylistCategoryDto.body.name = '';
    const result = await sut.execute(creatPlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass incorrect description', async () => {
    const { creatPlaylistCategoryDto, sut } = makeSut();
    creatPlaylistCategoryDto.body.description = '';
    const result = await sut.execute(creatPlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotCreated if there is no playlist category created in the database', async () => {
    const { creatPlaylistCategoryDto, sut } = makeSut();

    jest
      .spyOn(sut['createPlaylistCategoryRepository'], 'create')
      .mockResolvedValueOnce('');

    const result = await sut.execute(creatPlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityNotCreated);
  });

  it('should return EntityAlreadyExists if there is playlist category created in the database', async () => {
    const { creatPlaylistCategoryDto, sut } = makeSut();

    jest
      .spyOn(sut['findPlaylistCategoryByNameRepository'], 'find')
      .mockResolvedValueOnce(PlaylistCategoryMock);

    const result = await sut.execute(creatPlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(EntityAlreadyExists);
  });

  it('should return EntityNotExists when a pass incorrect Logged User ID', async () => {
    const { creatPlaylistCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);
    const result = await sut.execute(creatPlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a no exist company in system', async () => {
    const { creatPlaylistCategoryDto, sut } = makeSut();
    jest
      .spyOn(sut['findCompanyByIdRepository'], 'find')
      .mockResolvedValueOnce({} as CompanyResponseDto);
    const result = await sut.execute(creatPlaylistCategoryDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
