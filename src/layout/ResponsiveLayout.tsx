import React from "react";

type ResponsiveLayoutProps = {
  children: React.ReactNode;
};

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen mx-auto flex flex-col @md:flex-row pb-16">
      {children}
    </div>
  );
};

export default ResponsiveLayout;
