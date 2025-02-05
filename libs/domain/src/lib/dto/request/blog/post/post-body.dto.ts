import { UploadedFile } from '../../../../entity';

export interface PostBodyDto {
  title: string;
  subTitle: string;
  description: string;
  content: string;
  coverImage: UploadedFile;
}
