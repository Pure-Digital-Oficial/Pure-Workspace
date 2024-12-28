export interface ContentFile {
  id: string;
  size: string;
  format: string;
  uploadDate: Date;
  fileName: string;
  path: string;
  originalName: string;
  created_by: string;
  thumbnail?: string;
}
