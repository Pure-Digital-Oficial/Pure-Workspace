import { ProductBodyDto } from './product-body.dto';

export interface CreateProductDto {
  loggedUserId: string;
  body: ProductBodyDto;
}
