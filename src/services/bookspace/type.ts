import { CategoryItem } from "@/services/bookspace/detail/type";

export interface BookspaceMainResponse {
  totalCount: number;
  pendingCount: number;
  categories: CategoryItem[];
}

export interface CreateBookspaceMainRequest {
  userId: number;
  loginType: string;
  name: string;
  description: string;
  categories: CategoryItem[];
}

export interface CreateBookspaceMainResponse {
  id: number;
  name: string;
  description: string;
  categories: CategoryItem[];
}
