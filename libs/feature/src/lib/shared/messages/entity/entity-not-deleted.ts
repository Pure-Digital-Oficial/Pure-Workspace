import { Langue } from '@pure-workspace/domain';

export const EntityNotDeleted = (input: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${input} not deleted in the system`;
      break;
    default:
      message = `O(a) ${input} não foi deletado!`;
      break;
  }

  return message;
};
