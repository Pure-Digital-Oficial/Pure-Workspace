import { z } from 'zod';
import { EntityMaxLength, EntityMinLength } from '../../messages';

export const CreateDirectoryFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: EntityMinLength({ entity: 'nome', minOrMax: 2 }, 'PT-BR'),
    })
    .max(50, {
      message: EntityMaxLength({ entity: 'nome', minOrMax: 50 }, 'PT-BR'),
    }),
});
