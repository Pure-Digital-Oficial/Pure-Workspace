import { Body, Controller, Param, Put, Query, UsePipes } from '@nestjs/common';
import {
  editProductSchema,
  ErrorMessageResult,
  ProductBodyDto,
} from '@pure-workspace/domain';
import { EditProductService } from './edit-product.service';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('edit-product')
export class EditProductController {
  constructor(private readonly editProductService: EditProductService) {}

  @Put(':productId')
  @UsePipes(new ZodValidationPipe(editProductSchema))
  async edit(
    @Query('loggedUserId') loggedUserId: string,
    @Param('productId') productId: string,
    @Body() body: ProductBodyDto
  ) {
    const result = await this.editProductService.edit({
      id: productId ?? '',
      body: body ?? ({} as ProductBodyDto),
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { productId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
