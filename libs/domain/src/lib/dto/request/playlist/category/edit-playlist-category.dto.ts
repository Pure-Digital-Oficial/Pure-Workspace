import { PlaylistCategoryBodyDto } from './create-playlist-category-body.dto';

export interface EditPlaylistCategoryDto {
  id: string;
  loggedUserId: string;
  body: PlaylistCategoryBodyDto;
}
