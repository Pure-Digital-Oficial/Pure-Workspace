import { PlaylistBodyDto } from './playlist-body.dto';

export interface EditPlaylistDto {
  id: string;
  loggedUserId: string;
  body: PlaylistBodyDto;
}
