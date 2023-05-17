import React from "react";
import {
  AiOutlineLogout,
  AiOutlineMail,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { signOut } from "next-auth/react";
import Link from "next/link";
import path from "@/src/utils/path";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface MenuProps {
  email: string;
  name: string;
  avatar: string;
}

const Menu: React.FC<MenuProps> = ({ email, name, avatar }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="opacity-animation absolute w-[200px] right-0 bg-[#222] top-[30px] rounded-md overflow-hidden"
    >
      <ul className="p-2 space-y-1">
        <li className="transition-colors rounded-md p-2 flex items-center space-x-3 cursor-pointer">
          <LazyLoadImage
            className="w-[15px] h-[15px] rounded-full"
            src={avatar}
            effect="blur"
          />
          <span className="text-sm font-semibold line-clamp-1">{name}</span>
        </li>
        <li className="transition-colors rounded-md p-2 flex items-center space-x-3 cursor-pointer">
          <AiOutlineMail />
          <span className="text-sm font-semibold line-clamp-1">{email}</span>
        </li>
        <div className="bg-gray-600 w-full h-[1px]" />
        <li>
          <Link
            className="hover:bg-gray-500 transition-colors rounded-md p-2 flex items-center space-x-3 cursor-pointer"
            href={path.list}
          >
            <AiOutlineOrderedList />
            <span className="text-sm font-semibold">List</span>
          </Link>
        </li>
        <div className="bg-gray-600 w-full h-[1px]" />
        <li
          onClick={() => signOut()}
          className="hover:bg-gray-500 transition-colors rounded-md p-2 flex items-center space-x-3 cursor-pointer"
        >
          <AiOutlineLogout />
          <span className="text-sm font-semibold">Log out</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
