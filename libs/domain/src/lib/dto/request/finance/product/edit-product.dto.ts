import { ProductBodyDto } from './product-body.dto';

export interface EditProductDto {
  id: string;
  loggedUserId: string;
  body: ProductBodyDto;
}
