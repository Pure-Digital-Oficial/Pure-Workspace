export interface DeleteFileByNameRepository {
  delete(name: string): Promise<void>;
}
