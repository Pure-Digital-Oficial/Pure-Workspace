import { useState, useCallback } from 'react';
import { ListSchedulesRequest } from '../../services';
import { ErrorResponse, Scheduling } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface ListSchedulesDataProps {
  companyId?: string;
  loggedUserId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListSchedulesData = (data: ListSchedulesDataProps) => {
  const { showAlert, loggedUserId, companyId } = data;
  const [listSchedules, setListSchedules] = useState<Scheduling[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListSchedulesData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      if (!companyId) return;
      try {
        const result = await ListSchedulesRequest({
          loggedUserId,
          companyId,
          skip: skip ? (skip - 1) * 8 : 0,
          filter: input || '',
        });
        if (result) {
          setListSchedules(result.schedules);
          setTotalPage(result.totalPages);
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
    },
    [showAlert, loggedUserId, companyId]
  );

  return { listSchedules, totalPage, getListSchedulesData };
};
