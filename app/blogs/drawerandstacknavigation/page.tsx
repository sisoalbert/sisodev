import { Card } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import UnprotectedNav from "@/components/ui/unprotectednav";
import { analytics } from "@/firebase";
import { logEvent } from "firebase/analytics";
import React from "react";

export default function page({ params }: { params: { id: string } }) {
  analytics &&
    logEvent(analytics, "page_view", {
      page_title: "/drawerandstacknavigation/",
      page_path: "/drawerandstacknavigation/",
    });

  return (
    <div>
      <UnprotectedNav />
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
          <Section>
            <h2 className="text-xl font-bold">
              How to add drawer and stack navigation with TypeScript in react
              navigation
            </h2>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              This repository provides a well-structured and type-safe
              implementation of a drawer navigation using React Navigation.{" "}
            </p>
          </Section>
          <Section>
            <Card className="flex flex-col overflow-hidden border border-muted p-3 hover:bg-slate-50  justify-center ">
              <a
                href="https://github.com/sisoalbert/TypedDrawerNavigationApp"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded align-middle"
              >
                View on GitHub
              </a>
            </Card>
          </Section>
          <Section>
            <Card className="flex flex-col overflow-hidden border border-muted p-3 hover:bg-slate-50 justify-center items-center">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/sijsUy6K6Ls?si=RARjbEp7xsNqqsVD"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </Card>
          </Section>
        </section>
      </main>
    </div>
  );
}
