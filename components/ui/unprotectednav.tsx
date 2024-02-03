import React, { useState } from "react";
import SisoDevIcon from "../icons/SisoDevIcon";
import Link from "next/link";
import NavMenuButton from "./navmenubutton";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "@/database.types";
import NavMenuList from "./navmenulist";

export default async function UnprotectedNav({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

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
      <NavMenuList user={user} />
    </nav>
  );
}
