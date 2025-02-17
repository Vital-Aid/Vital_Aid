import React, { ReactNode } from "react";
import Navbar from "@/components/users/Navbar/Navbar";


interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
};
export default Layout;
