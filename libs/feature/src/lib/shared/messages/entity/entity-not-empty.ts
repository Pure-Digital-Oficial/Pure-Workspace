import { Langue } from '@pure-workspace/domain';

export const EntityNotEmpty = (input: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The must field ${input} cannot be empty!`;
      break;
    default:
      message = `O campo ${input} não pode ser vazio!`;
      break;
  }

  return message;
};
