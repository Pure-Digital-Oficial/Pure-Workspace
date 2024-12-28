import { useState, useCallback } from 'react';
import { DetailsContentFileRequest } from '../../services';
import {
  ContentFile,
  DetailsContentFileDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface DetailsContentFileDataProps {
  input: DetailsContentFileDto;
  showAlert: (message: string, success: boolean) => void;
}

export const useDetailsContentFileData = (
  data: DetailsContentFileDataProps
) => {
  const {
    showAlert,
    input: { directoryId, id, loggedUserId },
  } = data;
  const [detailsFile, setDetailsFile] = useState<ContentFile>(
    {} as ContentFile
  );

  const getFilesByPlaylistData = useCallback(async () => {
    if (!loggedUserId) return;
    if (!directoryId) return;
    if (!id) return;
    try {
      const result = await DetailsContentFileRequest({
        directoryId,
        id,
        loggedUserId,
      });
      const formattedUploadDate = result.uploadDate
        ? new Date(result.uploadDate).toISOString().split('T')[0]
        : new Date();
      setDetailsFile({
        ...result,
        uploadDate: formattedUploadDate as Date,
      });
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'arquivo ou diretório');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  }, [showAlert, loggedUserId, id, directoryId]);

  return { detailsFile, getFilesByPlaylistData };
};
