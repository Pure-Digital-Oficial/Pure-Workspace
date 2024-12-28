import { useState, useCallback } from 'react';
import { ListCompaniesByUserIdRequest } from '../../services';
import {
  ListSimpleCompanyResponseDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface useListCompaniesByUserIdDataProps {
  loggedUserId?: string;
  userId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListCompaniesByUserIdData = (
  companyData: useListCompaniesByUserIdDataProps
) => {
  const { showAlert, loggedUserId, userId } = companyData;
  const [listCompaniesByUser, setListCompaniesByUser] = useState<
    ListSimpleCompanyResponseDto[]
  >([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListCompaniesByUserData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      if (!userId) return;
      try {
        const result = await ListCompaniesByUserIdRequest({
          loggedUserId,
          userId,
          filter: input || '',
          skip: skip ? (skip - 1) * 6 : 0,
        });
        if (result) {
          setListCompaniesByUser(result.companies);
          setTotalPage(result.totalPages);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Empresa');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert, loggedUserId, userId]
  );

  return { listCompaniesByUser, totalPage, getListCompaniesByUserData };
};
