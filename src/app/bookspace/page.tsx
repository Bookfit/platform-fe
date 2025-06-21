'use client';
import { useRouter } from 'next/navigation';
import MainLayout from '@/layout/common/MainLayout';
import BookspaceRegisterForm from '@/components/features/bookspace/main/RegisterMain/BookspaceRegisterForm';

export default function BookspaceRegisterPage() {
  const router = useRouter();

  const handleSpaceListClick = () => {
    router.push('/bookspace/list');
  };

  return (
    <MainLayout
      title="북핏에 딱 맞는 공간, 함께 만들어요."
      subtitle="괜찮았던 공간이 있다면 한 번씩 등록해주세요! 매번 고민되는 모임 장소를 같이 해결해요 :)"
      stats={{
        total: 128,
        pending: 5,
      }}
      onStatsClick={handleSpaceListClick}
    >
      <BookspaceRegisterForm />
    </MainLayout>
  );
}
