import { apiClient } from "@/services/api";
import {
  BookSpaceDetailRequest,
  CategoryResponse,
} from "@/services/bookspace/detail/type";

export const getCategories = async () => {
  return apiClient.get("api/map/details/meta").json<CategoryResponse>();
};

export const createDetailBookSpace = async (data: BookSpaceDetailRequest) => {
  return apiClient.post("api/map/details", { json: data }).json();
};
