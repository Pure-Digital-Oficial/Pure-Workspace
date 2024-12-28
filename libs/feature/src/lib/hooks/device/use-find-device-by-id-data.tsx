import { useState, useCallback } from 'react';
import { FindDeviceByIdRequest } from '../../services';
import { ErrorResponse, Device, FindDeviceByIdDto } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindDeviceByIdDataProps {
  input: FindDeviceByIdDto;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindDeviceByIdData = (data: FindDeviceByIdDataProps) => {
  const {
    showAlert,
    input: { id, loggedUserId },
  } = data;
  const [deviceById, setDeviceById] = useState<Device>({} as Device);

  const getDeviceByIdData = useCallback(async () => {
    if (!loggedUserId) return;
    if (!id) return;
    try {
      const result = await FindDeviceByIdRequest({
        loggedUserId,
        id,
      });
      if (result) {
        setDeviceById(result);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Dispositivo');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  }, [showAlert, loggedUserId, id]);

  return { deviceById, getDeviceByIdData };
};
