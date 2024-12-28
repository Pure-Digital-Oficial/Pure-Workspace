import { useState, useCallback } from 'react';
import { FindSchedulingByIdRequest } from '../../services';
import {
  ErrorResponse,
  FindSchedulingByIdDto,
  Scheduling,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface SchedulingByIdProps {
  findSchedulingByIdDto: FindSchedulingByIdDto;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindSchedulingByIdData = (data: SchedulingByIdProps) => {
  const { showAlert, findSchedulingByIdDto } = data;
  const [SchedulingById, setSchedulingById] = useState<Scheduling>(
    {} as Scheduling
  );

  const getSchedulingByIdData = useCallback(async () => {
    try {
      const result = await FindSchedulingByIdRequest(findSchedulingByIdDto);
      if (result) {
        setSchedulingById(result);
      }
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
  }, [showAlert, findSchedulingByIdDto]);

  return { SchedulingById, getSchedulingByIdData };
};
