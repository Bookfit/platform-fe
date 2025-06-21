import { apiClient } from "@/services/api";
import {
  BookspaceMainResponse,
  CreateBookspaceMainRequest,
  CreateBookspaceMainResponse,
} from "@/services/bookspace/type";

export const getBookspaceMain = async () => {
  return apiClient.get("api/map/main").json<BookspaceMainResponse>();
};

export const createBookspaceMain = async (data: CreateBookspaceMainRequest) => {
  return apiClient
    .post("api/map/main", { json: data })
    .json<CreateBookspaceMainResponse>();
};
