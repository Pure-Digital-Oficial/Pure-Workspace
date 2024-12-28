import { Langue } from '@pure-workspace/domain';

export const EntityAlreadyExists = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The ${entity} alread exist in system!`;
      break;
    default:
      message = `A(O) ${entity} já existe no sistema!`;
      break;
  }

  return message;
};
