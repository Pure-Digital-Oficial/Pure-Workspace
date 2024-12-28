export interface UploadContentFileDto {
  file: {
    buffer: Buffer;
    mimetype: string;
  };
  bucket: string;
  key: string;
}
