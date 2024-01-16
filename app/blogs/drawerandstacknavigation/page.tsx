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
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
              <div className="flex flex-col items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  TypedDrawerNavigationApp
                </h3>
                <p className="text-sm text-gray-500">
                  Drawer and stack navigation with TypeScript
                </p>
              </div>
              <a
                href="https://github.com/sisoalbert/TypedDrawerNavigationApp"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                View on GitHub
              </a>
            </div>
          </Section>
        </section>
      </main>
    </div>
  );
}
