import { PlaylistCategoryResponseDto } from './category';

export interface PlaylistResponseDto {
  id: string;
  name: string;
  category: PlaylistCategoryResponseDto;
  created_at: Date;
  created_by: string;
}
