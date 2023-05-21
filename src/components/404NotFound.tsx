import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import MainLayout from "../layouts/MainLayout";

const NotFound = () => {
  return (
    <MainLayout>
      <div className="w-full h-screen flex items-center justify-center">
        <LazyLoadImage src="/not-found.png" effect="blur" />
      </div>
    </MainLayout>
  );
};

export default NotFound;
