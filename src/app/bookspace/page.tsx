"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"

/* 타입 선언 */
const CATEGORIES = ["기타", "서점", "북카페", "스터디룸"] as const;
type CategoryType = (typeof CATEGORIES)[number];

const formSchema = z.object({
  placeName: z.string().min(1, "장소명을 입력해주세요"),
  category: z.enum(CATEGORIES, {
    required_error: "카테고리를 선택해주세요",
  }),
  description: z.string().min(1, "소개를 입력해주세요"),
  images: z.array(z.instanceof(File)).optional(),
})

export default function BookspaceRegisterPage() {
  const router = useRouter();

  /* 폼 선언 */
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      placeName: "",
      category: "기타", 
      description: "",
      images: undefined,
    },
  })

  /* 이미지 미리보기를 위한 state */
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  /* 공간 목록 클릭 핸들러 */
  const handleSpaceListClick = () => {
    router.push("/bookspace/list");
    console.log("click");
  }

  /* 카테고리 클릭 핸들러 */
  const handleCategoryClick = (category: CategoryType) => {
    form.setValue("category", category);
  }

  /* 이미지 처리 함수 */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      field.onChange(files); 

      const previews = files.map(file => URL.createObjectURL(file));
      setImagePreview(previews);
    }
  };

  /* 폼 제출 함수 */
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({
      placeName: values.placeName,
      category: values.category,
      description: values.description,
      images: values.images?.map(file => file.name) 
    });
  }

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-white pb-20 relative shadow-lg">
      {/* Header */}
      <header className="px-5 pt-6">
        <span className="text-primary font-bold text-2xl">Bookfit</span>
        <h1 className="text-xl font-bold mt-4 mb-2 leading-snug">
          북핏에 딱 맞는 공간,<br />함께 만들어요.
        </h1>
        <p className="text-muted-foreground text-sm mb-4">
          괜찮았던 공간이 있다면 한 번씩 등록해주세요!<br />
          매번 고민되는 모임 장소를 같이 해결해요 :)
        </p>
        <Card className="p-3 mb-4 border-primary border-2 bg-primary/5">
        <div className="flex gap-2 flex-col">
          <div className="text-primary font-semibold text-base">등록 공간 조회</div>
          <div className="text-muted-foreground text-xs">등록 및 요청 중인 공간을 조회 합니다</div>
        </div>
        </Card>
        <div className="flex gap-3 mb-4">
          <div 
            className="flex-1 bg-primary/5 rounded-lg p-3 cursor-pointer hover:bg-primary/10 transition-colors text-center" 
            onClick={handleSpaceListClick}
          >
            <div className="text-primary text-xl font-bold">128</div>
            <div className="text-xs text-muted-foreground">총 등록 공간</div>
          </div>
          <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
            <div className="text-muted-foreground text-xl font-bold">5</div>
            <div className="text-xs text-muted-foreground">등록 요청중</div>
          </div>
        </div>
      </header>

      {/* Form */}
      <section className="bg-white px-5 py-6">
        <h2 className="text-lg font-semibold mb-4">공간 정보 등록</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="bg-gray-50 p-4 rounded-lg">
              <FormField
                name="placeName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-500">
                      장소명 <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field}
                        className="bg-transparent border-none shadow-none text-base pt-1 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* 카테고리 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <FormField
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-500 mb-2">
                      카테고리 <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-2">
                        {CATEGORIES.map((event) => (
                          <button
                            key={event}
                            type="button"
                            onClick={() => handleCategoryClick(event)}
                            className={`flex-1 py-2 rounded-lg text-sm ${
                              field.value === event 
                                ? "bg-primary text-white" 
                                : "bg-white text-gray-500"
                            }`}
                          >
                            {event}
                          </button>
                        ))}
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* 소개 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <FormField
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-500">
                      소개 <span className="text-red-600">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="bg-transparent border-none text-base pt-1 resize-none min-h-[80px] focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {/* 이미지 업로드 */}
            <FormField
              name="images"
              render={({ field: { onChange, value, ...field } }) => (
                <FormItem>
                  <div className="mt-2">
                    {/* 이미지 업로드 영역 */}
                    <label 
                      htmlFor="imageUpload" 
                      className="border border-dashed border-gray-200 rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 cursor-pointer"
                    >
                      <input
                        {...field}
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => handleImageChange(e, { onChange })}
                      />
                      <div className="text-gray-400 text-center">
                        <span className="block mb-1">+</span>
                        이미지 추가하기
                      </div>
                    </label>

                    {/* 이미지 미리보기 */}
                    {imagePreview.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {imagePreview.map((url, index) => (
                          <div key={index} className="relative aspect-square">
                            <img 
                              src={url} 
                              alt={`Preview ${index + 1}`} 
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm"
                              onClick={() => {
                                const newPreview = imagePreview.filter((_, i) => i !== index);
                                setImagePreview(newPreview);
                                const newFiles = (value as File[])?.filter((_, i) => i !== index);
                                onChange(newFiles);
                              }}
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center bg-gray-50 rounded-lg px-4 py-3">
              <span>세부 정보</span>
              <span className="text-gray-400">입력 ›</span>
            </div>

            <Button className="w-full mt-4 bg-primary hover:bg-primary/90 text-white py-4 rounded-lg">
              등록 요청
            </Button>
          </form>
        </Form>
      </section>

      {/* Bottom Navigation */}
      <div className="fixed left-0 right-0 bottom-0 flex justify-center w-full">
        <nav className="w-full max-w-[420px] bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50">
          <div className="text-primary text-xs font-bold text-center">홈</div>
          <div className="text-muted-foreground text-xs text-center">중고도서</div>
          <div className="text-muted-foreground text-xs text-center">커뮤니티</div>
          <div className="text-muted-foreground text-xs text-center">마이</div>
        </nav>
      </div>
    </div>
  );
}