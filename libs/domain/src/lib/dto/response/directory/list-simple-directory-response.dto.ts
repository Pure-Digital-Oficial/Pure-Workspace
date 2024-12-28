import { ListDirectoryNameResponseDto } from './list-directory-name-response.dto';

export interface ListSimpleDirectoryResponseDto {
  total: number;
  filteredTotal: number;
  totalPages: number;
  directories: ListDirectoryNameResponseDto[];
}
