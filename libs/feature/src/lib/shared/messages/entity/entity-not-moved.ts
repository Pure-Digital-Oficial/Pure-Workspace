import { Langue } from '@pure-workspace/domain';

export const EntityNotMoved = (input: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${input} not moved in the system`;
      break;
    default:
      message = `O(a) ${input} não foi Movido!`;
      break;
  }

  return message;
};
