export interface PostPrismaDto {
  title: string;
  post_id: string;
  sub_title: string;
  description: string;
  content: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  cover_image: string;
  user_created: {
    name: string;
  };
  user_updated: {
    name: string;
  };
}
