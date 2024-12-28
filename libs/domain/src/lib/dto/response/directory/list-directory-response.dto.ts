import { Directory } from '../../../entity';

export interface ListDirectoryResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  directories: Directory[];
}
