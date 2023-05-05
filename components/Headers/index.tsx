import React, { useRef, useEffect } from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";

const Headers = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleFixedHeader = () => {
      const header = headerRef.current as HTMLDivElement;
      const sticky = header.offsetTop;

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
      ref={headerRef}
      className="p-4 flex items-center transition-all justify-between fixed top-0 w-full z-[999]"
    >
      <Logo />
      <div className="flex items-center space-x-4">
        <CiSearch size={30} className="cursor-pointer" />
        <Link
          className="block px-4 py-2 text-sm rounded-md bg-[#cae962] font-semibold text-black"
          href="/sign-in"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Headers;
