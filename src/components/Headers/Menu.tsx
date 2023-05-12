import React from "react";
import {
  AiOutlineHistory,
  AiOutlineLogout,
  AiOutlineOrderedList,
} from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { signOut } from "next-auth/react";

const Menu = () => {
  return (
    <div className="opacity-animation absolute w-[200px] right-0 bg-[#222] top-[30px] rounded-md overflow-hidden">
      <ul className="p-2 space-y-1">
        <li className="hover:bg-gray-500 transition-colors rounded-md p-2 flex items-center space-x-3 cursor-pointer">
          <MdOutlineAccountCircle />
          <span className="text-sm font-semibold">My Account</span>
        </li>
        <li className="hover:bg-gray-500 transition-colors rounded-md p-2 flex items-center space-x-3 cursor-pointer">
          <AiOutlineHistory />
          <span className="text-sm font-semibold">History</span>
        </li>
        <li className="hover:bg-gray-500 transition-colors rounded-md p-2 flex items-center space-x-3 cursor-pointer">
          <AiOutlineOrderedList />
          <span className="text-sm font-semibold">List</span>
        </li>
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
