export interface MediaPostPrismaDto {
  media_id: string;
  name: string;
  url: string;
  content: string;
  thumbnail: string;
  created_at: Date;
  updated_at: Date;
  user_created: {
    name: string;
  };
  user_updated: {
    name: string;
  };
}
