export interface PostPrismaDto {
  title: string;
  post_id: string;
  sub_title: string;
  description: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  user_created: {
    name: string;
  };
  user_updated: {
    name: string;
  };
}
