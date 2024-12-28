import { useState, useCallback } from 'react';
import { ListPlaylistRequest } from '../../services';
import { ErrorResponse, Playlist } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface ListPlaylistDataProps {
  companyId?: string;
  loggedUserId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListPlaylistData = (data: ListPlaylistDataProps) => {
  const { showAlert, loggedUserId, companyId } = data;
  const [listPlaylist, setListPlaylist] = useState<Playlist[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListPlaylistData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      if (!companyId) return;
      try {
        const result = await ListPlaylistRequest({
          loggedUserId,
          companyId,
          skip: skip ? (skip - 1) * 8 : 0,
          userInput: input || '',
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
    [showAlert, loggedUserId, companyId]
  );

  return { listPlaylist, totalPage, getListPlaylistData };
};
