import { useState, useCallback } from 'react';
import { FindPlaylistByIdRequest } from '../../services';
import { ErrorResponse, PlaylistResponseDto } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindPlaylistByIdData {
  loggedUserId?: string;
  playlistId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindPlaylistByIdData = (companyData: FindPlaylistByIdData) => {
  const { showAlert, loggedUserId, playlistId } = companyData;
  const [playlistById, setPlaylistById] = useState<PlaylistResponseDto>(
    {} as PlaylistResponseDto
  );

  const getPlaylistByIdData = useCallback(
    async (inputPlaylistId?: string) => {
      if (!loggedUserId) return;
      if (!playlistId) return;
      try {
        const result = await FindPlaylistByIdRequest({
          loggedUserId,
          id: inputPlaylistId !== undefined ? inputPlaylistId : playlistId,
        });
        if (result) {
          setPlaylistById(result);
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
    [showAlert, playlistId, loggedUserId]
  );

  return { playlistById, getPlaylistByIdData };
};
