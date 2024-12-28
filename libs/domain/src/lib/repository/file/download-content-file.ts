export interface DownloadContentFileRepository {
  download(name: string): Promise<string>;
}
