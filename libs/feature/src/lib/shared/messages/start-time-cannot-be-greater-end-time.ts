import { Langue } from '@pure-workspace/domain';

export const StartTimeCannotBeGreaterEndTime = (langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = 'The start time cannot be greater than the end time';
      break;
    default:
      message =
        'O horário de início não pode ser maior que o horário de término';
      break;
  }

  return message;
};
