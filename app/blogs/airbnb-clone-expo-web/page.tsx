import CodeBlock from "@/components/codeblock";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { analytics } from "@/firebase";
import { logEvent } from "firebase/analytics";
import React from "react";

export default function page() {
  analytics &&
    logEvent(analytics, "page_view", {
      page_title: "/react-native-web-airbnb-clone",
      page_path: "/react-native-web-airbnb-clone",
    });
  return (
    <div>
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
          <Section>
            <h2 className="text-xl font-bold">
              Is This Native or Web? React Native for Web Breaks the Boundaries
            </h2>
            <CardContent className="mt text-xs">Author - Siso</CardContent>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              In this short tutorial we are going to implement an airbnb clone
              with react native.
            </p>
          </Section>
          <Section>
            <Card className="flex flex-col overflow-hidden border border-muted p-3 hover:bg-slate-50 w-full">
              <a
                href="https://github.com/gluestack/ui-examples"
                className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded align-middle text-center"
              >
                View on GitHub
              </a>
            </Card>
          </Section>

          <Section>
            <CardHeader>
              <div className="flex items-center justify-between gap-x-2 text-base">
                <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                  Airbnb Comes to the Web: Experience Native Performance with
                  React Native!
                </h3>
              </div>
            </CardHeader>
            <CardContent className="mt-2 text-xs">
              <br />
              Ever dreamed of building an Airbnb-like web app with the smooth
              performance and intuitive feel of a native mobile app? Now you
              can, thanks to the power of React Native! ✨ <br /> In this
              showcase video, we will take you on a journey through the process
              of building a stunning Airbnb web app using React Native.
              <br />
              Ensure you have Node.js and Expo CLI installed on your machine.
              <br />
              Clone this repository:
            </CardContent>
            <CodeBlock
              code={"git clone https://github.com/gluestack/ui-examples.git"}
              language="javascript"
            />
            <CardContent className="mt-2 text-xs">
              Install dependencies:
            </CardContent>

            <CodeBlock code={"npm install or yarn"} language="javascript" />
            <CardContent className="mt-2 text-xs">
              Here is the rest of the code
            </CardContent>
            <CodeBlock code={appjs} language="javascript" />
          </Section>
        </section>
      </main>
    </div>
  );
}

const appjs = `
Unleash Your Inner Host: Build an Airbnb Clone UI with React Native for Web!

Ready to disrupt the hospitality world? In this comprehensive video, we'll guide you through crafting a stunning Airbnb clone user interface using React Native for Web. Whether you're a seasoned developer or an eager beginner, this tutorial is your portal to creating an immersive and interactive web experience for both hosts and guests.

Here's what awaits you:

React Native for Web: Discover the magic of building cross-platform web UIs with the power and flexibility of React Native. Say goodbye to platform-specific limitations!
Component-Based Design: Embrace the modularity of React Native to construct reusable and maintainable UI components, accelerating your development process.
UI Foundations: Lay the groundwork with essential elements like user profiles, search functionalities, listing details, and booking workflows.
Interactive Features: Implement dynamic features like calendar availability, interactive maps, and image galleries to captivate users.
Polished Aesthetics: Learn design best practices and styling techniques to craft a modern and engaging user experience.
Bonus! Get valuable insights into potential backend integration and deployment strategies to bring your creation to life.
By the end of this video, you'll have:

A solid understanding of building web UIs with React Native.
A functional Airbnb clone UI prototype showcasing essential features.
The confidence to take your project to the next level and add unique functionalities.
So, join us on this exciting journey! Click the play button and unleash your inner Airbnb innovator!

P.S. Don't forget to subscribe for more tech tutorials and coding adventures!

#airbnb #reactnative #webdev #coding #tutorial #ui #design #web #clone #frontend #development...`;
