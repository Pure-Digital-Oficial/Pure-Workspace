export interface FilePrismaDto {
  user: {
    nick_name: string;
  };
  Content_Files_id: string;
  file_name: string;
  original_name: string;
  path: string;
  size: string;
  thumbnail: string | null;
  format: string;
  upload_date: Date;
}
