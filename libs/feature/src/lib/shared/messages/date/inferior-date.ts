import { Langue } from '@pure-workspace/domain';

export const InferiorDate = (langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = 'You must be 18 years old to register';
      break;
    default:
      message = 'Você deve ter 18 anos para se cadastrar';
      break;
  }
  return message;
};
