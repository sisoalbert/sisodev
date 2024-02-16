import CodeBlock from "@/components/codeblock";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { analytics } from "@/firebase";
import { logEvent } from "firebase/analytics";
import React from "react";

export default function page() {
  analytics &&
    logEvent(analytics, "page_view", {
      page_title: "/react-native-skottie",
      page_path: "/react-native-skottie",
    });
  return (
    <div>
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
          <Section>
            <h2 className="text-xl font-bold">
              How to add react native skottie in a react-native app
            </h2>
            <CardContent className="mt text-xs">Author - Siso</CardContent>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              In this short tutorial we are going to implement a react native
              skottie (a lottie library alternative).
            </p>
          </Section>
          <Section>
            <Card className="flex flex-col overflow-hidden border border-muted p-3 hover:bg-slate-50 w-full">
              <a
                href="https://github.com/margelo/react-native-skottie?tab=readme-ov-file"
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
                  Implementation of react native skottie
                </h3>
              </div>
            </CardHeader>
            <CardContent className="mt-2 text-xs">
              Skottie is a high performance library for running Lottie
              animations in Skia. 📄 Supports Lottie files (JSON) and DotLottie
              files (.lottie) 📈 Uses Skias GPU-acceleration 📉 Lower CPU usage
              🏃 Higher frame rates 🔗 Based on @shopify/react-native-skia.
            </CardContent>
            <CardContent className="mt-2 text-xs">
              🏃 First install @shopify/react-native-skia since skottie is 🔗
              Based on @shopify/react-native-skia.
            </CardContent>
            <CodeBlock
              code={"npm install @shopify/react-native-skia"}
              language="javascript"
            />
            <CardContent className="mt-2 text-xs">
              Then install react-native-skottie
            </CardContent>
            <CodeBlock
              code={"npm install react-native-skottie"}
              language="javascript"
            />
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
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottiesAnimation from './animation.json';
import {Skottie} from 'react-native-skottie';

const App = () => {
  return (
    <View>
      <Text>App</Text>
      <Skottie
        style={{width: 350, height: 350}}
        source={LottiesAnimation}
        autoPlay={true}
      />
    </View>
  );
};

export default App;
`;
