import path from "@/src/utils/path";
import Link from "next/link";
import React from "react";
import { SiNextdotjs } from "react-icons/si";

const Logo = () => {
  return (
    <Link href={path.home} className="flex items-center space-x-3">
      <SiNextdotjs size={40} />
    </Link>
  );
};

export default Logo;
