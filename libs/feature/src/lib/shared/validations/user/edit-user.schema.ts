import { z } from 'zod';
import {
  EntityMaxLength,
  EntityMinLength,
  InferiorDate,
  MinDate,
} from '../../messages';

const eighteenYearsAgo = new Date();
eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);

export const EditUserSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: EntityMinLength({ entity: 'nome', minOrMax: 2 }, 'PT-BR'),
      })
      .max(50, {
        message: EntityMaxLength({ entity: 'nome', minOrMax: 50 }, 'PT-BR'),
      }),
    birthDate: z.coerce
      .date()
      .min(new Date('1900-01-01'), {
        message: MinDate('PT-BR'),
      })
      .max(eighteenYearsAgo, {
        message: InferiorDate('PT-BR'),
      }),
    status: z
      .string()
      .min(2, {
        message: EntityMinLength({ entity: 'status', minOrMax: 2 }, 'PT-BR'),
      })
      .max(50, {
        message: EntityMaxLength({ entity: 'status', minOrMax: 50 }, 'PT-BR'),
      }),
  })
  .required();
