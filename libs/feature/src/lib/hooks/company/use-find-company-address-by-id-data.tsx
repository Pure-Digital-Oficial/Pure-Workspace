import { useState, useCallback } from 'react';
import {
  FindCompanyAddressByIdRequest,
  FindCompanyDataByIdRequest,
} from '../../services';
import {
  ErrorResponse,
  CompanyDataResponseDto,
  CompanyAddressResponseDto,
} from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindCompanyAdressByIdData {
  loggedUserId: string;
  companyAddressId: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindCompanyAdressByIdData = (
  companyAddress: FindCompanyAdressByIdData
) => {
  const { showAlert, loggedUserId, companyAddressId } = companyAddress;
  const [companyAddressById, setCompanyAddressById] =
    useState<CompanyAddressResponseDto>({} as CompanyAddressResponseDto);

  const getCompanyAddress = useCallback(async () => {
    if (!loggedUserId) return;
    if (!companyAddressId) return;
    try {
      const result = await FindCompanyAddressByIdRequest({
        loggedUserId,
        companyAddressId,
      });
      if (result) {
        setCompanyAddressById(result);
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Endereço da Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  }, [showAlert, companyAddressById, loggedUserId]);

  return { companyAddressById, getCompanyAddress };
};
