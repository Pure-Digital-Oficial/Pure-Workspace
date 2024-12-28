import { Langue } from '@pure-workspace/domain';

export const EntityNotExist = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The value ${entity} was not found!`;
      break;
    default:
      message = `O valor ${entity} não foi encontrado!`;
      break;
  }

  return message;
};
