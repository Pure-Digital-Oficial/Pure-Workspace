import { z } from 'zod';
import {
  EntityMaxLength,
  EntityMinLength,
  EntityIsInvalid,
  NotConfirmedPassword,
} from '../../../messages';

export const CreateContactUsFormSchema = z
  .object({
    email: z
      .string()
      .email({
        message: EntityIsInvalid('Email', 'PT-BR'),
      })
      .min(2, {
        message: EntityMinLength({ entity: 'email', minOrMax: 2 }, 'PT-BR'),
      })
      .max(50, {
        message: EntityMaxLength({ entity: 'email', minOrMax: 50 }, 'PT-BR'),
      }),
    description: z
      .string()
      .min(2, {
        message: EntityMinLength({ entity: 'email', minOrMax: 2 }, 'PT-BR'),
      })
      .max(300, {
        message: EntityMaxLength({ entity: 'email', minOrMax: 300 }, 'PT-BR'),
      }),
    name: z
      .string()
      .min(2, {
        message: EntityMinLength({ entity: 'email', minOrMax: 2 }, 'PT-BR'),
      })
      .max(50, {
        message: EntityMaxLength({ entity: 'email', minOrMax: 50 }, 'PT-BR'),
      }),
  })
  .required();
