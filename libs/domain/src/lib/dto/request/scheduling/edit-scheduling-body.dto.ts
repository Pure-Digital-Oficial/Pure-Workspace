export interface EditSchedulingBodyDto {
  name: string;
  startTime: string | Date;
  endTime: string | Date;
  lopping: boolean;
  priority: string;
}
