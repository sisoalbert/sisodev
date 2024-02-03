"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

export default function NavMenuButton() {
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(true);

  const toggleMenu = () => {
    // router.push(`?drawervisible=${true}`);
    setMenuVisible(!menuVisible);
    router.push(`?drawervisible=${menuVisible}`);
  };

  useEffect(() => {
    if (menuVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [menuVisible]);

  const searchParams = useSearchParams();
  const drawervisible = searchParams.get("drawervisible") === "true";

  return (
    <div className="block lg:hidden">
      <button
        onClick={toggleMenu}
        className={clsx(
          "flex items-center px-3 py-2 border rounded text-slate-50 hover:border-transparent hover:text-black hover:bg-white",
          {
            "text-black bg-white": drawervisible,
          }
        )}
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
  );
}
