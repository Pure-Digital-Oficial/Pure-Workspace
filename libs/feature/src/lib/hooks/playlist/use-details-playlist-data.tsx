import { useState, useCallback } from 'react';
import { DetailsPlaylistRequest } from '../../services';
import {
  DetailsPlaylistDto,
  ErrorResponse,
  PlaylistResponseDto,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface ListPlaylistDataProps {
  input: DetailsPlaylistDto;
  showAlert: (message: string, success: boolean) => void;
}

export const useDetailsPlaylistData = (data: ListPlaylistDataProps) => {
  const {
    showAlert,
    input: { loggedUserId, playlistId },
  } = data;
  const [detailsPlaylist, setDetailsPlaylist] = useState<PlaylistResponseDto>(
    {} as PlaylistResponseDto
  );

  const getDetailsPlaylistData = useCallback(async () => {
    if (!loggedUserId) return;
    if (!playlistId) return;
    try {
      const result = await DetailsPlaylistRequest({
        loggedUserId,
        playlistId,
      });
      if (result) {
        setDetailsPlaylist(result);
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
  }, [showAlert, loggedUserId, playlistId]);

  return { detailsPlaylist, getDetailsPlaylistData };
};
