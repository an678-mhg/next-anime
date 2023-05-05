import Footer from "@/components/Footer";
import Headers from "@/components/Headers";
import { Layout } from "@/types/utils";
import React from "react";

const MainLayout: React.FC<Layout> = ({ children }) => {
  return (
    <div>
      <Headers />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
