import Footer from "@/src/components/Footer";
import Headers from "@/src/components/Headers";
import { Layout } from "@/src/types/utils";
import React from "react";

const MainLayout: React.FC<Layout> = ({ children }) => {
  return (
    <div>
      <Headers />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
