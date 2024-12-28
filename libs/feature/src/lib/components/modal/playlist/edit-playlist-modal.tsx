import { FC, useEffect, useState } from 'react';
import { SimpleFormModal } from '../simple';
import {
  Box,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormButton } from '../../form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditPlaylistDto,
  ErrorResponse,
  PlaylistBodyDto,
} from '@pure-workspace/domain';
import { PlaylistSchema, ValidationsError } from '../../../shared';
import { useLoggedUser } from '../../../contexts';
import { EditPlaylistRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import {
  useFindPlaylistByIdData,
  useListPlaylistCategoryData,
} from '../../../hooks';

interface EditPlaylistModalProps {
  idToEdit: string;
  open: boolean;
  title: string;
  companyId: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  successMessage?: string;
}

export const EditPlaylistModal: FC<EditPlaylistModalProps> = ({
  idToEdit,
  open,
  title,
  companyId,
  handlePopUpClose,
  showAlert,
  nameLabel = 'Nome',
  successMessage = 'Playlist Editada com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<PlaylistBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(PlaylistSchema),
    defaultValues: {
      name: '',
      playlistCategoryId: '',
    },
  });

  const { listPlaylistCategory, getPlaylistCategoryData } =
    useListPlaylistCategoryData({
      showAlert,
      loggedUserId: loggedUser?.id ?? '',
      companyId: loggedUser?.selectedCompany.id ?? '',
    });

  const { getPlaylistByIdData, playlistById } = useFindPlaylistByIdData({
    showAlert,
    loggedUserId: loggedUser?.id ?? '',
    playlistId: idToEdit,
  });

  useEffect(() => {
    if (open && playlistById?.id) {
      reset({
        name: playlistById.name,
      });
      setCategoryId(playlistById.category.id);
      setDataLoaded(true);
    }
  }, [open, playlistById, reset]);

  useEffect(() => {
    if (open && idToEdit && !dataLoaded) {
      getPlaylistCategoryData();
      getPlaylistByIdData();
    }
  }, [
    loggedUser,
    idToEdit,
    dataLoaded,
    open,
    getPlaylistCategoryData,
    getPlaylistByIdData,
  ]);

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  const editPlaylist = async (input: EditPlaylistDto) => {
    try {
      await EditPlaylistRequest(input);
      setLoading(false);
      setSuccess(true);
      showAlert(successMessage, true);
      setSuccess(false);
      handlePopUpClose();
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Category');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handlePlaylistData = async (data: PlaylistBodyDto) => {
    setLoading(true);
    setSuccess(false);
    editPlaylist({
      body: {
        name: data.name,
        playlistCategoryId: categoryId,
      },
      id: idToEdit,
      loggedUserId: loggedUser?.id ?? '',
    });
  };

  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryId(event.target.value);
  };

  return (
    <SimpleFormModal
      height={smDown ? theme.spacing(55) : theme.spacing(53)}
      width={smDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box
        sx={{ mt: 2 }}
        component="form"
        onSubmit={handleSubmit(handlePlaylistData)}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          InputLabelProps={{ shrink: true, required: true }}
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
          select
          fullWidth
          value={categoryId}
          margin="normal"
          error={!!errors.playlistCategoryId}
          helperText={errors.playlistCategoryId?.message}
          id="playlistCategoryId"
          label="Categoria"
          {...register('playlistCategoryId', {
            onChange: handleChangeCategory,
          })}
        >
          {listPlaylistCategory.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </TextField>

        <FormButton
          buttonTitle="Registrar"
          loading={loading}
          success={success}
        />
      </Box>
    </SimpleFormModal>
  );
};
