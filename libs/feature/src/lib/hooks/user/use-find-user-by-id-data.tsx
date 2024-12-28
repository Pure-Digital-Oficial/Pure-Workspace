import { useState, useCallback } from 'react';
import { FindUserRequest } from '../../services';
import { ErrorResponse, UserList } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';

interface FindUserByIdDataProps {
  UserId?: string;
  loggedUserId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useFindUserByIdData = (data: FindUserByIdDataProps) => {
  const { showAlert, loggedUserId, UserId } = data;
  const [userById, setUserById] = useState<UserList>({} as UserList);

  const getUserByIdData = useCallback(async () => {
    if (!loggedUserId) return;
    if (!UserId) return;
    try {
      const result = await FindUserRequest({
        id: UserId,
        loggedUserId,
      });
      if (result) {
        setUserById(result);
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
  }, [showAlert, loggedUserId, UserId]);

  return { userById, getUserByIdData };
};
