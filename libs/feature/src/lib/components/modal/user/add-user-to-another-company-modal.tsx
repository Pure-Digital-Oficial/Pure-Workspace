import { FC, useState } from 'react';
import { SimpleFormModal } from '../simple';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useLoggedUser } from '../../../contexts';
import {
  AddUserToAnotherCompanyDto,
  ComboBoxListResult,
  ErrorResponse,
} from '@pure-workspace/domain';
import { AddUserToAnotherCompanyRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { SearchComboBox } from '../../input';
import { useListCompanyData } from '../../../hooks';

interface AddUserToAnotherCompanyModalProps {
  open: boolean;
  title: string;
  userId: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  successMessage?: string;
  buttonTitle?: string;
}

export const AddUserToAnotherCompanyModal: FC<
  AddUserToAnotherCompanyModalProps
> = ({
  handlePopUpClose,
  userId,
  open,
  showAlert,
  title,
  successMessage = 'Usuário adicionado à empresa com sucesso!',
  buttonTitle = 'Adicionar Usuário',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { getListCompanyData, listCompany } = useListCompanyData({
    showAlert,
    loggedUserId: loggedUser?.id ?? '',
  });

  const [comboBoxListResult, setComboBoxListResult] =
    useState<ComboBoxListResult | null>(null);

  const addUserToAnotherCompany = async (data: AddUserToAnotherCompanyDto) => {
    try {
      const result = await AddUserToAnotherCompanyRequest(data);

      if (result) {
        showAlert(successMessage, true);
        handlePopUpClose();
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Usuário ou Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const getResult = (item: ComboBoxListResult | null) => {
    setComboBoxListResult(item);
  };

  const handleList = async (
    searchTerm: string,
    page: number,
    pageSize: number
  ) => {
    await getListCompanyData(searchTerm, page);
    return (
      listCompany.map((company) => {
        return {
          id: company.id,
          key: company.socialReason,
        };
      }) ?? []
    );
  };

  const handleCompany = async () => {
    await addUserToAnotherCompany({
      companyId: comboBoxListResult?.id ?? '',
      loggedUserId: loggedUser?.id ?? '',
      userId,
    });
  };

  return (
    <SimpleFormModal
      height="auto"
      width={smDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box>
        <SearchComboBox
          onList={handleList}
          onItemSelected={getResult}
          pageSize={6}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: theme.spacing(2),
        }}
      >
        <Button variant="contained" onClick={handleCompany}>
          {buttonTitle}
        </Button>
      </Box>
    </SimpleFormModal>
  );
};
