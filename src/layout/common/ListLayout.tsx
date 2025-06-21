import React from 'react';
import { useRouter } from 'next/navigation';

type ListLayoutProps = {
  title: string;
  children: React.ReactNode;
  onBackClick?: () => void;
  backUrl?: string;
};

const ListLayout: React.FC<ListLayoutProps> = ({
  title,
  children,
  onBackClick,
  backUrl,
}) => {
  const router = useRouter();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else if (backUrl) {
      router.push(backUrl);
    } else {
      router.back();
    }
  };

  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-white pb-20 relative shadow-lg">
      {/* 상단 헤더 */}
      <header className="px-4 pt-6">
        <h1 className="text-lg font-bold mb-3 flex items-center hover:text-primary transition">
          <button
            type="button"
            onClick={handleBackClick}
            aria-label="뒤로 가기"
          >
            {'<'}
            <span className="text-lg font-bold ml-1">{title}</span>
          </button>
        </h1>
      </header>

      {/* 메인 콘텐츠 */}
      <main>{children}</main>
    </div>
  );
};

export default ListLayout;
