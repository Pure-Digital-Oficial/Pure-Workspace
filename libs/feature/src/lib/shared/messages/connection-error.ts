import { Langue } from '@pure-workspace/domain';

export const ConnectionError = (langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = 'There was a problem with the connection';
      break;
    default:
      message = 'Houve um problema na conexão';
      break;
  }

  return message;
};
