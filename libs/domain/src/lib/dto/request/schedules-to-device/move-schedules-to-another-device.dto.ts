export interface MoveSchedulesToAnotherDeviceDto {
  oldDeviceId: string;
  newDeviceId: string;
  schedulesIds: string[];
  loggedUserId: string;
}
