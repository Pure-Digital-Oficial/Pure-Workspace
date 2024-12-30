import { Controller, Delete, Param, Query, UsePipes } from '@nestjs/common';
import {
  deleteProductSchema,
  ErrorMessageResult,
} from '@pure-workspace/domain';
import { DeleteProductService } from './delete-product.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('delete-product')
export class DeleteProductController {
  constructor(private readonly deleteProductService: DeleteProductService) {}

  @Delete(':productId')
  @UsePipes(new ZodValidationPipe(deleteProductSchema))
  async delete(
    @Query('loggedUserId') loggedUserId: string,
    @Param('productId') productId: string
  ) {
    const result = await this.deleteProductService.delete({
      id: productId ?? '',
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { productId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
