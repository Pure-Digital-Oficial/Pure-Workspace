import { Box, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { formatValueMask, ValidationsError } from '../../../shared'; // A função de formatação da máscara
import { FormButton } from '../form-button.component';
import {
  ContactUsBodyDto,
  CreateContactUsDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import { CreateContactUsRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
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

const textFieldStyles = (bgColor: string, color: string) => ({
  '& .MuiInputBase-root': {
    backgroundColor: bgColor,
    color: color,
  },
  '& label': {
    color: color,
    transition: 'all 0.3s ease',
  },
  '& label.Mui-focused': {
    color: color,
    backgroundColor: bgColor,
    paddingLeft: '0.5rem',
    paddingRight: '1rem',
    borderColor: color,
  },
  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
    borderColor: color,
  },
});

export const FormContactUs: FC<FormContactUsProps> = ({
  showAlert,
  nameLabel = 'Nome',
  numberLabel = 'Telefone',
  emailLabel = 'Email',
  descriptionLabel = 'Sua Mensagem',
  buttonTitle = 'Enviar',
  successMessage = 'Contato feito com Sucesso!',
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
    formState: { errors },
    setValue,
  } = useForm<ContactUsBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
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

  const handleContactUs = async (data: ContactUsBodyDto) => {
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
        sx={textFieldStyles(bgColor, color)}
        disabled={loading}
        label={nameLabel}
        autoComplete="name"
        {...register('name')}
      />

      <Controller
        name="number"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            id="number"
            {...field}
            label={numberLabel}
            fullWidth
            margin="normal"
            value={field.value || ''}
            disabled={loading}
            sx={textFieldStyles(bgColor, color)}
            error={!!errors.number}
            helperText={errors.number ? errors.number.message : ''}
            onChange={(e) => {
              const rawValue = e.target.value;
              setValue('number', rawValue);
            }}
            onBlur={(e) => {
              const maskedValue = formatValueMask(e.target.value, 'phone');
              setValue('number', maskedValue);
            }}
            inputProps={{ maxLength: 18 }}
          />
        )}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        error={!!errors.email}
        helperText={errors.email ? errors.email.message : ''}
        id="email"
        sx={textFieldStyles(bgColor, color)}
        disabled={loading}
        label={emailLabel}
        autoComplete="email"
        {...register('email')}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        rows={4}
        error={!!errors.description}
        helperText={errors.description ? errors.description.message : ''}
        id="description"
        sx={textFieldStyles(bgColor, color)}
        disabled={loading}
        label={descriptionLabel}
        autoComplete="description"
        {...register('description')}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          mt: 2,
          ml: 0,
        }}
      >
        <Box width="49.5%">
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
