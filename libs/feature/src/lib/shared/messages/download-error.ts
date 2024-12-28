import { Langue } from '@pure-workspace/domain';

export const DownloadError = (langue: Langue) => {
  let message: string;

  switch (langue) {
    case 'EN':
      message = 'There was a problem with the Download File';
      break;
    default:
      message = 'Houve um problema no Download do arquivo';
      break;
  }

  return message;
};
