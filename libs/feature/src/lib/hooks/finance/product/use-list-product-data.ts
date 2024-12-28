import { useState, useCallback } from 'react';
import { ErrorResponse, ProductResponseDto } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { ListProductRequest } from '../../../services';

interface ListProductDataProps {
  loggedUserId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListProductData = (data: ListProductDataProps) => {
  const { showAlert, loggedUserId } = data;
  const [listProduct, setListProduct] = useState<ProductResponseDto[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListProductData = useCallback(
    async (input?: string, skip?: number) => {
      if (!loggedUserId) return;
      try {
        const result = await ListProductRequest({
          loggedUserId,
          skip: skip ? (skip - 1) * 6 : 0,
          filter: input || '',
        });
        if (result) {
          setListProduct(result.products);
          setTotalPage(result.totalPages);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Produtos');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert, loggedUserId]
  );

  return { listProduct, totalPage, getListProductData };
};
