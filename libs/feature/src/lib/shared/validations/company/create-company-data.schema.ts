import { z } from 'zod';
import { EntityMaxLength, EntityMinLength } from '../../messages';

export const CreateCompanyDataFormSchema = z.object({
  port: z
    .string()
    .min(2, {
      message: EntityMinLength({ entity: 'Porte', minOrMax: 1 }, 'PT-BR'),
    })
    .max(50, {
      message: EntityMaxLength({ entity: 'Porte', minOrMax: 50 }, 'PT-BR'),
    }),
  opening: z
    .string()
    .min(2, {
      message: EntityMinLength({ entity: 'Abertura', minOrMax: 1 }, 'PT-BR'),
    })
    .max(50, {
      message: EntityMaxLength({ entity: 'Abertura', minOrMax: 50 }, 'PT-BR'),
    }),
  situation: z
    .string()
    .min(2, {
      message: EntityMinLength({ entity: 'Situação', minOrMax: 1 }, 'PT-BR'),
    })
    .max(50, {
      message: EntityMaxLength({ entity: 'Situação', minOrMax: 50 }, 'PT-BR'),
    }),
  legalNature: z
    .string()
    .min(2, {
      message: EntityMinLength(
        { entity: 'Natureza Jurídica', minOrMax: 1 },
        'PT-BR'
      ),
    })
    .max(50, {
      message: EntityMaxLength(
        { entity: 'Natureza Jurídica', minOrMax: 50 },
        'PT-BR'
      ),
    }),
  phone: z
    .string()
    .min(2, {
      message: EntityMinLength({ entity: 'Telefone', minOrMax: 1 }, 'PT-BR'),
    })
    .max(50, {
      message: EntityMaxLength({ entity: 'Telefone', minOrMax: 9 }, 'PT-BR'),
    }),
  responsibleEmail: z.string().email(),
});
