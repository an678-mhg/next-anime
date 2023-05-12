import path from "@/src/utils/path";
import Link from "next/link";
import React from "react";
import { TbBrandNextjs } from "react-icons/tb";

const Logo = () => {
  return (
    <Link href={path.home}>
      <h3 className="text-2xl text-primary font-semibold flex items-center">
        <TbBrandNextjs size={35} /> Anime
      </h3>
    </Link>
  );
};

export default Logo;
