export interface DeleteSchedulesToDeviceDto {
  idDevice: string;
  schedulesIds: string[];
  loggedUserId: string;
}
