import { FC, useState } from 'react';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { ComboBoxListResult, ErrorResponse } from '@pure-workspace/domain';
import { MoveSchedulesToAnotherDeviceRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { SimpleFormModal } from '../simple';
import { SearchComboBox } from '../../input';
import { useListDeviceData } from '../../../hooks';

interface MoveSchedulesToAnotherDeviceModalProps {
  selectedSchedules: string[];
  oldDeviceId: string;
  open: boolean;
  onClose: () => void;
  title: string;
  showAlert: (message: string, success: boolean) => void;
  buttonTitle?: string;
  loggedUserId: string;
  companyId: string;
}

export const MoveSchedulesToAnotherDeviceModal: FC<
  MoveSchedulesToAnotherDeviceModalProps
> = ({
  selectedSchedules,
  oldDeviceId,
  companyId,
  onClose,
  open,
  title,
  showAlert,
  buttonTitle = 'Mover Agendamentos',
  loggedUserId,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [comboBoxListResult, setComboBoxListResult] =
    useState<ComboBoxListResult | null>(null);

  const { listDevice, getListDeviceData } = useListDeviceData({
    showAlert,
    loggedUserId,
    companyId,
  });

  const handleList = async (
    searchTerm: string,
    page: number,
    pageSize: number
  ) => {
    await getListDeviceData(searchTerm ?? '', page);

    return (
      listDevice.map((device) => {
        return {
          id: device.id,
          key: device.name,
        };
      }) ?? []
    );
  };

  const getResult = (item: ComboBoxListResult | null) => {
    setComboBoxListResult(item);
  };

  const moveSchedules = async () => {
    try {
      await MoveSchedulesToAnotherDeviceRequest({
        schedulesIds: selectedSchedules,
        loggedUserId: loggedUserId,
        oldDeviceId: oldDeviceId,
        newDeviceId: comboBoxListResult?.id ?? '',
      });

      showAlert('Agendamentos movidos com sucesso', true);
      onClose();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Agendamentos');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  return (
    <SimpleFormModal
      height={smDown ? theme.spacing(55) : theme.spacing(36)}
      width={smDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={onClose}
      title={title}
    >
      <Box>
        <SearchComboBox
          onList={handleList}
          onItemSelected={getResult}
          pageSize={6}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: theme.spacing(2),
        }}
      >
        <Button variant="contained" onClick={moveSchedules}>
          {buttonTitle}
        </Button>
      </Box>
    </SimpleFormModal>
  );
};
