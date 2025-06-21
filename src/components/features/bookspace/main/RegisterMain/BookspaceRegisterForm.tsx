"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useCategories } from "@/state/queries/bookspace/detail/useCategories";
import { useCreateBookspaceMain } from "@/state/mutations/bookspace/useCreateBookspaceMain";
import { useUserInfo } from "@/state/queries/user/useUserInfo";
import CategorySelector from "@/components/common/CategorySelector";
import OverviewFormInput from "./MainFormInput";
import OverviewFormTextarea from "./MainFormTextarea";
import OverviewImageUpload from "./MainImageUpload";
import { toast } from "sonner";

const formSchema = z.object({
  placeName: z.string().min(1, "장소명을 입력해주세요"),
  category: z.string().min(1, "카테고리를 선택해주세요"),
  description: z.string().min(1, "소개를 입력해주세요"),
  images: z.array(z.instanceof(File)).optional(),
});

export default function BookspaceRegisterForm() {
  const router = useRouter();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const createBookspaceMutation = useCreateBookspaceMain();
  const { data: user } = useUserInfo();

  /* 폼 선언 */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placeName: "",
      category: "",
      description: "",
      images: undefined,
    },
  });

  /* 폼 제출 함수 */
  function onSubmit(values: z.infer<typeof formSchema>) {
    const requestData = {
      userId: user?.userId || 0,
      loginType: user?.socialType || "kakao",
      name: values.placeName,
      description: values.description,
      categories: [
        {
          code: values.category,
          name: values.category,
        },
      ],
    };

    console.log("📤 API 요청 데이터:", requestData);

    createBookspaceMutation.mutate(requestData, {
      onSuccess: () => {
        // 토스트 메시지
        toast.success("북스페이스 등록이 성공적으로 완료되었습니다.");

        // 성공 시 처리
        router.push("/bookspace/list");
      },
      onError: (error) => {
        // 에러 처리
        console.error("북스페이스 등록 실패:", error);

        // 토스트 메시지
        toast.error("북스페이스 등록에 실패했습니다. 다시 시도해주세요.");
      },
    });
  }

  return (
    <>
      <h2 className="text-lg font-semibold mb-4">공간 정보 등록</h2>
      {/* 폼 에러 메시지 */}
      {/* {Object.keys(form.formState.errors).length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-medium text-red-800 mb-2">
            다음 항목을 확인해주세요:
          </h3>
          <ul className="text-sm text-red-700 space-y-1">
            {form.formState.errors.placeName && (
              <li>• 장소명을 입력해주세요</li>
            )}
            {form.formState.errors.category && (
              <li>• 카테고리를 선택해주세요</li>
            )}
            {form.formState.errors.description && (
              <li>• 소개를 입력해주세요</li>
            )}
          </ul>
        </div>
      )} */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5"
        >
          {/* 장소명 입력 */}
          <OverviewFormInput
            form={form}
            name="placeName"
            label="장소명"
            placeholder="장소명을 입력해주세요"
            required
          />

          {/* 카테고리 선택 */}
          <FormField
            name="category"
            render={({ field }) => (
              <div>
                <CategorySelector
                  categories={categories?.categories ?? []}
                  label="카테고리"
                  className="mb-2"
                  required
                  loading={categoriesLoading}
                  onChange={field.onChange}
                  defaultValue={field.value}
                />
                <FormMessage className="text-red-600 text-xs mt-1 ml-4" />
              </div>
            )}
          />

          {/* 소개 입력 */}
          <OverviewFormTextarea
            form={form}
            name="description"
            label="소개"
            placeholder="소개를 입력해주세요"
            required
          />

          {/* 이미지 업로드 */}
          <OverviewImageUpload form={form} name="images" />

          {/* 세부 정보 링크 */}
          <div
            onClick={() => {
              router.push("/bookspace/register/detail");
            }}
            className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3"
          >
            <span>세부 정보</span>
            <span className="text-gray-400">입력 ›</span>
          </div>

          {/* 제출 버튼 */}
          <Button
            type="submit"
            disabled={createBookspaceMutation.isPending}
            loading={createBookspaceMutation.isPending}
            loadingText="등록 중..."
            className="w-full mt-4 bg-primary hover:bg-primary/90 text-white py-4 rounded-lg"
          >
            등록 요청
          </Button>
        </form>
      </Form>
    </>
  );
}
