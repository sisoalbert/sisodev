import UnprotectedNav from "@/components/ui/unprotectednav";
import React from "react";

export default function page() {
  return (
    <div>
      <UnprotectedNav />
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16"></main>
    </div>
  );
}
