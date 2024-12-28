import {
  FindPlaylistByIdDto,
  FindSchedulesByDeviceIdDto,
  PlaylistResponseDto,
  Scheduling,
} from '@pure-workspace/domain';
import { pureTvApi } from '../axios-config';

export async function FindSchedulesByDeviceIdRequest(
  input: FindSchedulesByDeviceIdDto
) {
  const result = await pureTvApi.get<Scheduling[]>(
    `find-schedules-by-device-id/${input.idDevice}`,
    {
      params: {
        loggedUserId: input.loggedUserId,
      },
    }
  );
  return result.data;
}
