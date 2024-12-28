import { GenerateThumbnailDto } from '../../dto';

export interface GenerateThumbnailRepository {
  generate(file: GenerateThumbnailDto): Promise<Buffer>;
}
