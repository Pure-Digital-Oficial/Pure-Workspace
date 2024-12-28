import { useState, useCallback } from 'react';
import { FindFilesByPlaylistRequest } from '../../services';
import { ContentFile, ErrorResponse } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FilesByPlaylistDataProps {
  playlistId?: string;
  loggedUserId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFilesByPlaylistData = (data: FilesByPlaylistDataProps) => {
  const { showAlert, loggedUserId, playlistId } = data;
  const [listFiles, setListFiles] = useState<ContentFile[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getFilesByPlaylistData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      if (!playlistId) return;
      try {
        const result = await FindFilesByPlaylistRequest({
          loggedUserId,
          idPlaylist: playlistId,
          skip: skip ? (skip - 1) * 8 : 0,
        });
        if (result) {
          setListFiles(result.files);
          setTotalPage(result.totalPages);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Arquivos');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert, loggedUserId, playlistId]
  );

  return { listFiles, totalPage, getFilesByPlaylistData };
};
