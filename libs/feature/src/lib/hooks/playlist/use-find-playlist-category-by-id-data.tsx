import { useState, useCallback } from 'react';
import { FindPlaylistCategoryByIdRequest } from '../../services';
import { ErrorResponse, PlaylistCategory } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindPlaylistCategoryByIdData {
  loggedUserId?: string;
  playlistCategoryId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindPlaylistCategoryByIdData = (
  companyData: FindPlaylistCategoryByIdData
) => {
  const { showAlert, loggedUserId, playlistCategoryId } = companyData;
  const [playlistCategoryById, setPlaylistCategoryById] =
    useState<PlaylistCategory>({} as PlaylistCategory);

  const getPlaylistCategoryByIdData = useCallback(
    async (inputPlaylistId?: string) => {
      if (!loggedUserId) return;
      if (!playlistCategoryId) return;
      try {
        const result = await FindPlaylistCategoryByIdRequest({
          loggedUserId,
          id:
            inputPlaylistId !== undefined
              ? inputPlaylistId
              : playlistCategoryId,
        });
        if (result) {
          setPlaylistCategoryById(result);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Categoria da Playlist');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert, playlistCategoryId, loggedUserId]
  );

  return { playlistCategoryById, getPlaylistCategoryByIdData };
};
