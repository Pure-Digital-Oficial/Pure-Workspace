import { Box, useTheme, useMediaQuery, TextField } from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  PlaylistCategoryBodyDto,
  CreatePlaylistCategoryDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CreatePlaylistCategorySchema,
  ValidationsError,
} from '../../../../shared';
import { FormButton } from '../../../form';
import { useLoggedUser } from '../../../../contexts';
import { CreatePlaylistCategoryRequest } from '../../../../services';
import axios, { AxiosError } from 'axios';
import { SimpleFormModal } from '../../simple';

interface CreatePlaylistCategoryModalProps {
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  descriptionLabel?: string;
  successMessage?: string;
}

export const CreatePlaylistCategoryModal: FC<
  CreatePlaylistCategoryModalProps
> = ({
  open,
  title,
  handlePopUpClose,
  showAlert,
  nameLabel = 'Nome',
  descriptionLabel = 'Descrição',
  successMessage = 'Categoria registrada com sucesso',
}) => {
  const theme = useTheme();
  const { loggedUser } = useLoggedUser();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PlaylistCategoryBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(CreatePlaylistCategorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const createCategory = async (input: CreatePlaylistCategoryDto) => {
    try {
      const result = await CreatePlaylistCategoryRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Categoria ou Playlist');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleCategoryData = async (data: PlaylistCategoryBodyDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await createCategory({
      body: data,
      loggedUserId: loggedUser?.id ?? '',
      companyId: loggedUser?.selectedCompany.id ?? '',
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
      setSuccess(false);
      reset({
        name: '',
        description: '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    }
  };

  return (
    <SimpleFormModal
      open={open}
      handlePopUpClose={handlePopUpClose}
      height={theme.spacing(63)}
      width={smDown ? '90%' : theme.spacing(80)}
      title={title}
    >
      <Box
        sx={{ mt: 2 }}
        component="form"
        onSubmit={handleSubmit(handleCategoryData)}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          id="name"
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
          error={!!errors.description}
          helperText={errors.description?.message}
          id="description"
          disabled={loading}
          label={descriptionLabel}
          autoComplete="description"
          multiline
          rows={4}
          {...register('description')}
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
