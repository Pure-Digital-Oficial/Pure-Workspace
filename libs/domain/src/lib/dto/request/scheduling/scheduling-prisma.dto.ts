export interface SchedulingPrismaDto {
  scheduling_id: string;
  created_at: Date;
  name: string;
  start_time: Date;
  end_time: Date;
  looping: boolean;
  priority: number;
  user: {
    nick_name: string;
  };
}
