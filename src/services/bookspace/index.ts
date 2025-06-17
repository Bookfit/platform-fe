import { apiClient } from "@/services/api";
import { CategoryResponse } from "@/services/bookspace/type";

export const getCategories = async () => {
  return apiClient.get("bookspace").json<CategoryResponse>();
};
