import { apiClient } from '@/services/api';
import { UserInfo } from '@/services/user/type';

// NOTE:임시 유저 정보 입니다. 추후 삭제 예정
export const getUserInfo = async () => {
  return apiClient.get('api/map/demo').json<UserInfo>();
};
