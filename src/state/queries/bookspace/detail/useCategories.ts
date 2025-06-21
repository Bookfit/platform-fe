import { getCategories } from "@/services/bookspace/detail";
import { CategoryResponse } from "@/services/bookspace/detail/type";
import { bookSpaceQueryOptions } from "@/state/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery<CategoryResponse>({
    queryKey: bookSpaceQueryOptions.categories(),
    queryFn: getCategories,
  });
};
