import { BadRequestException } from '@nestjs/common';

export async function ErrorMessageResult(name: string, message: string) {
  throw new BadRequestException({
    error: {
      name,
      message,
    },
  });
}
