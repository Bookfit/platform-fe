import React from "react";

type DetailLayoutProps = {
  title: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const DetailLayout: React.FC<DetailLayoutProps> = ({
  title,
  children,
  onClick,
}) => {
  return (
    <>
      <header
        className="bg-white h-[56px] p-2.5 border-b sticky top-0 flex items-center"
        onClick={onClick}
      >
        {title}
      </header>

      <main className="p-4">
        <div>{children}</div>
      </main>
    </>
  );
};

export default DetailLayout;
