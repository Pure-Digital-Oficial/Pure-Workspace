import { ContentFile } from '../../../entity';

export interface ListContentFileResponseDto {
  total: number;
  totalPages: number;
  files: ContentFile[];
}
