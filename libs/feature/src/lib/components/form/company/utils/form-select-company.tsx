import { ComboBoxListResult, ErrorResponse } from '@pure-workspace/domain';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useLoggedUser } from '../../../../contexts';
import { FC, useState } from 'react';
import { useListCompanyData } from '../../../../hooks';
import { Box, Button, IconButton, useTheme } from '@mui/material';
import { SearchComboBox } from '../../../input';
import { SelectCompanyRequest } from '../../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../../shared';

interface FormSelectCompanyProps {
  backButton: () => void;
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  buttonTitle?: string;
}

export const FormSelectCompany: FC<FormSelectCompanyProps> = ({
  backButton,
  showAlert,
  handlePopUpClose,
  buttonTitle = 'Selecionar Empresa',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();

  const [comboBoxListResult, setComboBoxListResult] =
    useState<ComboBoxListResult | null>(null);

  const { getListCompanyData, listCompany } = useListCompanyData({
    showAlert,
    loggedUserId: loggedUser?.id ?? '',
  });

  const handleList = async (
    searchTerm: string,
    page: number,
    pageSize: number
  ) => {
    await getListCompanyData(searchTerm ?? '', page);

    return (
      listCompany.map((company) => {
        return {
          id: company.id,
          key: company.socialReason,
        };
      }) ?? []
    );
  };

  const getResult = (item: ComboBoxListResult | null) => {
    setComboBoxListResult(item);
  };

  const selectCompany = async () => {
    try {
      console.log(loggedUser?.id ?? '');
      const result = await SelectCompanyRequest({
        companyId: comboBoxListResult?.id ?? '',
        loggedUserId: loggedUser?.id ?? '',
      });

      if (result) {
        showAlert('Agendamentos movidos com sucesso', true);
        handlePopUpClose();
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Selecionar Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  return (
    <>
      <Box>
        <SearchComboBox
          onList={handleList}
          onItemSelected={getResult}
          pageSize={6}
        />
      </Box>
      <Box
        sx={{
          marginLeft: '-2rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: theme.spacing(2),
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
          }}
        >
          <IconButton
            onClick={backButton}
            sx={{
              width: '3.1rem',
              height: '3.1rem',
              marginRight: '1rem',
            }}
          >
            <ArrowCircleLeftIcon
              color="primary"
              onClick={backButton}
              sx={{
                width: '3rem',
                height: '3rem',
              }}
            />
          </IconButton>
        </Box>

        <Button variant="contained" onClick={selectCompany}>
          {buttonTitle}
        </Button>
      </Box>
    </>
  );
};
