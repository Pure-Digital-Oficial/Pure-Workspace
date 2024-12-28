import {
  Box,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';

import {
  ChangeProductStatusDto,
  ErrorResponse,
  GeneralStatus,
} from '@pure-workspace/domain';
import { useLoggedUser } from '../../../../contexts';
import { SimpleFormModal } from '../../simple';
import { GeneralStatusList, ValidationsError } from '../../../../shared';
import { FormButton } from '../../../form';
import { ChangeProductStatusRequest } from '../../../../services';

interface ChangeProductStatusModalProps {
  open: boolean;
  title: string;
  idToChange: string;
  status: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  statusLabel?: string;
  successMessage?: string;
}

export const ChangeProductStatusModal: FC<ChangeProductStatusModalProps> = ({
  handlePopUpClose,
  showAlert,
  idToChange,
  open,
  title,
  status,
  statusLabel = 'Status do Produto',
  successMessage = 'Tipo de Usuário Alterado com Sucesso!',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [newStatus, setNewStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const hasLoadedUserData = useRef(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ status: string }>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      status: '',
    },
  });

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      if (status) {
        setNewStatus(status);
        hasLoadedUserData.current = true;
      }
    }
  }, [status]);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const changeProductStatus = async (data: ChangeProductStatusDto) => {
    try {
      const result = await ChangeProductStatusRequest(data);
      return result;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Status do Produto');
        if (errors) {
          showAlert(errors, false);
        }
      }
      setLoading(false);
    }
  };

  const handleStatusData = async (data: { status: string }) => {
    setSuccess(false);
    setLoading(true);
    const changedProduct = await changeProductStatus({
      loggedUserId: loggedUser?.id ?? '',
      status: data.status as GeneralStatus,
      id: idToChange,
    });
    if (changedProduct) {
      setSuccess(true);
      setLoading(false);
      showAlert(successMessage, true);
      handlePopUpClose();
      setSuccess(false);
    }
  };

  return (
    <SimpleFormModal
      height="auto"
      width={smDown ? '90%' : theme.spacing(60)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box component="form" onSubmit={handleSubmit(handleStatusData)}>
        <TextField
          select
          fullWidth
          value={newStatus}
          margin="normal"
          error={!!errors.status}
          helperText={errors.status?.message}
          id="type"
          label={statusLabel}
          {...register('status', { onChange: handleChange(setNewStatus) })}
        >
          {GeneralStatusList.map((item) => (
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
