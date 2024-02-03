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
              How does react native skottie compare to react native lottie?
            </h2>
            <CardContent className="mt text-xs">Author - Siso</CardContent>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              In this short tutorial we are going to implement a react native
              skottie and lottie library.
            </p>
          </Section>
          <Section>
            <Card className="flex flex-col overflow-hidden border border-muted p-3 hover:bg-slate-50 w-full">
              <a
                href="https://github.com/sisoalbert/test-react-native-skottie"
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
                  react native skottie vs lottie
                </h3>
              </div>
            </CardHeader>
            <CardContent className="mt-2 text-xs">
              Lottie React Native vs React Native Skottie Both Lottie React
              Native and React Native Skottie are libraries for adding Lottie
              animations to your React Native app. However, they have some key
              differences.
              <br />
              <br />
              Lottie React Native <br /> More mature and feature-rich: Lottie
              React Native has been around longer and has a larger community. It
              supports a wider range of Lottie features, such as vector shapes,
              masks, and trim paths. Larger file size: Lottie animations are
              saved as JSON files, which can be quite large. This can lead to
              slower loading times and increased app size. Potentially lower
              performance: Lottie animations can be CPU-intensive, especially on
              older devices.
              <br />
              <br />
              React Native Skottie
              <br />
              Higher performance: React Native Skottie uses Skia, a
              high-performance 2D graphics library, to render Lottie animations.
              This can lead to smoother animations and lower CPU usage. Smaller
              file size: Skottie animations are saved as DotLottie files, which
              are a binary format that is smaller than JSON. This can lead to
              faster loading times and a smaller app size. Fewer features:
              Skottie is a newer library and does not yet support all of the
              features of Lottie. For example, it does not support vector shapes
              or trim paths. So, which one should you choose? If you need the
              most features and do not mind the larger file size and potentially
              lower performance, then Lottie React Native is a good choice. If
              you are looking for the best performance and smallest file size,
              then React Native Skottie is a better option.
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
            <CodeBlock
              code={"yarn add lottie-react-native"}
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
import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import LottiesAnimation from './animation3.json';
import LottiesAnimation1 from './animation.json';

import {Skottie} from 'react-native-skottie';
import LottieView from 'lottie-react-native';

const App = () => {
  return (
    <View>
      <ScrollView>
        <Text style={{textAlign: 'center', fontSize: 30}}>
          React Native Skottie
        </Text>
        <Skottie
          style={{width: 350, height: 350}}
          source={LottiesAnimation}
          autoPlay={true}
        />
        <Text style={{textAlign: 'center', fontSize: 30}}>
          React Native Lottie
        </Text>

        <LottieView
          source={LottiesAnimation}
          style={{width: 350, height: 350}}
          autoPlay
          loop
        />
        <Text style={{textAlign: 'center', fontSize: 30}}>
          React Native Skottie
        </Text>
        <Skottie
          style={{width: 350, height: 350}}
          source={LottiesAnimation1}
          autoPlay={true}
        />
        <Text style={{textAlign: 'center', fontSize: 30}}>
          React Native Lottie
        </Text>

        <LottieView
          source={LottiesAnimation1}
          style={{width: 350, height: 350}}
          autoPlay
          loop
        />
      </ScrollView>
    </View>
  );
};

export default App;`;
