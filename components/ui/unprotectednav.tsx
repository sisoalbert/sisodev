import React, { useState } from "react";
import SisoDevIcon from "../icons/SisoDevIcon";
import Link from "next/link";
import NavMenuButton from "./navmenubutton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/database.types";

export default async function UnprotectedNav() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // const pathname = usePathname();
  // const [menuVisible, setMenuVisible] = useState(false);

  // const toggleMenu = () => {
  //   setMenuVisible(!menuVisible);
  // };

  const menuVisible = false;

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
      <NavMenuButton />
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
        {!user ? (
          <div>
            <Link
              href="/signup"
              className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-500 pr-4"
            >
              Sign up
            </Link>
            <Link
              href="/login"
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
            >
              Login
            </Link>
          </div>
        ) : (
          <Link
            href="/account"
            className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-500 mr-4"
          >
            {user?.email}
          </Link>
        )}
      </div>
    </nav>
  );
}
