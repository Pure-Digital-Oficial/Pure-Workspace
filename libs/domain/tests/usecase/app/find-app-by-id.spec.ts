import {
  App,
  EntityNotExists,
  FindAppById,
  FindAppByIdDto,
  FindAppByIdRepository,
  InsufficientCharacters,
} from '../../../src';
import { appMock } from '../../entity/app/app.mock';
import { FindAppByIdRepositoryMock } from '../../repository/app/find-app-by-id.mock';

interface SutTypes {
  sut: FindAppById;
  findAppByIdDto: FindAppByIdDto;
  findAppByIdRepository: FindAppByIdRepository;
}

const makeSut = (): SutTypes => {
  const findAppByIdRepository = new FindAppByIdRepositoryMock();
  const findAppByIdDto: FindAppByIdDto = {
    id: appMock.id,
  };

  const sut = new FindAppById(findAppByIdRepository);

  return {
    sut,
    findAppByIdDto,
    findAppByIdRepository,
  };
};

describe('FindAppById', () => {
  it('should return app if send correct app id', async () => {
    const { sut, findAppByIdDto } = makeSut();

    const result = await sut.execute(findAppByIdDto);

    expect(result.isLeft()).toBe(false);
    expect(result.isRight()).toBe(true);
    expect(result.value).toBe(appMock);
  });

  it('should return InsufficientCharacters if send incorrect id', async () => {
    const { sut, findAppByIdDto } = makeSut();
    findAppByIdDto.id = '';
    const result = await sut.execute(findAppByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(InsufficientCharacters);
  });

  it('should return EntityNotExists if not exist app in database', async () => {
    const { findAppByIdDto } = makeSut();

    const emptyMock = {} as App;

    const mockEmptyRepository: FindAppByIdRepository = {
      find: jest.fn(async () => emptyMock),
    };

    const sut = new FindAppById(mockEmptyRepository);

    const result = await sut.execute(findAppByIdDto);

    expect(result.isLeft()).toBe(true);
    expect(result.isRight()).toBe(false);
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });
});
