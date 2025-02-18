import { useState, useCallback } from 'react';
import { ErrorResponse, PostResponseDto } from '@pure-workspace/domain';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { ListPostsRequest } from '../../../services';

interface UseListPostsDataProps {
  appId?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const useListPostsData = (postData: UseListPostsDataProps) => {
  const { showAlert, appId } = postData;
  const [listPosts, setListPosts] = useState<PostResponseDto[]>([]);
  const [totalPage, setTotalPage] = useState<number>(1);

  const getListPostsData = useCallback(
    async (input?: string, skip?: number) => {
      if (!appId) return;
      try {
        const result = await ListPostsRequest({
          appId,
          filter: input || '',
          skip: skip ? (skip - 1) * 6 : 0,
        });
        if (result) {
          setListPosts(result.posts);
          setTotalPage(result.totalPages);
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Posts');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert, appId]
  );

  return { listPosts, totalPage, getListPostsData };
};
