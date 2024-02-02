import { Section } from "@/components/ui/section";
import { analytics } from "@/firebase";
import { logEvent } from "firebase/analytics";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  analytics &&
    logEvent(analytics, "page_view", {
      page_title: "/blogs/" + params.id,
      page_path: "/blogs/" + params.id,
    });
  return (
    <div>
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6 h-screen overflow-auto">
          <Section>
            <h2 className="text-xl font-bold">{params.id}</h2>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              Craving a deeper understanding of cutting-edge web development?
              Look no further! Master the powerful trio of React, React Native,
              and Next.js with this blog and accompanying YouTube videos. Dive
              into practical tutorials, insightful breakdowns, and real-world
              code examples, all presented in a clear and engaging style.
              Whether you are a coding newbie or seasoned pro, there is
              something for everyone to learn and grow. Let us unlock the
              secrets of building dynamic, user-friendly applications together!{" "}
            </p>
          </Section>
        </section>
      </main>
    </div>
  );
}
