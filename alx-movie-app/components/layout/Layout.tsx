import React from "react";
import { ComponentProps } from "@/interfaces";
import Header from "./Header";
import Footer from "./Footer";

const Layout: React.FC<ComponentProps> = ({ children }) => {
  return (
    <>
      <Header />

      <main className="min-h-scren">{children}</main>

      <Footer />
    </>
  );
};

export default Layout;
