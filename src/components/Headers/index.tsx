import React, { useRef, useEffect, useState } from "react";
import Logo from "./Logo";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import path from "@/src/utils/path";
import { useSession } from "next-auth/react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Menu from "./Menu";

interface HeadersProps {
  backgroundColor?: string;
}

const Headers: React.FC<HeadersProps> = ({ backgroundColor }) => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { data } = useSession();
  const [showMenu, setShowMenu] = useState(false);

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

  useEffect(() => {
    document.addEventListener("click", () => setShowMenu(false));

    return () =>
      document.removeEventListener("click", () => setShowMenu(false));
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
        {data?.user ? (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu((prev) => !prev);
            }}
            className="flex items-center justify-center relative"
          >
            <LazyLoadImage
              className="w-7 h-7 rounded-full cursor-pointer"
              src={data?.user?.image!}
              effect="blur"
            />
            {showMenu && (
              <Menu
                email={data?.user?.email as string}
                name={data?.user?.name as string}
                avatar={data?.user?.image as string}
              />
            )}
          </div>
        ) : (
          <Link
            className="block px-4 py-1.5 text-sm rounded-md bg-primary font-semibold"
            href={path.signIn}
          >
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Headers;
