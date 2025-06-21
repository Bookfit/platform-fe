import { createBookspaceMain } from '@/services/bookspace';
import { CreateBookspaceMainRequest } from '@/services/bookspace/type';
import { bookSpaceQueryOptions } from '@/state/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateBookspaceMain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookspaceMainRequest) => createBookspaceMain(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({
        queryKey: bookSpaceQueryOptions.createMain(),
      });
    },
    onError: (error) => {
      console.error('❌ 북스페이스 생성 실패:', error);
    },
  });
};
