import { z } from 'zod';
import {
  EntityMaxLength,
  EntityMinLength,
  EntityIsInvalid,
  NotConfirmedPassword,
} from '../../messages';

export const CreateAuthSchema = z
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
    password: z
      .string()
      .min(2, {
        message: EntityMinLength({ entity: 'password', minOrMax: 2 }, 'PT-BR'),
      })
      .max(50, {
        message: EntityMaxLength({ entity: 'password', minOrMax: 50 }, 'PT-BR'),
      }),
    confirmPassword: z
      .string()
      .min(2, {
        message: EntityMinLength(
          { entity: 'confirmPassword', minOrMax: 2 },
          'PT-BR'
        ),
      })
      .max(50, {
        message: EntityMaxLength(
          { entity: 'confirmPassword', minOrMax: 50 },
          'PT-BR'
        ),
      }),
  })
  .required()
  .refine((data) => data.password === data.confirmPassword, {
    message: NotConfirmedPassword('PT-BR'),
    path: ['confirmPassword'],
  });
