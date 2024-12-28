export interface DirectoryPrismaDto {
  name: string;
  user: {
    nick_name: string;
  };
  created_at: Date;
  directory_id: string;
}
