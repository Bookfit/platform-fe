import React from 'react';

type MainLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  stats?: {
    total: number;
    pending: number;
  };
  onStatsClick?: () => void;
};

const MainLayout: React.FC<MainLayoutProps> = ({
  title,
  subtitle,
  children,
  stats,
  onStatsClick,
}) => {
  return (
    <div className="pb-16">
      {/* Header */}
      <header className="px-5 pt-6">
        <span className="text-primary font-bold text-2xl">Bookfit</span>
        <h1 className="text-xl font-bold mt-4 mb-2 leading-snug">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm mb-4">{subtitle}</p>
        )}

        {/* Stats Card */}
        {stats && (
          <div className="bg-primary/5 border-primary border-2 rounded-lg p-3 mb-4">
            <div className="flex gap-2 flex-col">
              <div className="text-primary font-semibold text-base">
                등록 공간 조회
              </div>
              <div className="text-muted-foreground text-xs">
                등록 및 요청 중인 공간을 조회 합니다
              </div>
            </div>
          </div>
        )}

        {/* Stats Numbers */}
        {stats && (
          <div className="flex gap-3 mb-4">
            <div
              className="flex-1 bg-primary/5 rounded-lg p-3 cursor-pointer hover:bg-primary/10 transition-colors text-center"
              onClick={onStatsClick}
            >
              <div className="text-primary text-xl font-bold">
                {stats.total}
              </div>
              <div className="text-xs text-muted-foreground">총 등록 공간</div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-lg p-3 text-center">
              <div className="text-muted-foreground text-xl font-bold">
                {stats.pending}
              </div>
              <div className="text-xs text-muted-foreground">등록 요청중</div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="bg-white px-5 py-6">{children}</main>

      {/* Bottom Navigation */}
      <div className="fixed left-0 right-0 bottom-0 flex justify-center w-full">
        <nav className="w-full max-w-[420px] bg-white border-t border-gray-200 flex justify-around items-center h-14 z-50">
          <div className="text-primary text-xs font-bold text-center">홈</div>
          <div className="text-muted-foreground text-xs text-center">
            중고도서
          </div>
          <div className="text-muted-foreground text-xs text-center">
            커뮤니티
          </div>
          <div className="text-muted-foreground text-xs text-center">마이</div>
        </nav>
      </div>
    </div>
  );
};

export default MainLayout;
