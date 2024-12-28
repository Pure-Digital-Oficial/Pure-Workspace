import { FC } from 'react';
import { SimpleConfimationModal } from '../simple';
import {
  ErrorResponse,
  RemoveUserAccessToTheCompanyDto,
} from '@pure-workspace/domain';
import { RemoveUserAccessToTheCompanyRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { useLoggedUser } from '../../../contexts';

interface removeUserAccessToTheCompanyModalProps {
  open: boolean;
  title: string;
  subTitle?: string;
  companyId: string;
  userId: string;
  successMessage?: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
}

export const RemoveUserAccessToTheCompanyModal: FC<
  removeUserAccessToTheCompanyModalProps
> = ({
  companyId,
  userId,
  open,
  title,
  subTitle,
  handlePopUpClose,
  showAlert,
  successMessage = 'Empresa Removida Com Sucesso!',
}) => {
  const { loggedUser } = useLoggedUser();

  const removeUserAccessToTheCompany = async (
    input: RemoveUserAccessToTheCompanyDto
  ) => {
    try {
      const result = await RemoveUserAccessToTheCompanyRequest(input);
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
          'Empresa ou Usuário',
          '1',
          'Usuário'
        );
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const removeUserAccess = async () => {
    await removeUserAccessToTheCompany({
      companyId,
      loggedUserId: loggedUser?.id ?? '',
      userId,
    });
  };
  return (
    <SimpleConfimationModal
      onClose={handlePopUpClose}
      open={open}
      subTitle={subTitle ?? ''}
      title={title}
      onSuccess={removeUserAccess}
    />
  );
};
