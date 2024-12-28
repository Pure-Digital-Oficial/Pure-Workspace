import { Langue } from '@pure-workspace/domain';

export const EntityIsInvalid = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${entity} is invalid!`;
      break;
    default:
      message = `O(a) ${entity} é inválido!`;
      break;
  }

  return message;
};
