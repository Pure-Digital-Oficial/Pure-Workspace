import { CreateDirectoryBodyDto } from './create-directory-body.dto';

export interface CreateDirectoryDto {
  body: CreateDirectoryBodyDto;
  loggedUserId: string;
  companyId: string;
}
