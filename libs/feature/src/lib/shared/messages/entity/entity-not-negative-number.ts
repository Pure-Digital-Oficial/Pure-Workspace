import { Langue } from '@pure-workspace/domain';

export const EntityNotNegativeNumber = (entity: string, langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `the ${entity} cannot be a negative number!`;
      break;
    default:
      message = `A(o) ${entity} não pode ser um numero negativo!`;
      break;
  }

  return message;
};
