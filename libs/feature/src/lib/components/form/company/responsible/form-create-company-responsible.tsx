import {
  CompanyBodyResponsibleDto,
  CreateCompanyResponsibleDto,
  ErrorResponse,
  MaskType,
  StepItem,
} from '@pure-workspace/domain';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { CreateCompanyResponsibleRequest } from '../../../../services';
import axios, { AxiosError } from 'axios';
import { useLoggedUser } from '../../../../contexts';
import { formatValueMask, ValidationsError } from '../../../../shared';
import { Box, TextField } from '@mui/material';
import { FormButton } from '../../form-button.component';

interface FormCreateCompanyResponsibleProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  step: StepItem;
  companyId: string;
  buttonTitle?: string;
  successMessage?: string;
  nameLabel?: string;
  documentLabel?: string;
  emailLabel?: string;
  phoneLabel?: string;
  birthdateLabel?: string;
  maskDocumentType?: MaskType;
}

export const FormCreateCompanyResponsible: FC<
  FormCreateCompanyResponsibleProps
> = ({
  showAlert,
  handlePopUpClose,
  companyId,
  step: { stepPosition = 5, stepTitle = 'Etapa', totalPositions },
  successMessage = 'Responsável da Empresa criado com sucesso',
  nameLabel = 'Nome',
  documentLabel = 'CPF',
  emailLabel = 'Email',
  phoneLabel = 'Telefone',
  birthdateLabel = 'Data de Nascimento',
  maskDocumentType = 'cpf',
  buttonTitle = 'Adicionar Responsável',
}) => {
  const { loggedUser } = useLoggedUser();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm<CompanyBodyResponsibleDto>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      birthdate: new Date(),
      document: '',
      email: '',
      name: '',
      phone: '',
    },
  });

  const createCompanyResponsible = async (
    input: CreateCompanyResponsibleDto
  ) => {
    try {
      const result = await CreateCompanyResponsibleRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Responsável da Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleCompanyData = async (data: CompanyBodyResponsibleDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await createCompanyResponsible({
      body: data,
      loggedUserId: loggedUser?.id ?? '',
      companyId,
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
      setSuccess(false);
      reset({
        birthdate: new Date(),
        document: '',
        email: '',
        name: '',
        phone: '',
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
        fullWidth
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
        id="name"
        disabled={loading}
        label={nameLabel}
        autoComplete="name"
        autoFocus
        {...register('name')}
      />

      <Controller
        name="document"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label={documentLabel}
            fullWidth
            margin="normal"
            error={!!errors.document}
            helperText={errors.document ? errors.document.message : ''}
            onChange={(e) =>
              field.onChange(formatValueMask(e.target.value, maskDocumentType))
            }
            inputProps={{ maxLength: 18 }}
          />
        )}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        type="email"
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
        id="email"
        disabled={loading}
        label={emailLabel}
        autoComplete="email"
        {...register('email')}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Box width="48%">
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                label={phoneLabel}
                fullWidth
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone ? errors.phone.message : ''}
                onChange={(e) =>
                  field.onChange(formatValueMask(e.target.value, 'phone'))
                }
                inputProps={{ maxLength: 18 }}
              />
            )}
          />
        </Box>
        <Box width="48%">
          <TextField
            margin="normal"
            required
            fullWidth
            type="date"
            error={!!errors.birthdate}
            InputLabelProps={{ shrink: true, required: true }}
            helperText={errors.birthdate ? errors.birthdate.message : ''}
            id="birthdate"
            disabled={loading}
            label={birthdateLabel}
            autoComplete="birthdate"
            {...register('birthdate')}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 2,
        }}
      >
        <Box width="80%">
          <FormButton
            buttonTitle={`${buttonTitle} (${stepTitle} - ${stepPosition}/${totalPositions})`}
            loading={loading}
            success={success}
          />
        </Box>
      </Box>
    </Box>
  );
};
