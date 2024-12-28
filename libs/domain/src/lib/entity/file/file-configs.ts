import { FileWithProgress } from './file-with-progress';

export interface FileConfigs {
  filesToUpload: FileWithProgress[];
  directoryId: string;
  loggedUserId: string;
  companyId: string;
}
