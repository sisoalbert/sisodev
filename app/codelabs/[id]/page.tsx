import React from "react";
import { analytics } from "@/firebase";
import { logEvent } from "firebase/analytics";

export default function page({ params }: { params: { id: string } }) {
  analytics &&
    logEvent(analytics, "page_view", {
      page_title: "/codelabs/" + params.id,
      page_path: "/codelabs/" + params.id,
    });

  return (
    <div>
      <>
        <h1>Blog {params.id}</h1>
      </>
    </div>
  );
}
