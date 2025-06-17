import { getCategories } from "@/services/bookspace";
import { CategoryResponse } from "@/services/bookspace/type";
import { bookSpaceQueryOptions } from "@/state/queryKeys";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  return useQuery<CategoryResponse>({
    queryKey: bookSpaceQueryOptions.categories(),
    queryFn: getCategories,
  });
};
