import { Box, TextField, useMediaQuery, useTheme } from '@mui/material';
import { FC, useState } from 'react';
import { useLoggedUser } from '../../../contexts';
import { useForm } from 'react-hook-form';
import {
  DeviceBodyDto,
  CreateDeviceDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import { CreateDeviceFormSchema, ValidationsError } from '../../../shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateDeviceRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { SimpleFormModal } from '../simple';
import { FormButton } from '../../form';

interface CreateDeviceModalProps {
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  successMessage?: string;
}

export const CreateDeviceModal: FC<CreateDeviceModalProps> = ({
  open,
  title,
  handlePopUpClose,
  showAlert,
  nameLabel = 'Nome',
  successMessage = 'Dispositivo criado com sucesso',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { loggedUser } = useLoggedUser();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<DeviceBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(CreateDeviceFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const createDevice = async (input: CreateDeviceDto) => {
    try {
      const result = await CreateDeviceRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Dispositivo');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleDeviceData = async (data: DeviceBodyDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await createDevice({
      body: data,
      loggedUserId: loggedUser?.id ?? '',
      companyId: loggedUser?.selectedCompany?.id ?? '',
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
      setSuccess(false);
      reset({
        name: '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    }
  };

  return (
    <SimpleFormModal
      open={open}
      handlePopUpClose={handlePopUpClose}
      height={theme.spacing(43)}
      width={smDown ? '90%' : theme.spacing(90)}
      title={title}
    >
      <Box
        sx={{ mt: 2 }}
        component="form"
        onSubmit={handleSubmit(handleDeviceData)}
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
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          <Box width="80%">
            <FormButton
              buttonTitle="Criar"
              loading={loading}
              success={success}
            />
          </Box>
        </Box>
      </Box>
    </SimpleFormModal>
  );
};
