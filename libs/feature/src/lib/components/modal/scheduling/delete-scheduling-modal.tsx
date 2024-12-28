import { FC } from 'react';
import { useLoggedUser } from '../../../contexts';
import { SimpleConfimationModal } from '../simple';
import { DeleteSchedulingRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { ErrorResponse } from '@pure-workspace/domain';
import { ValidationsError } from '../../../shared';

interface DeleteSchedulingModalProps {
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  successMessage?: string;
  subTitle?: string;
  idToDelete: string;
}

export const DeleteSchedulingModal: FC<DeleteSchedulingModalProps> = ({
  handlePopUpClose,
  showAlert,
  open,
  title,
  successMessage = 'Agendamento Deletado com Sucesso',
  subTitle,
  idToDelete,
}) => {
  const { loggedUser } = useLoggedUser();

  const deleteSchedulingRequest = async () => {
    try {
      await DeleteSchedulingRequest({
        id: idToDelete,
        loggedUserId: loggedUser?.id ?? '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Usuario ou Agendamento');
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
      onSuccess={deleteSchedulingRequest}
    />
  );
};
