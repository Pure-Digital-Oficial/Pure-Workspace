import { FC, useState } from 'react';
import { SimpleFormModal } from '../simple';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DeleteUserByIdRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { DeleteUserByIdDto, ErrorResponse } from '@pure-workspace/domain';
import { DeleteUserSchema, ValidationsError } from '../../../shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLoggedUser } from '../../../contexts';

interface DeleteUserModalProps {
  open: boolean;
  title: string;
  idToDelete: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  subTitle?: string;
  successMessage?: string;
  buttonNoTitle?: string;
  buttonYesTitle?: string;
}

export const DeleteUserModal: FC<DeleteUserModalProps> = ({
  handlePopUpClose,
  showAlert,
  open,
  title,
  successMessage = 'Usuário Deletado com Sucesso',
  idToDelete,
  buttonNoTitle = 'Não',
  buttonYesTitle = 'Sim',
  subTitle = 'Caso você deseje realmente deletar o usuário por favor indicar o motivo no campo a baixo:',
}) => {
  const [loading, setLoading] = useState(false);

  const theme = useTheme();
  const { loggedUser } = useLoggedUser();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ description: string }>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(DeleteUserSchema),
    defaultValues: {
      description: '',
    },
  });

  const deleteUser = async (request: DeleteUserByIdDto) => {
    try {
      const result = await DeleteUserByIdRequest(request);
      return result;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Usuario');
        if (errors) {
          showAlert(errors, false);
        }
      }
      setLoading(false);
    }
  };

  const handleData = async (data: { description: string }) => {
    setLoading(true);

    const dto: DeleteUserByIdDto = {
      loggedUser: loggedUser?.id ?? '',
      description: data.description,
      id: idToDelete ?? '',
    };
    await deleteUser(dto);
    setLoading(false);
    showAlert(successMessage, true);
    handlePopUpClose();
  };

  return (
    <SimpleFormModal
      height={smDown ? theme.spacing(55) : theme.spacing(62)}
      width={mdDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box
        component="form"
        sx={{
          width: '100%',
          height: theme.spacing(30),
          display: 'flex',
          justifyContent: 'center',
        }}
        onSubmit={handleSubmit(handleData)}
      >
        {loading && (
          <CircularProgress
            sx={{
              mt: theme.spacing(1),
              mb: theme.spacing(1),
              height: theme.spacing(8),
              color: '#fff',
              position: 'absolute',
            }}
          />
        )}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: smDown
                ? theme.spacing(35)
                : mdDown
                ? theme.spacing(40)
                : theme.spacing(55),
              alignSelf: 'center',
              marginTop: theme.spacing(2),
            }}
          >
            <Typography
              variant="body1"
              sx={{
                lineHeight: '1.5rem',
                fontWeight: 400,
                marginBottom: '4px',
              }}
            >
              {subTitle}
            </Typography>
          </Box>
          <TextField
            sx={{
              width: smDown
                ? theme.spacing(35)
                : mdDown
                ? theme.spacing(45)
                : theme.spacing(60),
            }}
            margin="normal"
            fullWidth
            multiline
            rows={smDown ? 4 : mdDown ? 5 : 6}
            error={!!errors.description}
            helperText={errors.description?.message}
            id="description"
            label="Descrição"
            {...register('description')}
            autoComplete="description"
          />
          <Box
            sx={{
              marginTop: '2rem',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              type="submit"
              sx={{
                width: theme.spacing(15),
                marginRight: theme.spacing(2),
              }}
              color="success"
              variant="contained"
            >
              {buttonYesTitle}
            </Button>
            <Button
              sx={{
                width: theme.spacing(15),
              }}
              onClick={handlePopUpClose}
              color="error"
              variant="contained"
            >
              {buttonNoTitle}
            </Button>
          </Box>
        </Box>
      </Box>
    </SimpleFormModal>
  );
};
