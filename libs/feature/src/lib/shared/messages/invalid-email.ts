import { Langue } from '@pure-workspace/domain';

export const InvalidEmail = (langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = `The email address is invalid!`;
      break;
    default:
      message = `O endereço de email é inválido!`;
      break;
  }

  return message;
};
