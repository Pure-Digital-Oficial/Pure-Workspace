import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  DeleteUserSchema,
  EntityNotEmpty,
  EntityNotExist,
  NotPermission,
} from '../../../shared';
import { DeleteUserByIdDto, ErrorResponse } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { DeleteUserByIdRequest, getItemLocalStorage } from '../../../services';

interface FormDeleteUserProps {
  cancelAction: () => void;
  buttonNoTitle?: string;
  buttonYesTitle?: string;
  showAlert?: (message: string) => void;
}

export const FormDeleteUser: FC<FormDeleteUserProps> = ({
  cancelAction,
  showAlert,
  buttonNoTitle = 'Não',
  buttonYesTitle = 'Sim',
}) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const theme = useTheme();
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
      console.error((error as { message: string }).message);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response?.data.error.name === 'EntityNotEmpty') {
          const message = EntityNotEmpty('id', 'PT-BR');
          showAlert?.(message);
        }

        if (axiosError.response?.data.error.name === 'EntityNotExists') {
          const message = EntityNotExist('usuário', 'PT-BR');
          showAlert?.(message);
        }

        if (axiosError.response?.data.error.name === 'NotPermissionError') {
          const message = NotPermission('PT-BR');
          showAlert?.(message);
        }
      }
      setLoading(false);
    }
  };

  const handleData = async (data: { description: string }) => {
    setSuccess(false);
    setLoading(true);
    const loggedUser: string = getItemLocalStorage('ui');
    const userId: string = getItemLocalStorage('du');
    const dto: DeleteUserByIdDto = {
      loggedUser: loggedUser ?? '',
      description: data.description,
      id: userId ?? '',
    };
    await deleteUser(dto);
    setSuccess(true);
    setLoading(false);
    cancelAction?.();
  };

  return (
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
            marginTop: smDown ? '2rem' : mdDown ? '1rem' : 'auto',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            sx={{
              width: theme.spacing(15),
              marginRight: theme.spacing(2),
            }}
            onClick={cancelAction}
            color="error"
            variant="contained"
          >
            {buttonNoTitle}
          </Button>
          <Button
            type="submit"
            sx={{
              width: theme.spacing(15),
            }}
            color="success"
            variant="contained"
          >
            {buttonYesTitle}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
