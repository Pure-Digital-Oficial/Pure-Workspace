export interface DevicePrismaDto {
  name: string;
  device_id: string;
  created_at: Date;
  user: {
    nick_name: string;
  };
}
