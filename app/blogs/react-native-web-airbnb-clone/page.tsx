import CodeBlock from "@/components/codeblock";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import UnprotectedNav from "@/components/ui/unprotectednav";
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
      <UnprotectedNav />
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
              showcase video, we'll take you on a journey through the process of
              building a stunning Airbnb web app using React Native.
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
...
return (
  <>
    {/* top SafeAreaView */}
    <SafeAreaView
      style={{
        backgroundColor: colorMode === "light" ? "#E5E5E5" : "#262626",
      }}
    />
    {/* bottom SafeAreaView */}
    <SafeAreaView
      style={{
        ...styles.container,
        backgroundColor: colorMode === "light" ? "white" : "#171717",
      }}
    >
      {/* gluestack-ui provider */}
      <GluestackUIProvider config={config} colorMode={colorMode}>
        <ThemeContext.Provider value={{ colorMode, toggleColorMode }}>
          {/* main app page */}
          <SSRProvider>
            <HomestayPage />
          </SSRProvider>
        </ThemeContext.Provider>
      </GluestackUIProvider>
    </SafeAreaView>
  </>
);
}
...`;
