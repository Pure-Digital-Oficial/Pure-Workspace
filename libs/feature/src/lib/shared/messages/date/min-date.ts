import { Langue } from '@pure-workspace/domain';

export const MinDate = (langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = 'The date must be greater than 01/01/1900';
      break;
    default:
      message = 'A data deve ser superior à 01/01/1900';
      break;
  }
  return message;
};
