import { z } from 'zod';
import { EntityMaxLength, EntityMinLength } from '../../../messages';

export const PreRegistrationFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: EntityMinLength({ entity: 'nome', minOrMax: 2 }, 'PT-BR'),
    })
    .max(50, {
      message: EntityMaxLength({ entity: 'nome', minOrMax: 50 }, 'PT-BR'),
    }),
  companyName: z
    .string()
    .min(2, {
      message: EntityMinLength(
        { entity: 'nome da empresa', minOrMax: 2 },
        'PT-BR'
      ),
    })
    .max(500, {
      message: EntityMaxLength(
        { entity: 'nome da empresa', minOrMax: 500 },
        'PT-BR'
      ),
    }),
  branchOfTheCompany: z
    .string()
    .min(2, {
      message: EntityMinLength(
        { entity: 'ramo da empresa', minOrMax: 2 },
        'PT-BR'
      ),
    })
    .max(50, {
      message: EntityMaxLength(
        { entity: 'ramo da empresa', minOrMax: 50 },
        'PT-BR'
      ),
    }),
});
