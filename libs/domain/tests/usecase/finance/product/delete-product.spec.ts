import {
  DeleteProduct,
  DeleteProductDto,
  DeleteProductRepository,
  EntityNotDeleted,
  EntityNotEmpty,
  EntityNotExists,
  FindProductByIdRepository,
  FindUserByIdRepository,
  ProductResponseDto,
  UserList,
} from '../../../../src';
import { ProductMock, userMock } from '../../../entity';
import {
  DeleteProductRepositoryMock,
  FindProductByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: DeleteProduct;
  deleteProductDto: DeleteProductDto;
  findUserByIdRepository: FindUserByIdRepository;
  findProductByIdRepository: FindProductByIdRepository;
  deleteProductRepository: DeleteProductRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findProductByIdRepository = new FindProductByIdRepositoryMock();
  const deleteProductRepository = new DeleteProductRepositoryMock();

  const deleteProductDto: DeleteProductDto = {
    id: ProductMock.id,
    loggedUserId: userMock.userId,
  };

  const sut = new DeleteProduct(
    findUserByIdRepository,
    findProductByIdRepository,
    deleteProductRepository
  );

  return {
    sut,
    deleteProductDto,
    findUserByIdRepository,
    findProductByIdRepository,
    deleteProductRepository,
  };
};

describe('DeleteProduct', () => {
  it('should return Product ID when pass correct DeleteProductDto', async () => {
    const { deleteProductDto, sut } = makeSut();
    const result = await sut.execute(deleteProductDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ProductMock.id);
  });

  it('should return EntityNotEmpty when a pass empty loggedUserId in deleteProductDto', async () => {
    const { sut, deleteProductDto } = makeSut();
    deleteProductDto.loggedUserId = '';
    const result = await sut.execute(deleteProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty Product ID in deleteProductDto', async () => {
    const { sut, deleteProductDto } = makeSut();
    deleteProductDto.id = '';
    const result = await sut.execute(deleteProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotExists when a return empty user in findUserByIdRepository', async () => {
    const { sut, deleteProductDto } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(deleteProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a return empty user in findUserByIdRepository', async () => {
    const { sut, deleteProductDto } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(deleteProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a return empty product in findProductByIdRepository', async () => {
    const { sut, deleteProductDto } = makeSut();

    jest
      .spyOn(sut['findProductByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ProductResponseDto);

    const result = await sut.execute(deleteProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotDeleted when a return empty product ID in deleteProductRepository', async () => {
    const { sut, deleteProductDto } = makeSut();

    jest
      .spyOn(sut['deleteProductRepository'], 'delete')
      .mockResolvedValueOnce('');

    const result = await sut.execute(deleteProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotDeleted);
  });
});
