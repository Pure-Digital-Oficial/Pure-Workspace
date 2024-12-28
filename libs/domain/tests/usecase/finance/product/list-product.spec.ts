import {
  EntityNotEmpty,
  FindUserByIdRepository,
  ListProduct,
  ListProductDto,
  ListProductRepository,
} from '../../../../src';
import { ListProductMock, userMock } from '../../../entity';
import {
  FindUserByIdRepositoryMock,
  ListProductRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: ListProduct;
  listProductDto: ListProductDto;
  findUserByIdRepository: FindUserByIdRepository;
  listProductRepository: ListProductRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const listProductRepository = new ListProductRepositoryMock();

  const listProductDto: ListProductDto = {
    loggedUserId: userMock.userId,
    filter: '',
  };

  const sut = new ListProduct(findUserByIdRepository, listProductRepository);

  return {
    sut,
    listProductDto,
    findUserByIdRepository,
    listProductRepository,
  };
};

describe('ListProduct', () => {
  it('should return ListProductResponseDto when pass correct listProductDto', async () => {
    const { listProductDto, sut } = makeSut();
    const result = await sut.execute(listProductDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ListProductMock);
  });

  it('should return EntityNotEmpty when a pass empty loggedUserId in validateTokenDto', async () => {
    const { sut, listProductDto } = makeSut();
    listProductDto.loggedUserId = '';
    const result = await sut.execute(listProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });
});
