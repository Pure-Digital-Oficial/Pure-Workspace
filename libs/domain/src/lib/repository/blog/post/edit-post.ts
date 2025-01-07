import { EditPostDto } from '../../../dto/request/blog/post/edit-post.dto';

export interface EditPostRepository {
  edit(input: EditPostDto): Promise<string>;
}
