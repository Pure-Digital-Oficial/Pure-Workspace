import { ContentFile } from '../../../entity';

export interface FindFilesByPlaylistResponseDto {
  total: number;
  totalPages: number;
  files: ContentFile[];
}
