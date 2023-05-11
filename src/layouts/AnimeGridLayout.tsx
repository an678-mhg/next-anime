import React from "react";
import { Layout } from "../types/utils";
import TitlePrimary from "../components/TitlePrimary";

interface AnimeGridLayoutProps extends Layout {
  title?: string;
  className: string;
}

const AnimeGridLayout: React.FC<AnimeGridLayoutProps> = ({
  children,
  className,
  title,
}) => {
  return (
    <div className={className}>
      {title && <TitlePrimary title={title} />}
      <div className="grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-3 mt-5">
        {children}
      </div>
    </div>
  );
};

export default AnimeGridLayout;
