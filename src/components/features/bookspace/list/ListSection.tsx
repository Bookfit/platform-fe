import ListItem from "./ListItem";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  BookSpaceListResponse,
  BookSpaceListItem,
} from "@/services/bookspace/list/type";

interface ListSectionProps {
  spaces: BookSpaceListResponse | undefined;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onSpaceClick?: (space: BookSpaceListItem) => void;
}

export default function ListSection({
  spaces,
  currentPage,
  totalPages,
  onPageChange,
  onSpaceClick,
}: ListSectionProps) {
  const handleSpaceClick = (space: BookSpaceListItem) => {
    // TODO: 북스페이스 상세 페이지로 이동
    console.log("북스페이스 클릭:", space);
    onSpaceClick?.(space);
  };

  console.log("spaces", spaces);
  console.log("currentPage", currentPage);
  console.log("totalPages", totalPages);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <section>
      {/* 리스트 아이템들 */}
      {!spaces || spaces.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <p className="text-gray-500 text-sm">등록된 공간이 없습니다.</p>
        </div>
      ) : (
        spaces.map((space) => (
          <ListItem key={space.id} space={space} onClick={handleSpaceClick} />
        ))
      )}

      {/* 페이지네이션 - 항상 표시 */}
      <div className="px-4 py-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    onPageChange(currentPage - 1);
                  }
                }}
                className={
                  currentPage <= 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    size="icon"
                    isActive={currentPage === page}
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(page as number);
                    }}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                size="default"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    onPageChange(currentPage + 1);
                  }
                }}
                className={
                  currentPage >= totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </section>
  );
}
