"use client";
import React, { useState } from "react";
import SisoDevIcon from "../icons/SisoDevIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UnprotectedNav() {
  const pathname = usePathname();
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-black p-6">
      <Link
        href="/"
        className="flex items-center flex-shrink-0 text-white mr-6"
      >
        <SisoDevIcon />
        <span className="font-semibold text-xl tracking-tight pl-2">
          Siso Dev
        </span>
      </Link>
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded text-slate-50 hover:border-transparent hover:text-black hover:bg-white"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
          menuVisible ? "block" : "hidden"
        }`}
      >
        <div className="text-sm lg:flex-grow">
          <Link
            href="/codelabs"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-500 mr-4"
          >
            Codelabs
          </Link>
          <Link
            href="https://www.youtube.com/@questerstudio"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-500 mr-4"
          >
            Youtube
          </Link>
          <Link
            href="/blogs"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-500"
          >
            Blogs
          </Link>
        </div>
        <div>
          <Link
            href="/signup"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-500 pr-4"
          >
            Sign up
          </Link>
          <Link
            href="/signup"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
