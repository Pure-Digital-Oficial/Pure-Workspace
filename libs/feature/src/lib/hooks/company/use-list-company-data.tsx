import { useState, useCallback } from 'react';
import { ListCompanyRequest } from '../../services';
import {
  ListSimpleCompanyResponseDto,
  ErrorResponse,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface ListCompanyDataProps {
  loggedUserId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListCompanyData = (companyData: ListCompanyDataProps) => {
  const { showAlert, loggedUserId } = companyData;
  const [listCompany, setListCompany] = useState<
    ListSimpleCompanyResponseDto[]
  >([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListCompanyData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      try {
        const result = await ListCompanyRequest({
          loggedUserId,
          filter: input || '',
          skip: skip ? (skip - 1) * 6 : 0,
        });
        if (result) {
          setListCompany(result.companies);
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
    [showAlert, loggedUserId]
  );

  return { listCompany, totalPage, getListCompanyData };
};
