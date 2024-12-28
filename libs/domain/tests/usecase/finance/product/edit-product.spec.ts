import {
  EditProduct,
  EditProductDto,
  EditProductRepository,
  EntityNotaNumber,
  EntityNotEdit,
  EntityNotEmpty,
  EntityNotExists,
  FindProductByIdRepository,
  FindUserByIdRepository,
  ProductResponseDto,
  UserList,
} from '../../../../src';
import { ProductMock, userMock } from '../../../entity';
import {
  EditProductRepositoryMock,
  FindProductByIdRepositoryMock,
  FindUserByIdRepositoryMock,
} from '../../../repository';

interface SutTypes {
  sut: EditProduct;
  editProductDto: EditProductDto;
  findUserByIdRepository: FindUserByIdRepository;
  findProductByIdRepository: FindProductByIdRepository;
  editProductRepository: EditProductRepository;
}

const makeSut = (): SutTypes => {
  const findUserByIdRepository = new FindUserByIdRepositoryMock();
  const findProductByIdRepository = new FindProductByIdRepositoryMock();
  const editProductRepository = new EditProductRepositoryMock();

  const editProductDto: EditProductDto = {
    id: ProductMock.id,
    loggedUserId: userMock.userId,
    body: {
      name: ProductMock.name,
      description: ProductMock.description,
      maximumDiscount: ProductMock.maximumDiscount,
      standardPrice: ProductMock.standardPrice,
    },
  };

  const sut = new EditProduct(
    findUserByIdRepository,
    findProductByIdRepository,
    editProductRepository
  );

  return {
    sut,
    editProductDto,
    findUserByIdRepository,
    findProductByIdRepository,
    editProductRepository,
  };
};

describe('EditProduct', () => {
  it('should return product ID when pass correct editProductDto', async () => {
    const { editProductDto, sut } = makeSut();

    const result = await sut.execute(editProductDto);

    expect(result.isLeft()).toBeFalsy();
    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(ProductMock.id);
  });

  it('should return EntityNotEmpty when a pass empty loggedUserId in editProductDto', async () => {
    const { sut, editProductDto } = makeSut();
    editProductDto.loggedUserId = '';
    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty product ID in editProductDto', async () => {
    const { sut, editProductDto } = makeSut();
    editProductDto.id = '';
    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty description in editProductDto', async () => {
    const { sut, editProductDto } = makeSut();
    editProductDto.body.description = '';
    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty name in editProductDto', async () => {
    const { sut, editProductDto } = makeSut();
    editProductDto.body.name = '';
    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty maximumDiscount in editProductDto', async () => {
    const { sut, editProductDto } = makeSut();
    editProductDto.body.maximumDiscount = '';
    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotEmpty when a pass empty standardPrice in editProductDto', async () => {
    const { sut, editProductDto } = makeSut();
    editProductDto.body.standardPrice = '';
    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEmpty);
  });

  it('should return EntityNotaNumber when a pass not a number standardPrice in editProductDto', async () => {
    const { sut, editProductDto } = makeSut();
    editProductDto.body.standardPrice = 'any_string';
    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotaNumber);
  });

  it('should return EntityNotaNumber when a pass not a number maximumDiscount in editProductDto', async () => {
    const { sut, editProductDto } = makeSut();
    editProductDto.body.maximumDiscount = 'any_string';
    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotaNumber);
  });

  it('should return EntityNotExists when a return empty user in findUserByIdRepository', async () => {
    const { sut, editProductDto } = makeSut();

    jest
      .spyOn(sut['findUserByIdRepository'], 'find')
      .mockResolvedValueOnce({} as UserList);

    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotExists when a return empty product in findProductByIdRepository', async () => {
    const { sut, editProductDto } = makeSut();

    jest
      .spyOn(sut['findProductByIdRepository'], 'find')
      .mockResolvedValueOnce({} as ProductResponseDto);

    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotExists);
  });

  it('should return EntityNotEdit when a return empty product in editProductRepository', async () => {
    const { sut, editProductDto } = makeSut();

    jest.spyOn(sut['editProductRepository'], 'edit').mockResolvedValueOnce('');

    const result = await sut.execute(editProductDto);

    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(EntityNotEdit);
  });
});
