import React from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full w-full items-center flex justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;
