import { getBookSpaceList } from '@/services/bookspace/list';
import { BookSpaceListParams } from '@/services/bookspace/list/type';
import { bookSpaceQueryOptions } from '@/state/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useBookspaceList = (params: BookSpaceListParams) => {
  return useQuery({
    queryKey: bookSpaceQueryOptions.list(params),
    queryFn: () => getBookSpaceList(params),
  });
};
