import {
  BookSpaceListRegisterParams,
  BookSpaceListRegisterResponse,
} from '@/services/bookspace/list/type';
import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/services/api';

export const useRegisterList = () => {
  return useMutation({
    mutationFn: async (
      data: BookSpaceListRegisterParams,
    ): Promise<BookSpaceListRegisterResponse> => {
      const response = await apiClient
        .patch('api/map/serch', {
          json: data,
        })
        .json<BookSpaceListRegisterResponse>();

      return response;
    },
  });
};
