import { PlaylistToScheduling } from '../../../src';
import { PlaylistMock } from '../playlist/playlist.mock';
import { SchedulingMock } from '../scheduling';

export const PlaylistToSchedulingMock: PlaylistToScheduling = {
  id: `${PlaylistMock.id}-${SchedulingMock.id}`,
};
