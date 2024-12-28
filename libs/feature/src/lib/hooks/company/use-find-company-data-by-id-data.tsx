import { useState, useCallback } from 'react';
import { FindCompanyDataByIdRequest } from '../../services';
import { ErrorResponse, CompanyDataResponseDto } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindCompanyDataByIdData {
  loggedUserId: string;
  companyDataId: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindCompanyDataByIdData = (
  companyData: FindCompanyDataByIdData
) => {
  const { showAlert, loggedUserId, companyDataId } = companyData;
  const [companyDataById, setCompanyDataById] =
    useState<CompanyDataResponseDto>({} as CompanyDataResponseDto);

  const getCompanyData = useCallback(async () => {
    if (!loggedUserId) return;
    try {
      const result = await FindCompanyDataByIdRequest({
        loggedUserId,
        companyDataId,
      });
      if (result) {
        setCompanyDataById(result);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Dados da Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  }, [showAlert, companyDataById, loggedUserId]);

  return { companyDataById, getCompanyData };
};
