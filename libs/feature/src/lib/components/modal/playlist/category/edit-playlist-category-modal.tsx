import { Box, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useLoggedUser } from '../../../../contexts';
import { FC, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditPlaylistCategoryBodyDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import {
  EditPlaylistCategorySchema,
  ValidationsError,
} from '../../../../shared';
import { useForm } from 'react-hook-form';
import {
  EditPlaylistCategoryRequest,
  FindPlaylistCategoryByIdRequest,
} from '../../../../services';
import axios, { AxiosError } from 'axios';
import { FormButton } from '../../../form';
import { SimpleFormModal } from '../../simple';
import { useFindPlaylistCategoryByIdData } from 'libs/feature/src/lib/hooks';
import { Console } from 'console';

interface EditPlaylistCategoryModalProps {
  open: boolean;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  title: string;
  selectedId: string;
}

export const EditPlaylistCategoryModal: FC<EditPlaylistCategoryModalProps> = ({
  open,
  handlePopUpClose,
  showAlert,
  title,
  selectedId,
}) => {
  const theme = useTheme();
  const { loggedUser } = useLoggedUser();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  const { getPlaylistCategoryByIdData, playlistCategoryById } =
    useFindPlaylistCategoryByIdData({
      loggedUserId: loggedUser?.id ?? '',
      playlistCategoryId: selectedId,
      showAlert,
    });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditPlaylistCategoryBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(EditPlaylistCategorySchema),
    defaultValues: {
      id: '',
      name: '',
      description: '',
    },
  });

  useEffect(() => {
    if (open && selectedId && !dataLoaded) {
      reset({
        id: '',
        name: '',
        description: '',
      });

      getPlaylistCategoryByIdData();
    }
  }, [open, selectedId, getPlaylistCategoryByIdData, reset, dataLoaded]);

  useEffect(() => {
    if (open && playlistCategoryById?.id) {
      reset({
        id: playlistCategoryById.id,
        name: playlistCategoryById.name,
        description: playlistCategoryById.description,
      });
      setDataLoaded(true);
    }
  }, [open, playlistCategoryById, reset]);

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  const editCategory = async (data: EditPlaylistCategoryBodyDto) => {
    try {
      setLoading(true);
      setSuccess(false);
      const result = await EditPlaylistCategoryRequest({
        body: {
          name: data.name,
          description: data.description,
        },
        id: data.id,
        loggedUserId: loggedUser?.id ?? '',
      });
      setLoading(false);
      setSuccess(true);
      handlePopUpClose();
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Usuario ou Categoria');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  return (
    <SimpleFormModal
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
      height={theme.spacing(67)}
      width={smDown ? '90%' : theme.spacing(80)}
    >
      <Box
        sx={{ mt: 2 }}
        component="form"
        onSubmit={handleSubmit(editCategory)}
      >
        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true, required: true }}
          disabled={true}
          error={!!errors.id}
          helperText={errors.id?.message}
          id="id"
          label="id"
          {...register('id')}
          autoComplete="id"
        />

        <TextField
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true, required: true }}
          error={!!errors.name}
          helperText={errors.name?.message}
          id="name"
          label="name"
          {...register('name')}
          defaultValue=""
          autoComplete="name"
        />

        <TextField
          margin="normal"
          fullWidth
          multiline
          rows={4}
          InputLabelProps={{ shrink: true, required: true }}
          error={!!errors.description}
          helperText={errors.description?.message}
          id="description"
          label="description"
          {...register('description')}
          autoComplete="description"
        />

        <FormButton
          loading={loading}
          success={success}
          buttonTitle="Editar Categoria"
        />
      </Box>
    </SimpleFormModal>
  );
};
