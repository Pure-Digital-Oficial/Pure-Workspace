import { Langue } from '@pure-workspace/domain';

export const NotPermission = (langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = 'The user does not have permission to perform this action!';
      break;
    default:
      message = 'O usuário não tem esse permissão para fazer essa ação!';
      break;
  }

  return message;
};
