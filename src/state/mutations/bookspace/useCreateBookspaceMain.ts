import { createBookspaceMain } from '@/services/bookspace';
import { CreateBookspaceMainRequest } from '@/services/bookspace/type';
import { bookSpaceQueryOptions } from '@/state/queryKeys';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateBookspaceMain = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBookspaceMainRequest) => {
      console.log('📤 북스페이스 생성 요청 데이터:', data);
      return createBookspaceMain(data);
    },
    onSuccess: (response) => {
      console.log('✅ 북스페이스 생성 성공:', response);
      // 북스페이스 생성 후 관련 쿼리들을 무효화
      queryClient.invalidateQueries({
        queryKey: bookSpaceQueryOptions.createMain(),
      });
    },
    onError: (error) => {
      console.error('❌ 북스페이스 생성 실패:', error);
    },
  });
};
