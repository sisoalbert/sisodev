"use client";
import { analytics } from "@/firebase";
import { logEvent } from "firebase/analytics";
import React, { useEffect } from "react";

export default function BlogsAnalytics() {
  useEffect(() => {
    analytics &&
      logEvent(analytics, "page_view", {
        page_title: "/blogs",
        page_path: "/blogs",
      });
  }, []);
  return <></>;
}
