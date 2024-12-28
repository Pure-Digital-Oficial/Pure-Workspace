import { FC } from 'react';
import { SimpleConfimationModal } from '../simple';
import { useLoggedUser } from '../../../contexts';
import { DeletePlaylistRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@pure-workspace/domain';
import { ValidationsError } from '../../../shared';

interface DeletePlaylistModalProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  open: boolean;
  subTitle?: string;
  title: string;
  idToDelete: string;
  successMessage?: string;
}

export const DeletePlaylistModal: FC<DeletePlaylistModalProps> = ({
  handlePopUpClose,
  showAlert,
  open,
  subTitle,
  title,
  idToDelete,
  successMessage = 'Playlist Deletada com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();

  const deletePlaylistRequest = async () => {
    try {
      await DeletePlaylistRequest({
        id: idToDelete,
        loggedUserId: loggedUser?.id ?? '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Usuario ou Playlist');
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
      onSuccess={deletePlaylistRequest}
    />
  );
};
