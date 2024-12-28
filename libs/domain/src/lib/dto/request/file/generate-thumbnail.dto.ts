import { Readable } from 'stream';

export interface GenerateThumbnailDto {
  file: Readable;
  key: string;
}
