"use client";
import { analytics } from "@/firebase";
import { logEvent } from "firebase/analytics";
import React, { useEffect } from "react";

export default function BlogsAnalytics() {
  useEffect(() => {
    analytics &&
      logEvent(analytics, "page_view", {
        page_title: "/blogs/react-native-web-airbnb-clone",
        page_path: "/blogs/react-native-web-airbnb-clone",
      });
  }, []);
  return <></>;
}
