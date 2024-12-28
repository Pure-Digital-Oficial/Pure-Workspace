import { useState, useCallback } from 'react';
import { ListUsersByCompanyIdRequest } from '../../services';
import { ErrorResponse, UserList } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface ListUsersByCompanyIdDataProps {
  loggedUserId?: string;
  companyId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListUsersByCompanyIdData = (
  companyData: ListUsersByCompanyIdDataProps
) => {
  const { showAlert, loggedUserId, companyId } = companyData;
  const [listUsersByCompanyId, setListUsersByCompanyId] = useState<UserList[]>(
    []
  );
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListCompanyData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      if (!companyId) return;
      try {
        const result = await ListUsersByCompanyIdRequest({
          loggedUserId,
          companyId,
          filter: input || '',
          skip: skip ? (skip - 1) * 6 : 0,
        });
        if (result) {
          setListUsersByCompanyId(result.users);
          setTotalPage(result.totalPages);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Usuários da Empresa');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert, loggedUserId, companyId]
  );

  return { listUsersByCompanyId, totalPage, getListCompanyData };
};
