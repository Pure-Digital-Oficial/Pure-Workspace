import { UploadedFile } from '../../../entity';

export interface RegisterContentFileDto {
  loggedUserId: string;
  directoryId: string;
  companyId: string;
  file: UploadedFile;
  thumbnail?: string;
}
