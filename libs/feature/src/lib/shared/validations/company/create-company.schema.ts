import { z } from 'zod';
import {
  EntityIsInvalid,
  EntityMaxLength,
  EntityMinLength,
} from '../../messages';
import { isValidCNPJ } from '../utils';

export const CreateCompanyFormSchema = z.object({
  fantasyName: z.string().optional(),
  socialReason: z
    .string()
    .min(2, {
      message: EntityMinLength(
        { entity: 'Razão Social', minOrMax: 2 },
        'PT-BR'
      ),
    })
    .max(50, {
      message: EntityMaxLength(
        { entity: 'Razão Social', minOrMax: 50 },
        'PT-BR'
      ),
    }),
  cnpj: z.string().refine(isValidCNPJ, {
    message: EntityIsInvalid('CNPJ', 'PT-BR'),
  }),
});
