import { apiClient } from "@/services/api";
import { BookSpaceListParams, BookSpaceListResponse } from "./type";

export const getBookSpaceList = async (params: BookSpaceListParams) => {
  try {
    // 쿼리 파라미터로 변환
    const searchParams = {
      page: params.page.toString(),
      size: params.size.toString(),
      sort: params.sort,
    };

    const response = await apiClient
      .get("api/map/search", {
        searchParams,
      })
      .json<BookSpaceListResponse>();

    return response;
  } catch (error) {
    throw error;
  }
};
