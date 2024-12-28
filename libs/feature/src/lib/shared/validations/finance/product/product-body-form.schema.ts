import { z } from 'zod';
import { EntityMaxLength, EntityMinLength } from '../../../messages';

export const ProductFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: EntityMinLength({ entity: 'nome', minOrMax: 2 }, 'PT-BR'),
    })
    .max(50, {
      message: EntityMaxLength({ entity: 'nome', minOrMax: 50 }, 'PT-BR'),
    }),
  description: z
    .string()
    .min(2, {
      message: EntityMinLength({ entity: 'descrição', minOrMax: 2 }, 'PT-BR'),
    })
    .max(50, {
      message: EntityMaxLength({ entity: 'descrição', minOrMax: 350 }, 'PT-BR'),
    }),
  maximumDiscount: z
    .string()
    .min(1, {
      message: EntityMinLength(
        { entity: 'máximo de desconto', minOrMax: 2 },
        'PT-BR'
      ),
    })
    .max(50, {
      message: EntityMaxLength(
        { entity: 'máximo de desconto', minOrMax: 50 },
        'PT-BR'
      ),
    }),
  standardPrice: z
    .string()
    .min(1, {
      message: EntityMinLength({ entity: 'preço', minOrMax: 2 }, 'PT-BR'),
    })
    .max(50, {
      message: EntityMaxLength({ entity: 'preço', minOrMax: 50 }, 'PT-BR'),
    }),
});
