import { useState, useCallback } from 'react';
import { ListContentFilesRequest } from '../../services';
import { ContentFile, ErrorResponse } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FilesByPlaylistDataProps {
  companyId?: string;
  loggedUserId?: string;
  directoryId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListContentFilesData = (data: FilesByPlaylistDataProps) => {
  const { showAlert, loggedUserId, companyId, directoryId } = data;
  const [listFiles, setListFiles] = useState<ContentFile[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListContentFilesData = useCallback(
    async (input?: string, inputDirectoryId?: string, skip?: number) => {
      if (!loggedUserId) return;
      if (!companyId) return;
      try {
        const result = await ListContentFilesRequest({
          loggedUserId,
          directoryId: directoryId || inputDirectoryId || '',
          companyId,
          userInput: input || '',
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
    [showAlert, loggedUserId, companyId, directoryId]
  );

  return { listFiles, totalPage, getListContentFilesData };
};
