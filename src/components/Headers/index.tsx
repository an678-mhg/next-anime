import React, { useRef, useEffect } from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import path from "@/src/utils/path";

interface HeadersProps {
  backgroundColor?: string;
}

const Headers: React.FC<HeadersProps> = ({ backgroundColor }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleFixedHeader = () => {
      const header = headerRef?.current as HTMLDivElement;
      const sticky = header && header?.offsetTop;

      if (header) {
        if (window.pageYOffset > sticky) {
          header.classList.add("is-sticky");
        } else {
          header.classList.remove("is-sticky");
        }
      }
    };

    window.addEventListener("scroll", handleFixedHeader);

    return () => window.removeEventListener("scroll", handleFixedHeader);
  }, []);

  return (
    <div
      style={{
        backgroundColor: backgroundColor && "transparent",
      }}
      ref={headerRef}
      className={`px-4 py-2 flex items-center transition-all justify-between fixed top-0 w-full z-[999]`}
    >
      <Logo />
      <div className="flex items-center space-x-4">
        <Link href={path.search}>
          <CiSearch size={30} className="cursor-pointer" />
        </Link>
        {/* <Link
          className="block px-4 py-1.5 text-sm rounded-md bg-[#cae962] font-semibold text-black"
          href="/sign-in"
        >
          Sign In
        </Link> */}
      </div>
    </div>
  );
};

export default Headers;
