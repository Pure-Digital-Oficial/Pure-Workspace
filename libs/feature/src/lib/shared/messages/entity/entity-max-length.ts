import { ErrorMessage, Langue } from '@pure-workspace/domain';

export const EntityMaxLength = (input: ErrorMessage, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${input.entity} must have a maximum of ${input.minOrMax} characters!`;
      break;
    default:
      message = `A(o) ${input.entity} deve ter no máximo ${input.minOrMax} caracteres!`;
      break;
  }

  return message;
};
