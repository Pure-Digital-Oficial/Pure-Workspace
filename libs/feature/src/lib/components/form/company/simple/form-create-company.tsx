import { zodResolver } from '@hookform/resolvers/zod';
import { Box, TextField } from '@mui/material';
import {
  CompanyBodyDto,
  CompanySimpleResponseDto,
  CreateCompanyDto,
  ErrorResponse,
  StepItem,
} from '@pure-workspace/domain';
import { Controller, useForm } from 'react-hook-form';
import { CreateCompanyFormSchema } from '../../../../shared/validations/company/create-company.schema';
import { FC, useEffect, useState } from 'react';
import { CreateCompanyRequest } from '../../../../services';
import axios, { AxiosError } from 'axios';
import { formatValueMask, ValidationsError } from '../../../../shared';
import { FormButton } from '../../form-button.component';
import { useLoggedUser } from '../../../../contexts';

interface FormCreateCompanyProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  changeCompanyId: (companyId: string) => void;
  company: CompanySimpleResponseDto;
  step: StepItem;
  totalPosition: number;
  fantasyNameLabel?: string;
  cnpjLabel?: string;
  socialReasonLabel?: string;
  successMessage?: string;
  buttonTitle?: string;
}

export const FormCreateCompany: FC<FormCreateCompanyProps> = ({
  showAlert,
  handlePopUpClose,
  changeCompanyId,
  company,
  totalPosition,
  step: { stepPosition = 1, stepTitle = 'Etapa' },
  fantasyNameLabel = 'Nome Fantasia',
  cnpjLabel = 'CNPJ',
  socialReasonLabel = 'Razão Social',
  successMessage = 'Empresa criada com sucesso',
  buttonTitle = 'Adicionar Empresa',
}) => {
  const { loggedUser } = useLoggedUser();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<CompanyBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(CreateCompanyFormSchema),
    defaultValues: {
      cnpj: company.cnpj,
      fantasyName: company.fantasyName,
      socialReason: company.socialReason,
    },
  });

  const createCompany = async (input: CreateCompanyDto) => {
    try {
      input.body.cnpj = input.body.cnpj.replace(/[^\d]+/g, '');
      const result = await CreateCompanyRequest(input);
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

  useEffect(() => {
    setValue('cnpj', formatValueMask(company.cnpj, 'cnpj'));
  }, [company.cnpj, setValue]);

  const handleCompanyData = async (data: CompanyBodyDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await createCompany({
      body: data,
      loggedUserId: loggedUser?.id ?? '',
    });
    if (result) {
      changeCompanyId(result.companyId);
      setLoading(false);
      setSuccess(true);
      setSuccess(false);
      reset({
        fantasyName: '',
        cnpj: '',
        socialReason: '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    }
  };

  return (
    <Box
      sx={{ mt: 2 }}
      component="form"
      onSubmit={handleSubmit(handleCompanyData)}
    >
      <TextField
        margin="normal"
        required
        autoFocus
        fullWidth
        error={!!errors.socialReason}
        helperText={errors.socialReason ? errors.socialReason.message : ''}
        id="socialReason"
        disabled={loading}
        label={socialReasonLabel}
        autoComplete="socialReason"
        {...register('socialReason')}
      />

      <Controller
        name="cnpj"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="CNPJ"
            fullWidth
            margin="normal"
            error={!!errors.cnpj}
            helperText={errors.cnpj ? errors.cnpj.message : ''}
            onChange={(e) =>
              field.onChange(formatValueMask(e.target.value, 'cnpj'))
            }
            inputProps={{ maxLength: 18 }}
          />
        )}
      />

      <TextField
        margin="normal"
        fullWidth
        error={!!errors.fantasyName}
        helperText={errors.fantasyName ? errors.fantasyName.message : ''}
        id="fantasyName"
        disabled={loading}
        label={fantasyNameLabel}
        autoComplete="fantasyName"
        {...register('fantasyName')}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Box width="80%">
          <FormButton
            buttonTitle={`${buttonTitle} (${stepTitle} - ${stepPosition}/${totalPosition})`}
            loading={loading}
            success={success}
          />
        </Box>
      </Box>
    </Box>
  );
};
