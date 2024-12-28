import { z } from 'zod';
import { EntityMinLength } from '../../messages';

export const EditContentFileSchema = z
  .object({
    newFileName: z.string().min(1, {
      message: EntityMinLength(
        { entity: 'nome do arquivo', minOrMax: 2 },
        'PT-BR'
      ),
    }),
  })
  .required();
