import { Button } from "@/components/ui/button";
import { BookSpaceListItem } from "@/services/bookspace/list/type";
import { useRegisterList } from "@/state/mutations/bookspace/list/useRegisterList";
import { CategoryItem } from "@/services/bookspace/detail/type";
import { toast } from "sonner";

interface ListItemProps {
  space: BookSpaceListItem;
  onClick?: (space: BookSpaceListItem) => void;
}

export default function ListItem({ space, onClick }: ListItemProps) {
  const { mutate: registerList } = useRegisterList();
  const handleRegisterClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    registerList(
      {
        sampleId: space.id,
        userId: space?.userId || 0,
        loginType: space?.loginType || "kakao",
        status: "REGISTERED",
      },
      {
        onSuccess: () => {
          toast.success("북스페이스가 성공적으로 등록되었습니다.");
        },
        onError: (error) => {
          toast.error("북스페이스 등록에 실패했습니다. 다시 시도해주세요.");
          console.error("북스페이스 등록 실패:", error);
        },
      },
    );
  };

  const displayAddress =
    space.detailAddress || space.address || "주소 정보 없음";

  const categoryNames = space.categories.map((cat: CategoryItem) => cat.name);

  return (
    <div
      className="flex items-center justify-between px-4 py-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={() => onClick?.(space)}
    >
      <div className="flex-1 flex items-center gap-2">
        <div className="w-15 h-15 bg-gray-200 rounded-xl"></div>
      </div>
      <div className="flex-4">
        <div>
          <h2 className="text-sm font-bold">{space.name}</h2>
          <p className="text-xs text-gray-500 whitespace-pre-line">
            {displayAddress}
          </p>
        </div>
        <div className="flex items-center gap-2 justify-between mt-2">
          <div className="flex items-center gap-2">
            {categoryNames.map((category) => (
              <p
                key={category}
                className="text-xs text-gray-500 bg-gray-200 rounded-full px-2 py-1"
              >
                {category}
              </p>
            ))}
          </div>
          {space.status === "PENDING" && (
            <Button
              variant="outline"
              className="rounded px-1 py-1 text-xs py-0 h-4"
              onClick={handleRegisterClick}
            >
              등록
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
