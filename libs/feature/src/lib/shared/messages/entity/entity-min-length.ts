import { ErrorMessage, Langue } from '@pure-workspace/domain';

export const EntityMinLength = (input: ErrorMessage, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${input.entity} must have at least ${input.minOrMax} characters!`;
      break;
    default:
      message = `A(o) ${input.entity} deve ter no mínimo ${input.minOrMax} caracteres!`;
      break;
  }

  return message;
};
