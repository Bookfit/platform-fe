'use client';
import React, { useState } from 'react';
import ListLayout from '@/layout/common/ListLayout';
import ListFilter from '@/components/features/bookspace/list/ListFilter';
import MapSection from '@/components/features/bookspace/list/MapSection';
import ListSection from '@/components/features/bookspace/list/ListSection';
import { BookSpaceListParams } from '@/services/bookspace/list/type';
import { useBookspaceList } from '@/state/queries/bookspace/list/useBookspaceList';
import { BookSpaceListItem } from '@/services/bookspace/list/type';
import { useBookspaceFilterStore } from '@/store/bookspace/bookspaceFilterStore';

export default function BookSpaceListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSpaceId, setSelectedSpaceId] = useState<number | null>(null);
  const pageSize = 10;

  // 필터 상태 가져오기
  const { selectedFilter } = useBookspaceFilterStore();

  const params: BookSpaceListParams = {
    page: currentPage - 1,
    size: pageSize,
    sort: selectedFilter === 'all' ? 'name,asc' : `${selectedFilter},asc`,
  };

  console.log('params', params);
  console.log('selectedFilter', selectedFilter);

  const { data: bookspaceList, isLoading, isError } = useBookspaceList(params);

  console.log('bookspaceList', bookspaceList);

  const totalPages = 15; // 임시로 5페이지로 설정

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSpaceSelect = (space: BookSpaceListItem) => {
    console.log('선택된 공간:', space);
    setSelectedSpaceId(space.id);
    // 여기서 선택된 공간에 대한 추가 작업을 할 수 있습니다
    // 예: 상세 페이지로 이동, 모달 표시 등
  };

  // 필터가 변경되면 페이지를 1로 리셋
  React.useEffect(() => {
    setCurrentPage(1);
    setSelectedSpaceId(null);
  }, [selectedFilter]);

  if (isLoading) {
    return (
      <ListLayout title="등록 공간 조회" backUrl="/bookspace">
        <div className="px-4 py-8 text-center">
          <p className="text-gray-500 text-sm">로딩 중...</p>
        </div>
      </ListLayout>
    );
  }

  if (isError) {
    return (
      <ListLayout title="등록 공간 조회" backUrl="/bookspace">
        <div className="px-4 py-8 text-center">
          <p className="text-red-500 text-sm">
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        </div>
      </ListLayout>
    );
  }

  return (
    <ListLayout title="등록 공간 조회" backUrl="/bookspace">
      {/* 필터 */}
      <ListFilter />

      {/* 지도 섹션 */}
      <MapSection
        bookspaces={bookspaceList || []}
        onSpaceSelect={handleSpaceSelect}
        selectedSpaceId={selectedSpaceId}
      />

      {/* 리스트 섹션 */}
      <ListSection
        spaces={bookspaceList}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </ListLayout>
  );
}
