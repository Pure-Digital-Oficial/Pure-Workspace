import axios, { AxiosError } from 'axios';
import { FC } from 'react';
import { ValidationsError } from '../../../shared';
import { ErrorResponse } from '@pure-workspace/domain';
import { DeletePlaylistFilesRequest } from '../../../services';
import { useLoggedUser } from '../../../contexts';
import { SimpleConfimationModal } from '../simple';

interface DeletePlaylistFilesModalProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  open: boolean;
  subTitle?: string;
  title: string;
  idsToDelete: string[];
  idPlaylist: string;
  successMessage?: string;
}

export const DeletePlaylistFilesModal: FC<DeletePlaylistFilesModalProps> = ({
  handlePopUpClose,
  showAlert,
  open,
  subTitle,
  title,
  idsToDelete,
  idPlaylist,
  successMessage = 'Arquivos Deletados com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();

  const deletePlaylistFilesRequest = async () => {
    try {
      await DeletePlaylistFilesRequest({
        filesId: idsToDelete,
        loggedUserId: loggedUser?.id ?? '',
        playlistId: idPlaylist,
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(
          axiosError,
          'Usuario ou Playlist ou Arquivos'
        );
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  return (
    <SimpleConfimationModal
      onClose={handlePopUpClose}
      open={open}
      subTitle={subTitle ?? ''}
      title={title}
      onSuccess={deletePlaylistFilesRequest}
    />
  );
};
