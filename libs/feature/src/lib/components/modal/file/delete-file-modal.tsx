import { FC } from 'react';
import axios, { AxiosError } from 'axios';
import {
  DeleteContentFileByIdDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import { DeleteContentFileByIdRequest } from '../../../services';
import { ValidationsError } from '../../../shared';
import { SimpleConfimationModal } from '../simple';

interface DeleteFileModalProps {
  showAlert: (message: string, success: boolean) => void;
  onClose: () => void;
  directoryId: string;
  idToDelete: string;
  loggedUserId: string;
  open: boolean;
  successMessage?: string;
}

export const DeleteFileModal: FC<DeleteFileModalProps> = ({
  showAlert,
  onClose,
  directoryId,
  idToDelete,
  loggedUserId,
  open,
  successMessage = 'Arquivo Deletado com Sucesso!',
}) => {
  const deleteFile = async () => {
    try {
      const dto: DeleteContentFileByIdDto = {
        directoryId,
        loggedUserId,
        idToDelete,
      };
      await DeleteContentFileByIdRequest(dto);
      showAlert(successMessage, true);
      onClose();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Download');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  return (
    <SimpleConfimationModal
      open={open}
      onSuccess={deleteFile}
      onClose={onClose}
      title="Deseja deletar o arquivo?"
      subTitle="Por favor, selecione alguma das alternativas"
    />
  );
};
