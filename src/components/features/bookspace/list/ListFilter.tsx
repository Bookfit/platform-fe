import { Button } from "@/components/ui/button";
import { useBookspaceFilterStore } from "@/store/bookspace/bookspaceFilterStore";

export default function ListFilter() {
  const { selectedFilter, setSelectedFilter } = useBookspaceFilterStore();

  const BOOKSPACE_FILTER_OPTIONS = [
    { key: "all", label: "전체" },
    { key: "BOOKSTORE", label: "서점" },
    { key: "CAFE", label: "북카페" },
    { key: "STUDY_ROOM", label: "스터디룸" },
    { key: "THEATER", label: "공연장" },
  ] as const;

  return (
    <div className="flex gap-2 mb-4 mt-4 px-4">
      {BOOKSPACE_FILTER_OPTIONS.map((option) => (
        <Button
          key={option.key}
          variant={selectedFilter === option.key ? "default" : "outline"}
          className="rounded-full px-4 py-1 text-sm"
          onClick={() => setSelectedFilter(option.key)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
