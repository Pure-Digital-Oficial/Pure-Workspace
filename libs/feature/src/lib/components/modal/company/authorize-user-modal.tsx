import { useLoggedUser } from '../../../contexts';
import { SimpleConfimationModal } from '../simple';
import { FC } from 'react';
import { ErrorResponse } from '@pure-workspace/domain';
import {
  AuthorizeUserToCompanyRequest,
  UnauthorizeUserToCompanyRequest,
} from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';

interface AuthorizeUserModalProps {
  idToAuthorized: string;
  title: string;
  subTitle?: string;
  successMessage?: string;
  open: boolean;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
}

export const AuthorizeUserModal: FC<AuthorizeUserModalProps> = ({
  idToAuthorized,
  open,
  title,
  handlePopUpClose,
  showAlert,
  subTitle,
  successMessage = 'Usuário autorizado com sucesso!',
}) => {
  const { loggedUser } = useLoggedUser();

  const authorizeUser = async () => {
    try {
      const result = await AuthorizeUserToCompanyRequest({
        companyId: loggedUser?.selectedCompany.id ?? '',
        loggedUserId: loggedUser?.id ?? '',
        userId: idToAuthorized,
      });
      if (result) {
        showAlert(successMessage, true);
        handlePopUpClose();
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(
          axiosError,
          'Possível Usuario da Empresa'
        );
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const unauthorizeUser = async () => {
    try {
      const result = await UnauthorizeUserToCompanyRequest({
        companyId: loggedUser?.selectedCompany.id ?? '',
        loggedUserId: loggedUser?.id ?? '',
        userId: idToAuthorized,
      });
      if (result) {
        handlePopUpClose();
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(
          axiosError,
          'Possível Usuário da Empresa'
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
      onSuccess={authorizeUser}
      onUnsuccessfully={unauthorizeUser}
    />
  );
};
