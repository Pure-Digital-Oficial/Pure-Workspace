import { useState, useCallback } from 'react';
import { FindAllCompanyIdsRequest } from '../../services';
import {
  ErrorResponse,
  CompanyAllIdsResponseDto,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindAllCompanyIdsData {
  loggedUserId: string;
  companyId: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindAllCompanyIdsData = (
  companyData: FindAllCompanyIdsData
) => {
  const { showAlert, loggedUserId, companyId } = companyData;
  const [companyIds, setCompanyIds] = useState<CompanyAllIdsResponseDto>(
    {} as CompanyAllIdsResponseDto
  );

  const getCompanyIdsData = useCallback(async () => {
    if (!loggedUserId) return;
    try {
      const result = await FindAllCompanyIdsRequest({
        loggedUserId,
        companyId,
      });
      if (result) {
        setCompanyIds(result);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Empresa IDS');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  }, [showAlert, companyId, loggedUserId]);

  return { companyIds, getCompanyIdsData };
};
