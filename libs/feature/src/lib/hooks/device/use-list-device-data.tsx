import { useState, useCallback } from 'react';
import { ListDeviceRequest } from '../../services';
import { ErrorResponse, Device } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface ListDeviceDataProps {
  companyId?: string;
  loggedUserId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListDeviceData = (data: ListDeviceDataProps) => {
  const { showAlert, loggedUserId, companyId } = data;
  const [listDevice, setListDevice] = useState<Device[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListDeviceData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      if (!companyId) return;
      try {
        const result = await ListDeviceRequest({
          loggedUserId,
          companyId,
          skip: skip ? (skip - 1) * 6 : 0,
          filter: input || '',
        });
        if (result) {
          setListDevice(result.devices);
          setTotalPage(result.totalPages);
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
    },
    [showAlert, loggedUserId, companyId]
  );

  return { listDevice, totalPage, getListDeviceData };
};
