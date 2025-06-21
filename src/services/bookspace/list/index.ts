import { apiClient } from '@/services/api';
import { BookSpaceListParams, BookSpaceListResponse } from './type';

export const getBookSpaceList = async (params: BookSpaceListParams) => {
  console.log('🔍 getBookSpaceList 호출됨');
  console.log('📤 요청 파라미터:', params);
  console.log('🌐 API URL:', process.env.NEXT_PUBLIC_API_URL);

  try {
    // 쿼리 파라미터로 변환
    const searchParams = {
      page: params.page.toString(),
      size: params.size.toString(),
      sort: params.sort,
    };

    const response = await apiClient
      .get('api/map/search', {
        searchParams,
      })
      .json<BookSpaceListResponse>();

    console.log('✅ API 응답 성공:', response);
    return response;
  } catch (error) {
    console.error('❌ API 호출 실패:', error);
    throw error;
  }
};
