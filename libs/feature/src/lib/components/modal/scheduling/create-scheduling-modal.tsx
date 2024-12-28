import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useLoggedUser } from '../../../contexts';
import { FC, useState } from 'react';
import { SimpleFormModal } from '../simple';
import { useForm } from 'react-hook-form';
import {
  CreateSchedulingBodyDto,
  CreateSchedulingDto,
  ErrorResponse,
  ComboBoxScheduling,
} from '@pure-workspace/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  SchedulingBodySchema,
  Priority,
  TimeTypes,
  ValidationsError,
} from '../../../shared';
import axios, { AxiosError } from 'axios';
import { FormButton } from '../../form';
import { CreateSchedulingRequest } from '../../../services';

interface CreateSchedulingModalProps {
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  successMessage?: string;
  startTimeLabel?: string;
  endTimeLabel?: string;
  loopingLabel?: string;
  priorityLabel?: string;
}

export const CreateSchedulingModal: FC<CreateSchedulingModalProps> = ({
  handlePopUpClose,
  showAlert,
  title,
  open,
  nameLabel = 'Nome',
  startTimeLabel = 'Tempo Inicial',
  endTimeLabel = 'Tempo Final',
  loopingLabel = 'Repetir',
  priorityLabel = 'Prioridade',
  successMessage = 'Agendamento Cadastrada com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [timeGroup, setTimeGroup] = useState<ComboBoxScheduling>({
    startTime: '',
    endTime: '',
    priority: '0',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm<CreateSchedulingBodyDto>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: zodResolver(SchedulingBodySchema),
    defaultValues: {
      name: '',
      endTime: '',
      startTime: '',
      lopping: false,
      priority: '0',
    },
  });

  const createScheduling = async (input: CreateSchedulingDto) => {
    try {
      const result = await CreateSchedulingRequest(input);
      if (result) {
        setSuccess(true);
        setLoading(false);
        showAlert(successMessage, true);

        setSuccess(false);
        reset({
          name: '',
          endTime: '',
          startTime: '',
          lopping: false,
          priority: '0',
        });
        setTimeGroup({
          startTime: '',
          endTime: '',
          priority: '0',
        });
        handlePopUpClose();
      }
    } catch (error) {
      console.error(error);
      setSuccess(false);
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Agendamento');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleSchedulingData = async (data: CreateSchedulingBodyDto) => {
    setLoading(true);
    await createScheduling({
      body: data,
      companyId: loggedUser?.selectedCompany.id ?? '',
      loggedUserId: loggedUser?.id ?? '',
    });
  };

  const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setTimeGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <SimpleFormModal
      height={smDown ? theme.spacing(55) : theme.spacing(62)}
      width={smDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box
        sx={{ mt: 2 }}
        component="form"
        onSubmit={handleSubmit(handleSchedulingData)}
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

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            select
            sx={{
              width: '48%',
            }}
            required
            value={timeGroup.startTime}
            margin="normal"
            error={!!errors.startTime}
            helperText={errors.startTime?.message}
            id="startTime"
            label={startTimeLabel}
            {...register('startTime')}
            onChange={handleChangeTime}
          >
            {TimeTypes.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            sx={{
              width: '48%',
            }}
            required
            value={timeGroup.endTime}
            margin="normal"
            error={!!errors.endTime}
            helperText={errors.endTime?.message}
            id="endTime"
            label={endTimeLabel}
            {...register('endTime')}
            onChange={handleChangeTime}
          >
            {TimeTypes.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControlLabel
            control={<Checkbox />}
            label={loopingLabel}
            id="lopping"
            {...register('lopping')}
          />
          <TextField
            select
            sx={{
              width: '48%',
            }}
            required
            value={timeGroup.priority}
            margin="normal"
            error={!!errors.priority}
            helperText={errors.priority?.message}
            id="priority"
            label={priorityLabel}
            {...register('priority')}
            onChange={handleChangeTime}
          >
            {Priority.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <FormButton
          buttonTitle="Cadastrar"
          loading={loading}
          success={success}
        />
      </Box>
    </SimpleFormModal>
  );
};
