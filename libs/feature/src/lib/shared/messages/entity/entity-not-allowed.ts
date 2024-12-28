import { Langue } from '@pure-workspace/domain';

export const EntityNotAllowed = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `the ${entity} not allowed in the system!`;
      break;
    default:
      message = `Alguns dos ${entity} não são permitidos no sistema!`;
      break;
  }

  return message;
};
