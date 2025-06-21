import {
  BookSpaceListRegisterParams,
  BookSpaceListRegisterResponse,
} from "@/services/bookspace/list/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api";
import { bookSpaceQueryOptions } from "@/state/queryKeys";
import { toast } from "sonner";

export const useRegisterList = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: BookSpaceListRegisterParams,
    ): Promise<BookSpaceListRegisterResponse> => {
      const response = await apiClient
        .patch("api/map/search", {
          json: data,
        })
        .json<BookSpaceListRegisterResponse>();

      return response;
    },
    onSuccess: () => {
      // 북스페이스 리스트 쿼리를 무효화하여 리로드
      queryClient.invalidateQueries({
        queryKey: bookSpaceQueryOptions.all(),
      });
      toast.success("북스페이스가 성공적으로 등록되었습니다.");
    },
    onError: (error) => {
      toast.error("북스페이스 등록에 실패했습니다. 다시 시도해주세요.");
      console.error("북스페이스 등록 실패:", error);
    },
  });
};
