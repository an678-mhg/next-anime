import React from "react";
import { SiNextdotjs } from "react-icons/si";

const Logo = () => {
  return (
    <div className="flex items-center space-x-3">
      <SiNextdotjs size={40} />
      <span className="text-[#cae962] font-semibold text-xl">Anime</span>
    </div>
  );
};

export default Logo;
