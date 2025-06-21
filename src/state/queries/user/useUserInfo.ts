import { getUserInfo } from '@/services/user';
import { UserInfo } from '@/services/user/type';
import { userQueryOptions } from '@/state/queryKeys';
import { useQuery } from '@tanstack/react-query';

export const useUserInfo = () => {
  return useQuery<UserInfo>({
    queryKey: userQueryOptions.info(),
    queryFn: getUserInfo,
    staleTime: 1000 * 60 * 5, // 5분
    retry: 1,
  });
};
