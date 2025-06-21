import { createDetailBookSpace } from "@/services/bookspace/detail";
import { BookSpaceDetailRequest } from "@/services/bookspace/detail/type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useDetails = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: BookSpaceDetailRequest) => {
      console.log("data", data);
      return createDetailBookSpace(data);
    },
    onSuccess: () => {
      toast.success("장소 등록이 완료되었습니다.");
      router.push("/bookspace");
    },
    onError: (error) => {
      console.log(error);
      toast.error("장소 등록에 실패했습니다.");
    },
  });
};
