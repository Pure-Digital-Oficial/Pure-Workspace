import { z } from 'zod';
import { EntityMinLength, EntityIsInvalid } from '../../messages';

export const LoginSchema = z
  .object({
    email: z.string().email({ message: EntityIsInvalid('Email', 'PT-BR') }),
    password: z.string().min(3, {
      message: EntityMinLength({ entity: 'senha', minOrMax: 3 }, 'PT-BR'),
    }),
  })
  .required();
