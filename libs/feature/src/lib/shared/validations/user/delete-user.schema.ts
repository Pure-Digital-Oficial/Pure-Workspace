import { z } from 'zod';
import { EntityMaxLength, EntityMinLength } from '../../messages';

export const DeleteUserSchema = z
  .object({
    description: z
      .string()
      .min(2, {
        message: EntityMinLength({ entity: 'descrição', minOrMax: 2 }, 'PT-BR'),
      })
      .max(1000, {
        message: EntityMaxLength(
          { entity: 'descrição', minOrMax: 50 },
          'PT-BR'
        ),
      }),
  })
  .required();
