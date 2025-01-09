import { MediaPostResponseDto } from './media-post-response.dto';

export interface ListMediasPostResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  medias: MediaPostResponseDto[];
}
