import { Langue } from '@pure-workspace/domain';

export const EntityNotEdited = (input: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${input} not edited in the system`;
      break;
    default:
      message = `O(a) ${input} não foi enditado!`;
      break;
  }

  return message;
};
