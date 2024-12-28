export interface SchedulesToDevicePrismaDto {
  scheduling: {
    scheduling_id: string;
    created_at: Date;
    name: string;
    user: {
      nick_name: string;
    };
    start_time: Date;
    end_time: Date;
    looping: boolean;
    priority: number;
  };
}
