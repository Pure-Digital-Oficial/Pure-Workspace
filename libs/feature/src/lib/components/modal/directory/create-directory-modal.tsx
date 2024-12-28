import { FC, useState } from 'react';
import { Box, TextField, useMediaQuery, useTheme } from '@mui/material';
import { SimpleFormModal } from '../simple';
import { useLoggedUser } from '../../../contexts';
import { useForm } from 'react-hook-form';
import {
  CreateDirectoryBodyDto,
  CreateDirectoryDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateDirectoryFormSchema, ValidationsError } from '../../../shared';
import { CreateDirectoryRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { FormButton } from '../../form';

interface CreateDirectoryModalProps {
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  successMessage?: string;
}

export const CreateDirectoryModal: FC<CreateDirectoryModalProps> = ({
  open,
  title,
  handlePopUpClose,
  showAlert,
  nameLabel = 'Nome',
  successMessage = 'Diretório criado com sucesso',
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
  } = useForm<CreateDirectoryBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(CreateDirectoryFormSchema),
    defaultValues: {
      name: '',
    },
  });

  const createDirectory = async (input: CreateDirectoryDto) => {
    try {
      const result = await CreateDirectoryRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.log(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Diretório');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleDirectoryData = async (data: CreateDirectoryBodyDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await createDirectory({
      body: data,
      loggedUserId: loggedUser?.id ?? '',
      companyId: loggedUser?.selectedCompany.id ?? '',
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
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
      height={smDown ? theme.spacing(45) : theme.spacing(50)}
      width={smDown ? '90%' : theme.spacing(90)}
      title={title}
    >
      <Box
        sx={{ mt: 2 }}
        component="form"
        onSubmit={handleSubmit(handleDirectoryData)}
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
        <FormButton buttonTitle="Criar" loading={loading} success={success} />
      </Box>
    </SimpleFormModal>
  );
};
