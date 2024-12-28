export interface DeletePlaylistCategoryRepository {
  delete(id: string): Promise<void>;
}
