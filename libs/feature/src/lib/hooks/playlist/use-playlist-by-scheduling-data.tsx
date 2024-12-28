import { useState, useCallback } from 'react';
import { ListPlaylistBySchedulingIdRequest } from '../../services';
import { ErrorResponse, Playlist } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface PlaylistDataProps {
  schedulingId?: string;
  loggedUserId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const usePlaylistBySchedulingData = (data: PlaylistDataProps) => {
  const { showAlert, loggedUserId, schedulingId } = data;
  const [listPlaylist, setListPlaylist] = useState<Playlist[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getPlayListBySchedulingData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      if (!schedulingId) return;
      try {
        const result = await ListPlaylistBySchedulingIdRequest({
          loggedUserId,
          skip: skip ? (skip - 1) * 8 : 0,
          filter: input || '',
          id: schedulingId,
        });
        if (result) {
          setListPlaylist(result.playlists);
          setTotalPage(result.totalPages);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Playlist');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert, loggedUserId, schedulingId]
  );

  return { listPlaylist, totalPage, getPlayListBySchedulingData };
};
