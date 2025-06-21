import { createDetailBookSpace } from "@/services/bookspace/detail";
import { BookSpaceDetailRequest } from "@/services/bookspace/detail/type";
import { useMutation } from "@tanstack/react-query";

export const useDetails = () => {
  return useMutation({
    mutationFn: (data: BookSpaceDetailRequest) => {
      return createDetailBookSpace(data);
    },
  });
};
