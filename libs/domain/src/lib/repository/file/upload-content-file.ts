import { UploadContentFileDto } from '../../dto';

export interface UploadContentFileRepository {
  upload(input: UploadContentFileDto): Promise<string>;
}
