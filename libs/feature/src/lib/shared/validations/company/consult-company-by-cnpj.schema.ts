import { z } from 'zod';
import { EntityIsInvalid } from '../../messages';
import { isValidCNPJ } from '../utils';

export const ConsultCompanyByCnpjFormSchema = z.object({
  cnpj: z.string().refine(isValidCNPJ, {
    message: EntityIsInvalid('CNPJ', 'PT-BR'),
  }),
});
