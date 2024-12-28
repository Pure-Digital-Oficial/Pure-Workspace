import { Langue } from '@pure-workspace/domain';

export const NotConfirmedPassword = (langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = 'Password and confirmation do not match';
      break;
    default:
      message = 'A senha e o confirmação não batem';
      break;
  }
  return message;
};
