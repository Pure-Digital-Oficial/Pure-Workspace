import { FC } from 'react';
import { useLoggedUser } from '../../../contexts';
import { DeleteDeviceRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@pure-workspace/domain';
import { ValidationsError } from '../../../shared';
import { SimpleConfimationModal } from '../simple';

interface DeleteDeviceModalProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  open: boolean;
  subTitle?: string;
  title: string;
  idToDelete: string;
  successMessage?: string;
}

export const DeleteDeviceModal: FC<DeleteDeviceModalProps> = ({
  handlePopUpClose,
  showAlert,
  open,
  subTitle,
  title,
  idToDelete,
  successMessage = 'Dispositivo Deletado com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();

  const deleteDeviceRequest = async () => {
    try {
      await DeleteDeviceRequest({
        id: idToDelete,
        loggedUserId: loggedUser?.id ?? '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Usuario ou Dispositivo');
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
      onSuccess={deleteDeviceRequest}
    />
  );
};
