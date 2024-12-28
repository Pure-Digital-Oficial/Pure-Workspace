import { z } from 'zod';
import { EntityMinLength, EntityMaxLength } from '../../../messages';

export const EditPlaylistCategorySchema = z
  .object({
    id: z.string().min(1, {
      message: EntityMinLength({ entity: 'nome', minOrMax: 1 }, 'PT-BR'),
    }),
    name: z
      .string()
      .min(2, {
        message: EntityMinLength({ entity: 'nome', minOrMax: 2 }, 'PT-BR'),
      })
      .max(50, {
        message: EntityMaxLength({ entity: 'nome', minOrMax: 50 }, 'PT-BR'),
      }),
    description: z.string().min(1, {
      message: EntityMinLength({ entity: 'descrição', minOrMax: 1 }, 'PT-BR'),
    }),
  })
  .required();
