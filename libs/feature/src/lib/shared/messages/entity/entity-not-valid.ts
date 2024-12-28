import { Langue } from '@pure-workspace/domain';

export const EntityNotValid = (input: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${input} not valid`;
      break;
    default:
      message = `O(a) ${input} não é valida(o)!`;
      break;
  }

  return message;
};
