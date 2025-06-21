import { apiClient } from '@/services/api';
import {
  CategoryResponse,
  BookspaceMainResponse,
  CreateBookspaceMainRequest,
  CreateBookspaceMainResponse,
} from '@/services/bookspace/type';

export const getCategories = async () => {
  return apiClient.get('api/map/details/meta').json<CategoryResponse>();
};

export const getBookspaceMain = async () => {
  return apiClient.get('api/map/main').json<BookspaceMainResponse>();
};

export const createBookspaceMain = async (data: CreateBookspaceMainRequest) => {
  console.log('🌐 API 호출 시작 - createBookspace:', {
    url: 'api/map/main',
    data: data,
  });

  try {
    const response = await apiClient
      .post('api/map/main', { json: data })
      .json<CreateBookspaceMainResponse>();

    console.log('🌐 API 호출 성공 - createBookspace:', response);
    return response;
  } catch (error) {
    console.error('🌐 API 호출 실패 - createBookspace:', error);
    throw error;
  }
};
