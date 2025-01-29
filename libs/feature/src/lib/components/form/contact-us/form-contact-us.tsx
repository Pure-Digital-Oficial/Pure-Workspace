import { Box, TextField } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { FormButton } from '../form-button.component';
import {
  contactUsBodyDto,
  CreateContactUsDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import { CreateContactUsRequest } from '../../../services';
import { useAppIdContext } from '../../../contexts';

interface FormContactUsProps {
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  numberLabel?: string;
  emailLabel?: string;
  descriptionLabel?: string;
  buttonTitle?: string;
  successMessage?: string;
  bgColor?: string;
  color?: string;
}

export const FormContactUs: FC<FormContactUsProps> = ({
  showAlert,
  nameLabel = 'Nome',
  numberLabel = 'Telefone',
  emailLabel = 'Email',
  descriptionLabel = 'Descrição',
  buttonTitle = 'Enviar',
  successMessage = 'Dados enviados com Sucesso!',
  bgColor = '#1B7A43',
  color = 'white',
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { appId } = useAppIdContext();

  const {
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<contactUsBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    //resolver: zodResolver(CreateCompanyDataFormSchema),
    defaultValues: {
      name: '',
      number: '',
      email: '',
      description: '',
    },
  });

  const createContactUs = async (input: CreateContactUsDto) => {
    try {
      const result = await CreateContactUsRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Contato');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleContactUs = async (data: contactUsBodyDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await createContactUs({
      body: data,
      appId: appId,
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
      setSuccess(false);
      reset({
        name: '',
        number: '',
        email: '',
        description: '',
      });
      showAlert(successMessage, true);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleContactUs)}>
      <TextField
        margin="normal"
        required
        fullWidth
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ''}
        id="name"
        variant="outlined"
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: bgColor,
            color: color,
          },
          '& label': { color: color },
          '& label.Mui-focused': { color: color },
        }}
        disabled={loading}
        label={nameLabel}
        autoComplete="name"
        autoFocus
        {...register('name')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        error={!!errors.number}
        helperText={errors.number ? errors.number.message : ''}
        id="number"
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: bgColor,
            color: color,
          },
          '& label': { color: color },
          '& label.Mui-focused': { color: color },
        }}
        disabled={loading}
        label={numberLabel}
        autoComplete="number"
        {...register('number')}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
        id="email"
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: bgColor,
            color: color,
          },
          '& label': { color: color },
          '& label.Mui-focused': { color: color },
        }}
        disabled={loading}
        label={emailLabel}
        autoComplete="email"
        {...register('email')}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        error={!!errors.description}
        helperText={errors.description ? errors.description.message : ''}
        id="description"
        sx={{
          '& .MuiInputBase-root': {
            backgroundColor: bgColor,
            color: color,
          },
          '& label': { color: color },
          '& label.Mui-focused': { color: color },
        }}
        disabled={loading}
        label={descriptionLabel}
        autoComplete="description"
        {...register('description')}
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
            buttonTitle={buttonTitle}
            loading={loading}
            success={success}
            variant="outlined"
          />
        </Box>
      </Box>
    </Box>
  );
};
