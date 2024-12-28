import { Box, Button, Divider, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { FormButton } from '../../form-button.component';
import { useForm } from 'react-hook-form';
import {
  CompanyResponseDto,
  ConsultCompanyByCnpjDto,
  ErrorResponse,
  StepItem,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../../shared';
import { ConsultCompanyByCnpjRequest } from '../../../../services';
import { useLoggedUser } from '../../../../contexts';
import { ConsultCompanyByCnpjFormSchema } from '../../../../shared/validations/company';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormConsultCompanyByCnpjProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  changeCompany: (company: CompanyResponseDto) => void;
  selectCompanyRedirect: () => void;
  selectCompanyButtonTitle?: string;
  orTextTitle?: string;
  totalPosition: number;
  step: StepItem;
  cnpjLabel?: string;
  buttonTitle?: string;
  successMessage?: string;
}

export const FormConsultCompanyByCnpj: FC<FormConsultCompanyByCnpjProps> = ({
  showAlert,
  handlePopUpClose,
  changeCompany,
  selectCompanyRedirect,
  totalPosition,
  selectCompanyButtonTitle = 'Escolher Empresa',
  orTextTitle = 'OU',
  step: { stepPosition = 1, stepTitle = 'Etapa' },
  cnpjLabel = 'Burscar CNPJ',
  buttonTitle = 'Buscar',
  successMessage = 'Empresa consultada com sucesso',
}) => {
  const { loggedUser } = useLoggedUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{
    cnpj: string;
  }>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(ConsultCompanyByCnpjFormSchema),
    defaultValues: {
      cnpj: '',
    },
  });

  const searchData = async (input: ConsultCompanyByCnpjDto) => {
    try {
      input.cnpj = input.cnpj.replace(/[^\d]+/g, '');
      const result = await ConsultCompanyByCnpjRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleCompanyData = async (data: { cnpj: string }) => {
    setLoading(true);
    setSuccess(false);
    const result = await searchData({
      cnpj: data.cnpj,
      loggedUserId: loggedUser?.id ?? '',
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
      setSuccess(false);
      reset({
        cnpj: '',
      });
      showAlert(successMessage, true);
      changeCompany(result);
      handlePopUpClose();
    }
  };
  return (
    <Box component="form" onSubmit={handleSubmit(handleCompanyData)}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          error={!!errors.cnpj}
          helperText={errors.cnpj ? errors.cnpj.message : ''}
          autoComplete="cnpj"
          id="cnpj"
          disabled={loading}
          label={cnpjLabel}
          {...register('cnpj')}
        />

        <Box width="80%" display="flex" flexDirection="column">
          <FormButton
            buttonTitle={`${buttonTitle} (${stepTitle} - ${stepPosition}/${totalPosition})`}
            loading={loading}
            success={success}
          />
          <Divider
            sx={{
              mt: '0.5rem',
              mb: '0.5rem',
            }}
          >
            {orTextTitle}
          </Divider>
          <Button
            variant="text"
            onClick={selectCompanyRedirect}
            sx={{ textTransform: 'none' }}
          >
            {selectCompanyButtonTitle}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
