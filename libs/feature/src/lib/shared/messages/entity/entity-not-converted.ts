import { Langue } from '@pure-workspace/domain';

export const EntityNotConverted = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `the ${entity} cannot be converted`;
      break;
    default:
      message = `A(o) ${entity} não pode ser convertida!`;
      break;
  }

  return message;
};
