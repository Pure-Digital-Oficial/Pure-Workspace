import { useState, useCallback } from 'react';
import { FindSchedulesByDeviceIdRequest } from '../../services';
import {
  ErrorResponse,
  FindSchedulesByDeviceIdDto,
  Scheduling,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindSchedulesByDeviceIdProps {
  findSchedulesByDeviceIdDto: FindSchedulesByDeviceIdDto;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindSchedulesByDeviceIdData = (
  data: FindSchedulesByDeviceIdProps
) => {
  const { showAlert, findSchedulesByDeviceIdDto } = data;
  const [listSchedulesByDeviceId, setlistSchedulesByDeviceId] = useState<
    Scheduling[]
  >([]);

  const getListSchedulesByDeviceIdData = useCallback(async () => {
    try {
      const result = await FindSchedulesByDeviceIdRequest(
        findSchedulesByDeviceIdDto
      );
      if (result) {
        setlistSchedulesByDeviceId(result);
      }
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
  }, [showAlert, findSchedulesByDeviceIdDto]);

  return { listSchedulesByDeviceId, getListSchedulesByDeviceIdData };
};
