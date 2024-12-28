import { useState, useCallback } from 'react';
import { FindUnauthorizedUsersByCompanyIdRequest } from '../../services';
import { ErrorResponse, UserList } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindUnauthorizedUsersByCompanyIdData {
  loggedUserId?: string;
  companyId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindUnauthorizedUsersByCompanyIdData = (
  companyData: FindUnauthorizedUsersByCompanyIdData
) => {
  const { showAlert, loggedUserId, companyId } = companyData;
  const [userList, setUserList] = useState<UserList[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);

  const getUnauthorizedUsersByCompanyIdData = useCallback(async () => {
    if (!loggedUserId) return;
    if (!companyId) return;
    try {
      const result = await FindUnauthorizedUsersByCompanyIdRequest({
        loggedUserId,
        companyId,
      });
      if (result) {
        setUserList(result.listUsers);
        setTotalUsers(result.total);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Usuários');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  }, [showAlert, companyId, loggedUserId]);

  return { userList, totalUsers, getUnauthorizedUsersByCompanyIdData };
};
