import { FC } from 'react';
import { SimpleConfimationModal } from '../simple';
import axios, { AxiosError } from 'axios';
import { DeleteSchedulesToDeviceDto, ErrorResponse } from '@pure-workspace/domain';
import { ValidationsError } from '../../../shared';
import { DeleteSchedulesToDeviceRequest } from '../../../services';

interface DeleteSchedulesToDeviceModalProps {
  showAlert: (message: string, success: boolean) => void;
  onClose: () => void;
  idDevice: string;
  loggedUserId: string;
  open: boolean;
  successMessage?: string;
  title: string;
  subTitle?: string;
  schedulesIds: string[];
}

export const DeleteSchedulesToDeviceModal: FC<
  DeleteSchedulesToDeviceModalProps
> = ({
  showAlert,
  onClose,
  idDevice,
  loggedUserId,
  open,
  title,
  schedulesIds,
  subTitle = 'Por favor, selecione alguma das alternativas',
  successMessage = 'Agendamento Removido com Sucesso!',
}) => {
  const deleteSchedules = async () => {
    try {
      const dto: DeleteSchedulesToDeviceDto = {
        idDevice,
        loggedUserId,
        schedulesIds,
      };
      const deletedSchedules = await DeleteSchedulesToDeviceRequest(dto);

      if (deletedSchedules) {
        showAlert(successMessage, true);
        onClose();
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(
          axiosError,
          'Agendamento ou Dispositivo'
        );
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  return (
    <SimpleConfimationModal
      open={open}
      onSuccess={deleteSchedules}
      onClose={onClose}
      title={title}
      subTitle={subTitle}
    />
  );
};
