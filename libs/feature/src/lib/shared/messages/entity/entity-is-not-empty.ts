import { Langue } from '@pure-workspace/domain';

export const EntityIsNotEmpty = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `the ${entity} is not empty!`;
      break;
    default:
      message = `O(A) ${entity} não está vazio!`;
      break;
  }

  return message;
};
