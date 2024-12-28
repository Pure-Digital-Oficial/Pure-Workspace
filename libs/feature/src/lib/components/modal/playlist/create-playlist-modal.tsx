import {
  Box,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { SimpleFormModal } from '../simple';
import { PlaylistSchema, ValidationsError } from '../../../shared';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormButton } from '../../form';
import { useLoggedUser } from '../../../contexts';
import {
  CreatePlaylistDto,
  ErrorResponse,
  ListPlaylistCategoryDto,
  PlaylistBodyDto,
  PlaylistCategory,
} from '@pure-workspace/domain';
import {
  CreatePlaylistRequest,
  ListPlaylistCategoryRequest,
} from '../../../services';
import axios, { AxiosError } from 'axios';

interface CreatePlaylistModalProps {
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  successMessage?: string;
}

export const CreatePlaylistModal: FC<CreatePlaylistModalProps> = ({
  handlePopUpClose,
  showAlert,
  title,
  open,
  nameLabel = 'Nome',
  successMessage = 'Playlist Cadastrada com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [categories, setCategories] = useState<PlaylistCategory[]>([]);
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

  const getCategories = useCallback(
    async (input: ListPlaylistCategoryDto) => {
      try {
        const result = await ListPlaylistCategoryRequest(input);
        setCategories(result.categories);
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Category');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  const createPlaylist = async (data: CreatePlaylistDto) => {
    try {
      const result = await CreatePlaylistRequest(data);

      if (result) {
        setSuccess(true);
        setLoading(false);
        showAlert(successMessage, true);

        setSuccess(false);
        reset({
          name: '',
          playlistCategoryId: '',
        });
        setCategoryId('');
        handlePopUpClose();
      }
    } catch (error) {
      setSuccess(false);
      setLoading(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Playlist');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  useEffect(() => {
    getCategories({
      companyId: loggedUser?.selectedCompany.id ?? '',
      loggedUserId: loggedUser?.id ?? '',
      userInput: '',
    });
  }, [loggedUser, getCategories]);

  const handlePlaylistData = async (data: PlaylistBodyDto) => {
    setLoading(true);
    await createPlaylist({
      loggedUserId: loggedUser?.id ?? '',
      name: data.name,
      playlistCategoryId: categoryId,
      companyId: loggedUser?.selectedCompany.id ?? '',
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
          {categories.map((item) => (
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
