import { Langue } from '@pure-workspace/domain';

export const EntityNotComplete = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `the ${entity} action was not completed in the system!`;
      break;
    default:
      message = `A ação da(o) ${entity} não foir completada no sistema!`;
      break;
  }

  return message;
};
