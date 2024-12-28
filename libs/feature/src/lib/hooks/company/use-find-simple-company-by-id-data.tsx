import { useState, useCallback } from 'react';
import { FindSimpleCompanyByIdRequest } from '../../services';
import { ErrorResponse, CompanySimpleResponseDto } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindSimpleCompanyByIdData {
  loggedUserId: string;
  companyId: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindSimpleCompanyByIdData = (
  companyData: FindSimpleCompanyByIdData
) => {
  const { showAlert, loggedUserId, companyId } = companyData;
  const [companyById, setCompanyById] = useState<CompanySimpleResponseDto>(
    {} as CompanySimpleResponseDto
  );

  const getSimpleCompanyData = useCallback(async () => {
    if (!loggedUserId) return;
    try {
      const result = await FindSimpleCompanyByIdRequest({
        loggedUserId,
        companyId,
      });
      if (result) {
        setCompanyById(result);
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
  }, [showAlert, companyId, loggedUserId]);

  return { companyById, getSimpleCompanyData };
};
