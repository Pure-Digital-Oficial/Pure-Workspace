import { FC, useCallback, useEffect, useState } from 'react';
import { useLoggedUser } from '../../../contexts';
import {
  Box,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import {
  AddSchedulesToDeviceDto,
  ErrorResponse,
  FindSchedulesByDeviceIdDto,
  ListSchedulesDto,
  Scheduling,
} from '@pure-workspace/domain';
import {
  AddSchedulesToDeviceRequest,
  FindSchedulesByDeviceIdRequest,
  ListSchedulesRequest,
} from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { SimpleFormModal } from '../simple';
import { ScrollBox } from '../../scroll';
import { FormButton } from '../../form';
import { EmptyListResponse } from '../../list';

interface AddSchedulesToDeviceModalProps {
  open: boolean;
  title: string;
  idDevice: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  schedulesTitle?: string;
  successMessage?: string;
}

export const AddSchedulesToDeviceModal: FC<AddSchedulesToDeviceModalProps> = ({
  handlePopUpClose,
  showAlert,
  title,
  open,
  idDevice,
  schedulesTitle = 'Selecione os Agendamentos',
  successMessage = 'Agendamentos Adicionada com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [dataLoaded, setDataLoaded] = useState(false);
  const [listSchedules, setListSchedules] = useState<Scheduling[]>([]);
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  const compareLists = (list1: Scheduling[], list2: Scheduling[]) => {
    return list2.filter((device) => !list1.some((p) => p.id === device.id));
  };

  const getSchedules = useCallback(
    async (input: ListSchedulesDto) => {
      try {
        const result = await ListSchedulesRequest(input);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Agendamento');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  const handleSchedulingToggle = (playlistId: string) => {
    const currentIndex = selectedSchedules.indexOf(playlistId);
    const newChecked = [...selectedSchedules];

    if (currentIndex === -1) {
      newChecked.push(playlistId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedSchedules(newChecked);
  };

  const addSchedulesToDevice = async (data: AddSchedulesToDeviceDto) => {
    try {
      const result = await AddSchedulesToDeviceRequest(data);

      if (result) {
        setLoading(false);
        setSuccess(true);
        showAlert(successMessage, true);
        handlePopUpClose();
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSuccess(false);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(
          axiosError,
          'Agendamento ou Dispositivo'
        );
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleAddSchedules = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setSuccess(false);
    setLoading(true);
    await addSchedulesToDevice({
      loggedUserId: loggedUser?.id ?? '',
      idDevice: idDevice,
      schedulesIds: selectedSchedules,
    });
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const result = await ListSchedulesRequest({
      companyId: loggedUser?.selectedCompany.id ?? '',
      loggedUserId: loggedUser?.id ?? '',
      filter: '',
      skip: (value - 1) * 5,
      take: 5,
    });

    if (result) {
      setListSchedules(result.schedules);
      setTotalPage(result.totalPages);
    }
  };

  const getSchedulesToDevice = useCallback(
    async (input: FindSchedulesByDeviceIdDto) => {
      try {
        const result = await FindSchedulesByDeviceIdRequest(input);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Agendamento');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  const getFilteredScheduling = useCallback(async () => {
    const allSchedules = await getSchedules({
      companyId: loggedUser?.selectedCompany.id ?? '',
      loggedUserId: loggedUser?.id ?? '',
      filter: '',
      take: 5,
    });
    const deviceInScheduling = await getSchedulesToDevice({
      idDevice: idDevice,
      loggedUserId: loggedUser?.id ?? '',
    });
    const mappedSchedules = compareLists(
      deviceInScheduling ?? [],
      allSchedules?.schedules ?? []
    );
    setListSchedules(mappedSchedules);
    setTotalPage(allSchedules?.totalPages ?? 1);
    setDataLoaded(true);
  }, [idDevice, getSchedulesToDevice, getSchedules, loggedUser]);

  useEffect(() => {
    if (open && idDevice && !dataLoaded) {
      getFilteredScheduling();
    }
  }, [open, idDevice, dataLoaded, getFilteredScheduling, loggedUser]);

  return (
    <SimpleFormModal
      height={smDown ? theme.spacing(73) : theme.spacing(72)}
      width={smDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box component="form" onSubmit={handleAddSchedules}>
        <Box>
          {listSchedules.length > 0 ? (
            <>
              <Typography mt={theme.spacing(0.5)} variant="h6">
                {schedulesTitle}
              </Typography>
              <ScrollBox>
                <List>
                  {listSchedules.map((scheduling) => (
                    <ListItem key={scheduling.id}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={
                            selectedSchedules.indexOf(scheduling.id) !== -1
                          }
                          onChange={() => handleSchedulingToggle(scheduling.id)}
                        />
                      </ListItemIcon>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <ListItemText primary={scheduling.name} />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </ScrollBox>
              <Box
                sx={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Pagination
                  count={totalPage}
                  color="primary"
                  onChange={handleChange}
                />
              </Box>
            </>
          ) : (
            <EmptyListResponse
              message="Sem Agendamentos"
              icon={
                <LocalHotelIcon
                  sx={{
                    fontSize: theme.spacing(10),
                  }}
                />
              }
            />
          )}
        </Box>
        <Box
          sx={{
            marginTop: theme.spacing(1),
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box width={smDown ? '95%' : '60%'}>
            <FormButton
              buttonTitle="Adicionar Agendamentos"
              loading={loading}
              success={success}
            />
          </Box>
        </Box>
      </Box>
    </SimpleFormModal>
  );
};
