import { useState, useCallback } from 'react';
import { FindCompanyResponsibleByIdRequest } from '../../services';
import {
  ErrorResponse,
  CompanyResponsibleResponseDto,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindCompanyResponsibleByIdData {
  loggedUserId: string;
  companyResponsibleId: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindCompanyResponsibleByIdData = (
  companyResponsibleData: FindCompanyResponsibleByIdData
) => {
  const { showAlert, loggedUserId, companyResponsibleId } =
    companyResponsibleData;
  const [companyResponsibleById, setCompanyResponsibleById] =
    useState<CompanyResponsibleResponseDto>(
      {} as CompanyResponsibleResponseDto
    );

  const getCompanyResponsibleData = useCallback(async () => {
    if (!loggedUserId) return;
    if (!companyResponsibleId) return;
    try {
      const result = await FindCompanyResponsibleByIdRequest({
        loggedUserId,
        companyResponsibleId,
      });
      if (result) {
        setCompanyResponsibleById(result);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Reponsável pela Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  }, [showAlert, companyResponsibleById, loggedUserId]);

  return { companyResponsibleById, getCompanyResponsibleData };
};
