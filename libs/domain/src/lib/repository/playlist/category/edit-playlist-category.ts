import { EditPlaylistCategoryDto } from '../../../dto/request/playlist/category/edit-playlist-category.dto';

export interface EditPlaylistCategoryRepository {
  edit(input: EditPlaylistCategoryDto): Promise<void>;
}
