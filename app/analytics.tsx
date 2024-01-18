"use client";
import { analytics } from "@/firebase";
import { logEvent } from "firebase/analytics";
import React, { useEffect } from "react";

export default function HomeAnalytics() {
  useEffect(() => {
    analytics &&
      logEvent(analytics, "page_view", {
        page_title: "/",
        page_path: "/",
      });
  }, []);
  return <></>;
}
