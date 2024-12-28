import { FC, useEffect, useState } from 'react';
import { useLoggedUser } from '../../../contexts';
import { Box, TextField, useMediaQuery, useTheme } from '@mui/material';
import {
  EditDirectoryBodyDto,
  EditDirectoryDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditDirectoryFormSchema, ValidationsError } from '../../../shared';
import { useForm } from 'react-hook-form';
import { SimpleFormModal } from '../simple';
import { EditDirectoryRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { FormButton } from '../../form';

interface EditDirectoryModalProps {
  idToEdit: string;
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  nameDirectory: string;
  successMessage?: string;
}

export const EditDirectoryModal: FC<EditDirectoryModalProps> = ({
  idToEdit,
  open,
  title,
  handlePopUpClose,
  showAlert,
  nameLabel = 'Novo Nome',
  nameDirectory = '',
  successMessage = 'Diretório Editado com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditDirectoryBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(EditDirectoryFormSchema),
    defaultValues: {
      newName: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset({ newName: nameDirectory });
    }
  }, [open, reset, nameDirectory]);

  const editDirectory = async (input: EditDirectoryDto) => {
    try {
      const editDirectory = await EditDirectoryRequest(input);
      if (Object.keys(editDirectory).length > 0) {
        setLoading(false);
        setSuccess(true);
        showAlert(successMessage, true);
        setSuccess(false);
        handlePopUpClose();
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Directory');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleEditDirectory = async (data: EditDirectoryBodyDto) => {
    setLoading(true);
    setSuccess(false);
    editDirectory({
      id: idToEdit,
      newName: data.newName,
      loggedUserId: loggedUser?.id ?? '',
    });
  };

  return (
    <SimpleFormModal
      open={open}
      title={title}
      handlePopUpClose={handlePopUpClose}
      height={theme.spacing(40)}
      width={smDown ? '90%' : theme.spacing(80)}
    >
      <Box
        sx={{
          mt: 2,
        }}
        component={'form'}
        onSubmit={handleSubmit(handleEditDirectory)}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          InputLabelProps={{ shrink: true, required: true }}
          error={!!errors.newName}
          helperText={errors.newName ? errors.newName.message : ''}
          id="newName"
          disabled={loading}
          label={nameLabel}
          autoComplete="newName"
          autoFocus
          {...register('newName')}
        />
        <FormButton
          buttonTitle="Registrar"
          loading={loading}
          success={success}
        />
      </Box>
    </SimpleFormModal>
  );
};
