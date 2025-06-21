import { getBookspaceMain } from '@/services/bookspace';
import { BookspaceMainResponse } from '@/services/bookspace/type';
import { bookSpaceQueryOptions } from '@/state/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useBookspaceMain = () => {
  return useQuery<BookspaceMainResponse>({
    queryKey: bookSpaceQueryOptions.main(),
    queryFn: getBookspaceMain,
  });
};
