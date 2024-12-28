import { Langue } from '@pure-workspace/domain';

export const InvalidDate = (langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = 'Invalid date';
      break;
    default:
      message = 'Data inválida';
      break;
  }
  return message;
};
