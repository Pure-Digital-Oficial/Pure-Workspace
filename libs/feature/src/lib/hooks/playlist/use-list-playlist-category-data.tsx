import { useState, useCallback } from 'react';
import { ListPlaylistCategoryRequest } from '../../services';
import { ErrorResponse, PlaylistCategory } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface PlaylistCategoryDataProps {
  companyId?: string;
  loggedUserId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListPlaylistCategoryData = (
  data: PlaylistCategoryDataProps
) => {
  const { showAlert, loggedUserId, companyId } = data;
  const [listPlaylistCategory, setListPlaylistCategory] = useState<
    PlaylistCategory[]
  >([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getPlaylistCategoryData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      if (!companyId) return;
      try {
        const result = await ListPlaylistCategoryRequest({
          loggedUserId,
          companyId,
          skip: skip ? (skip - 1) * 8 : 0,
          userInput: input || '',
        });
        if (result) {
          setListPlaylistCategory(result.categories);
          setTotalPage(result.totalPages);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Playlist Category');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert, loggedUserId, companyId]
  );

  return { listPlaylistCategory, totalPage, getPlaylistCategoryData };
};
