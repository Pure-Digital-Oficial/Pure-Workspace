/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z, ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schemas: Record<string, z.ZodTypeAny>) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // Handle the case where metadata.data might be undefined
    const key = metadata.data || metadata.type;
    const schema = this.schemas[key];

    if (!schema) {
      return value; // If no schema is found, return the value without validation
    }

    try {
      return schema.parse(value);
    } catch (e) {
      if (e instanceof ZodError) {
        throw new BadRequestException(e.errors);
      }
      throw e;
    }
  }
}
