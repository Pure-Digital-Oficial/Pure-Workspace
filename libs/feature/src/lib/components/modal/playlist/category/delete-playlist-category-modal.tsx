import { FC } from 'react';
import { SimpleConfimationModal } from '../../simple';
import { useLoggedUser } from '../../../../contexts';
import { DeletePlaylistCategoryRequest } from '../../../../services';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@pure-workspace/domain';
import { ValidationsError } from '../../../../shared';

interface DeletePlaylistCategoryModalProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  open: boolean;
  subTitle?: string;
  title: string;
  selectedId: string;
}

export const DeletePlaylistCategoryModal: FC<
  DeletePlaylistCategoryModalProps
> = ({ handlePopUpClose, showAlert, open, subTitle, title, selectedId }) => {
  const { loggedUser } = useLoggedUser();

  const deletePlaylistCategoryRequest = async () => {
    try {
      await DeletePlaylistCategoryRequest({
        id: selectedId,
        loggedUserId: loggedUser?.id ?? '',
      });
      handlePopUpClose();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Usuario ou Categoria');
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
      onSuccess={deletePlaylistCategoryRequest}
    />
  );
};
