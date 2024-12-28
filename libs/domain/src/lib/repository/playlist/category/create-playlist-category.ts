import { CreatePlaylistCategoryDto } from '../../../dto';

export interface CreatePlaylistCategoryRepository {
  create(input: CreatePlaylistCategoryDto): Promise<string>;
}
