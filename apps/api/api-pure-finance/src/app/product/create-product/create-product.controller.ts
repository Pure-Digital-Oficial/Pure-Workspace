import { Body, Controller, Post, Query, UsePipes } from '@nestjs/common';
import { CreateProductService } from './create-product.service';
import {
  ErrorMessageResult,
  ProductBodyDto,
  createProductSchema,
} from '@pure-workspace/domain';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';

@Controller('create-product')
export class CreateProductController {
  constructor(private readonly createProductService: CreateProductService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createProductSchema))
  async create(
    @Query('loggedUserId') loggedUserId: string,
    @Body() body: ProductBodyDto
  ) {
    const result = await this.createProductService.create({
      body: body ?? ({} as ProductBodyDto),
      loggedUserId: loggedUserId ?? '',
    });

    if (result.isRight()) return { productId: result.value };
    else await ErrorMessageResult(result.value.name, result.value.message);
  }
}
