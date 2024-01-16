import { Section } from "@/components/ui/section";
import UnprotectedNav from "@/components/ui/unprotectednav";
import React from "react";

export default function page() {
  return (
    <div>
      <UnprotectedNav />
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6 h-screen overflow-auto">
          <Section>
            <h2 className="text-xl font-bold">Code Labs</h2>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              Craving a deeper understanding of cutting-edge web development?
              Look no further! Master the powerful trio of React, React Native,
              and Next.js with these code lab and accompanying YouTube videos.
              Dive into practical tutorials, insightful breakdowns, and
              real-world code examples, all presented in a clear and engaging
              style. Whether you're a coding newbie or seasoned pro, there's
              something for everyone to learn and grow. Let's unlock the secrets
              of building dynamic, user-friendly applications together!{" "}
            </p>
          </Section>
        </section>
      </main>
    </div>
  );
}
