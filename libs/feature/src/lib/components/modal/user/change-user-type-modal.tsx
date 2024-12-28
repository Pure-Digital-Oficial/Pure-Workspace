import {
  Box,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useLoggedUser } from '../../../contexts';
import {
  ChangeUserTypeDto,
  ErrorResponse,
  userTypes,
} from '@pure-workspace/domain';
import { SimpleFormModal } from '../simple';
import { useForm } from 'react-hook-form';
import { useFindUserByIdData } from '../../../hooks';
import { ChangeUserTypeRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { FormButton } from '../../form';

interface ChangeUserTypeModalProps {
  open: boolean;
  title: string;
  idToChange: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  typeLabel?: string;
  successMessage?: string;
}

export const ChangeUserTypeModal: FC<ChangeUserTypeModalProps> = ({
  handlePopUpClose,
  showAlert,
  idToChange,
  open,
  title,
  typeLabel = 'Tipo de Usuário',
  successMessage = 'Tipo de Usuário Alterado com Sucesso!',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const hasLoadedUserData = useRef(false);
  const [typeList, setTypeList] = useState<userTypes[]>([]);
  const [type, setType] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { getUserByIdData, userById } = useFindUserByIdData({
    showAlert,
    loggedUserId: loggedUser?.id ?? '',
    UserId: idToChange,
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ type: string }>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      type: '',
    },
  });

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      getUserByIdData();
      if (userById?.userId) {
        mappedUserTypes(loggedUser?.type ?? '');
        setType(userById.type);
        hasLoadedUserData.current = true;
      }
    }
  }, [getUserByIdData, userById, loggedUser?.type]);

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

  const changeUserType = async (data: ChangeUserTypeDto) => {
    try {
      const result = await ChangeUserTypeRequest(data);
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

  const handleUserData = async (data: { type: string }) => {
    setSuccess(false);
    setLoading(true);
    const editedUser = await changeUserType({
      loggedUserId: loggedUser?.id ?? '',
      type: data.type as userTypes,
      userId: idToChange,
    });
    if (editedUser) {
      setSuccess(true);
      setLoading(false);
      showAlert(successMessage, true);
      handlePopUpClose();
      setSuccess(false);
    }
  };

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  return (
    <SimpleFormModal
      height="auto"
      width={smDown ? '90%' : theme.spacing(60)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box component="form" onSubmit={handleSubmit(handleUserData)}>
        <TextField
          select
          fullWidth
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

        <Box
          sx={{
            marginTop: '1rem',
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
