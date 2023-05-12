import React from "react";

interface TitlePrimaryProps {
  title: string;
}

const TitlePrimary: React.FC<TitlePrimaryProps> = ({ title }) => {
  return <h3 className="font-semibold text-xl text-primary">{title}</h3>;
};

export default TitlePrimary;
