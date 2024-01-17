import { BlogCard } from "@/components/blog-card";
import { Section } from "@/components/ui/section";
import UnprotectedNav from "@/components/ui/unprotectednav";
import React from "react";

export default function page() {
  return (
    <div>
      <UnprotectedNav />
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
          <Section>
            <h2 className="text-xl font-bold">Blogs</h2>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              Ready to transform your dev game? Get your hands dirty with
              practical guides on React, React Native, and Next.js, all paired
              with step-by-step video tutorials. Learn by doing, crafting
              beautiful and powerful web apps from scratch. Conquer challenges,
              optimize code, and discover hidden gems that elevate your skills.
              Join my learning journey and let us build something awesome
              together!
            </p>
          </Section>
          <Section>
            <BlogCard
              title={
                "How to build a todo app with typescript without using any libraries"
              }
              description={
                "In this tutorial we are going to implement a react native todo app with typescript without using any libraries."
              }
              tags={[
                "TypeScript",
                "React Native",
                "React Navigation",
                "Stack Navigation",
                "Drawer Navigation",
              ]}
              link="/blogs/todoapp"
            />

            <BlogCard
              title={
                "How to add drawer and stack navigation with TypeScript in react navigation"
              }
              description={
                "In this tutorial we are going to implement react navigation with typescript."
              }
              tags={[
                "TypeScript",
                "React Native",
                "React Navigation",
                "Stack Navigation",
                "Drawer Navigation",
              ]}
              link="/blogs/drawerandstacknavigation"
            />
          </Section>
        </section>
      </main>
    </div>
  );
}
