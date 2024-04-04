"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";

export default function NavMenuList({ user }: { user: any }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const menuVisible = searchParams.get("drawervisible") === "true";

  const links = [
    { name: "Blogs", href: "/blogs", icon: null },
    // { name: "Codelabs", href: "/codelabs", icon: null },
    {
      name: "Youtube",
      href: "https://www.youtube.com/@questerstudio",
      icon: null,
    },
  ];

  return (
    <div
      className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
        menuVisible ? "block" : "hidden"
      }`}
    >
      <div className="text-sm lg:flex-grow">
        {links.map((link) => {
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                "block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-500 pr-4",
                {
                  "text-cyan-500 font-bold border-l-cyan-500 black border-l-4":
                    pathname === link.href, // Apply text-cyan-500 when pathname matches link.href
                }
              )}
            >
              <p>{link.name}</p>
            </Link>
          );
        })}
      </div>
      {/* {!user ? (
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
          className={clsx(
            "block mt-4 lg:inline-block lg:mt-0 text-white hover:text-cyan-500 px-4 py-2 rounded",
            {
              " text-cyan-500 font-bold": pathname === "/account",
            }
          )}
        >
          {user?.email}
        </Link>
      )} */}
    </div>
  );
}
