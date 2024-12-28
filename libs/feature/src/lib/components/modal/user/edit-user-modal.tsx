import { FC, useEffect, useState } from 'react';
import { useLoggedUser } from '../../../contexts';
import {
  BodyUserDto,
  ErrorResponse,
  GeneralStatus,
  userTypes,
} from '@pure-workspace/domain';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { EditUserSchema, ValidationsError } from '../../../shared';
import { EditUserRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { SimpleFormModal } from '../simple';
import {
  Box,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FormButton } from '../../form';
import { useFindUserByIdData } from '../../../hooks';

interface EditUserModalProps {
  open: boolean;
  title: string;
  idToEdit: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  successMessage?: string;
  statusLabel?: string;
  birthDateLabel?: string;
  typeLabel?: string;
}

export const EditUserModal: FC<EditUserModalProps> = ({
  handlePopUpClose,
  showAlert,
  title,
  open,
  idToEdit,
  nameLabel = 'Nome',
  statusLabel = 'Status',
  birthDateLabel = 'Data de Nascimento',
  successMessage = 'Usuário Editado com Sucesso',
  typeLabel = 'Tipo do Usuário',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const [dataLoaded, setDataLoaded] = useState(false);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [typeList, setTypeList] = useState<string[]>([]);
  const [type, setType] = useState<string>('');

  const { getUserByIdData, userById } = useFindUserByIdData({
    showAlert,
    loggedUserId: loggedUser?.id ?? '',
    UserId: idToEdit,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<BodyUserDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: '',
      id: '',
      birthDate: new Date(),
      type: '',
    },
  });

  useEffect(() => {
    if (open && userById?.userId) {
      const formattedBirthDate = userById.birthDate
        ? new Date(userById.birthDate).toISOString().split('T')[0]
        : new Date();
      reset({
        id: userById.userId,
        name: userById.name,
        birthDate: formattedBirthDate as Date,
        type: userById.type,
      });
      setDataLoaded(true);
      setType(userById.type);
      setStatus(userById.status);
      setDataLoaded(true);
    }
  }, [open, userById, reset]);

  useEffect(() => {
    if (open && idToEdit && !dataLoaded) {
      getUserByIdData();
      mappedUserTypes(loggedUser?.type ?? '');
    }
  }, [loggedUser, idToEdit, dataLoaded, open, getUserByIdData]);

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  const mappedUserTypes = (type: string) => {
    const list: userTypes[] = ['DEFAULT', 'DEFAULT_ADMIN'];
    switch (type) {
      case 'ADMIN':
        list.push('ADMIN');
        setTypeList(list);
        break;
      case 'DEFAULT_ADMIN':
        list.filter((item) => item !== 'ADMIN');
        setTypeList(list);
        break;
    }
  };

  const editUser = async (request: BodyUserDto) => {
    try {
      const result = await EditUserRequest({
        body: {
          ...request,
          id: idToEdit,
          type: type,
          status: status as GeneralStatus,
        },
        loggedUserId: loggedUser?.id ?? '',
      });
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

  const handleUserData = async (data: BodyUserDto) => {
    setSuccess(false);
    setLoading(true);
    const editedUser = await editUser(data);
    if (editedUser) {
      setSuccess(true);
      setLoading(false);
      showAlert(successMessage, true);
      handlePopUpClose();
      setSuccess(false);
    }
  };

  const statusList = ['ACTIVE', 'INACTIVE'];

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  return (
    <SimpleFormModal
      height={smDown ? theme.spacing(65) : theme.spacing(70)}
      width={smDown ? '90%' : theme.spacing(100)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box component="form" onSubmit={handleSubmit(handleUserData)}>
        <TextField
          sx={{
            width: smDown
              ? '100%'
              : mdDown
              ? theme.spacing(45)
              : theme.spacing(50),
          }}
          margin="normal"
          InputLabelProps={{ shrink: true, required: true }}
          disabled={true}
          error={!!errors.id}
          helperText={errors.id?.message}
          id="id"
          label="id"
          {...register('id')}
          autoComplete="id"
        />
        <Box display="flex" justifyContent="space-between">
          <TextField
            sx={{
              width: '45%',
            }}
            select
            value={type}
            margin="normal"
            error={!!errors.type}
            helperText={errors.type?.message}
            id="type"
            label={typeLabel}
            {...register('type', { onChange: handleChange(setType) })}
          >
            {typeList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            sx={{
              width: '45%',
            }}
            select
            value={status}
            margin="normal"
            error={!!errors.status}
            helperText={errors.status?.message}
            id="status"
            label={statusLabel}
            {...register('status', { onChange: handleChange(setStatus) })}
          >
            {statusList.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <TextField
          margin="normal"
          InputLabelProps={{ shrink: true, required: true }}
          disabled={loading}
          fullWidth
          error={!!errors.name}
          helperText={errors.name?.message}
          id="name"
          label={nameLabel}
          {...register('name')}
          autoComplete="name"
        />
        <TextField
          margin="normal"
          type="date"
          disabled={loading}
          error={!!errors?.birthDate}
          helperText={errors.birthDate?.message}
          InputLabelProps={{ shrink: true, required: true }}
          label={birthDateLabel}
          id="birthDate"
          fullWidth
          {...register('birthDate')}
        />
        <Box
          sx={{
            marginTop: mdDown ? '1rem' : '2rem',
          }}
        >
          <FormButton
            buttonTitle={loading ? 'Salvando...' : 'Salvar Alteração'}
            loading={loading}
            success={success}
          />
        </Box>
      </Box>
    </SimpleFormModal>
  );
};
