import { Langue } from '@pure-workspace/domain';

export const EntityNotFound = (input: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${input} not found in the system`;
      break;
    default:
      message = `O(a) ${input} não foi Encontrado no Sistema!`;
      break;
  }

  return message;
};
