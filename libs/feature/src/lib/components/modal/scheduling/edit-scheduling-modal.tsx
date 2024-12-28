import { zodResolver } from '@hookform/resolvers/zod';
import {
  EditSchedulingBodyDto,
  EditSchedulingDto,
  ErrorResponse,
  ComboBoxScheduling,
} from '@pure-workspace/domain';
import { useForm } from 'react-hook-form';
import {
  Priority,
  SchedulingBodySchema,
  TimeTypes,
  ValidationsError,
} from '../../../shared';
import { useLoggedUser } from '../../../contexts';
import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { EditSchedulingRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { SimpleFormModal } from '../simple';
import { FormButton } from '../../form';
import { useFindSchedulingByIdData } from '../../../hooks';

interface EditSchedulingModalProps {
  open: boolean;
  title: string;
  idToEdit: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  nameLabel?: string;
  successMessage?: string;
  startTimeLabel?: string;
  endTimeLabel?: string;
  loopingLabel?: string;
  priorityLabel?: string;
}

export const EditSchedulingModal: React.FC<EditSchedulingModalProps> = ({
  handlePopUpClose,
  showAlert,
  title,
  open,
  idToEdit,
  nameLabel = 'Nome',
  startTimeLabel = 'Tempo Inicial',
  endTimeLabel = 'Tempo Final',
  loopingLabel = 'Repetir',
  priorityLabel = 'Prioridade',
  successMessage = 'Agendamento Editado com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [timeGroup, setTimeGroup] = useState<ComboBoxScheduling>({
    startTime: '',
    endTime: '',
    priority: '0',
  });
  const [looping, setLooping] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditSchedulingBodyDto>({
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

  const { SchedulingById, getSchedulingByIdData } = useFindSchedulingByIdData({
    showAlert,
    findSchedulingByIdDto: {
      id: idToEdit,
      loggedUserId: loggedUser?.id ?? '',
    },
  });

  useEffect(() => {
    if (open && SchedulingById?.id) {
      reset({
        name: SchedulingById.name,
        endTime: SchedulingById.endTime,
        startTime: SchedulingById.startTime,
        priority: SchedulingById.priority,
      });
      setLooping(SchedulingById.lopping);

      setTimeGroup({
        endTime: SchedulingById.endTime,
        startTime: SchedulingById.startTime,
        priority: SchedulingById.priority,
      });
      setDataLoaded(true);
    }
  }, [open, SchedulingById, reset]);

  useEffect(() => {
    if (open && idToEdit && !dataLoaded) {
      getSchedulingByIdData();
    }
  }, [loggedUser, idToEdit, dataLoaded, open, getSchedulingByIdData]);

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  const editScheduling = async (input: EditSchedulingDto) => {
    try {
      const result = await EditSchedulingRequest(input);

      if (result) {
        setLoading(false);
        setSuccess(true);
        showAlert(successMessage, true);
        setSuccess(false);
        handlePopUpClose();
      }
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Agendamento');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleSchedulingData = async (data: EditSchedulingBodyDto) => {
    setLoading(true);
    setSuccess(false);
    editScheduling({
      body: {
        name: data.name,
        endTime: data.endTime,
        startTime: data.startTime,
        lopping: data.lopping,
        priority: data.priority,
      },
      id: idToEdit,
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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLooping(event.target.checked);
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
            control={<Checkbox checked={looping} onChange={handleChange} />}
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
          buttonTitle="Registrar"
          loading={loading}
          success={success}
        />
      </Box>
    </SimpleFormModal>
  );
};
