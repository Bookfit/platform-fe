import React from "react";

type ResponsiveLayoutProps = {
  children: React.ReactNode;
};

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  return (
    <div className="max-w-[420px] mx-auto min-h-screen bg-white pb-16 relative shadow-lg">
      {children}
    </div>
  );
};

export default ResponsiveLayout;
