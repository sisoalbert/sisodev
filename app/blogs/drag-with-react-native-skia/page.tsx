import CodeBlock from "@/components/codeblock";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { analytics } from "@/firebase";
import { logEvent } from "firebase/analytics";
import React from "react";

export default function page() {
  analytics &&
    logEvent(analytics, "page_view", {
      page_title: "/drag-with-react-native-skia",
      page_path: "/drag-with-react-native-skia",
    });
  return (
    <div>
      <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
        <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
          <Section>
            <h2 className="text-xl font-bold">
              Drag with react native skia and reanimated
            </h2>
            <CardContent className="mt text-xs">Author - Siso</CardContent>
            <p className="text-pretty font-mono text-sm text-muted-foreground">
              In this tutorial, we will be building a simple app that allows you
              to move a red circle around the screen using touch gestures. We
              will leverage the power of React Native Skia to create smooth and
              performant animations, and we will also use React Native
              Reanimated to handle gesture events efficiently.
            </p>
          </Section>
          <Section>
            <Card className="flex flex-col overflow-hidden border border-muted p-3 hover:bg-slate-50 w-full">
              Prerequisites:
              <br />
              Before we start, make sure you have the following set up:
              <br /> Node.js and npm (or yarn) installed on your machine.
              <br />
              Basic familiarity with React Native development.
              <br />
              The required libraries installed: @shopify/react-native-skia
              react-native-reanimated
            </Card>
          </Section>

          <Section>
            <CardHeader>
              <CodeBlock
                code={`
                  import { GestureResponderEvent } from 'react-native';
                  import React from 'react';
                  import { Canvas, Circle, Fill } from '@shopify/react-native-skia';
                  import { useSharedValue } from 'react-native-reanimated'                  
                  `}
                language="javascript"
              />
            </CardHeader>
            <CardContent className="mt-2 text-xs">
              Manage Circles Position with Shared Values:
            </CardContent>
            <CardHeader>
              <CodeBlock
                code={`
                  const circleLocationX = useSharedValue(200);
                  const circleLocationY = useSharedValue(200);
                          
                  `}
                language="javascript"
              />
            </CardHeader>
            <CardContent className="mt-2 text-xs">
              Handle Touch Events:
            </CardContent>
            <CardHeader>
              <CodeBlock
                code={`
                  const handleMoveEvent = (event: GestureResponderEvent) => {
                    'worklet';
                    const { locationX, locationY } = event.nativeEvent;
                    circleLocationX.value = locationX;
                    circleLocationY.value = locationY;
                  };                                     
                  `}
                language="javascript"
              />
            </CardHeader>
            <CardContent className="mt-2 text-xs">
              Render the Canvas and Circle:
            </CardContent>
            <CardHeader>
              <CodeBlock
                code={`
                  <Canvas
                  // ...
                >
                  <Fill color="#120a3d" />
                  <Circle cx={circleLocationX} cy={circleLocationY} r={100} color="red" />
                </Canvas>
                  };                                     
                  `}
                language="javascript"
              />
            </CardHeader>

            <CardContent className="mt-2 text-xs">
              Shared Values: We use useSharedValue from Reanimated to create
              smooth animations when updating the circles position.
              <br />
              Touch Events: The handleMoveEvent function tracks touch gestures
              and updates the circles coordinates accordingly.
              <br />
              Canvas and Circle: The Canvas component provides the drawing
              surface, and the Circle component renders the draggable circle.
              <br />
            </CardContent>
            <CardContent className="mt-2 text-xs">
              Then install react-native-skottie
            </CardContent>
            <CodeBlock
              code={
                "npm install @shopify/react-native-skia react-native-reanimated              "
              }
              language="javascript"
            />
            <CardContent className="mt-2 text-xs">
              Link the libraries (if necessary):
            </CardContent>
            <CodeBlock
              code={"npx pod-install              "}
              language="javascript"
            />
            <CodeBlock
              code={"npm i react-native-reanimated"}
              language="javascript"
            />
            <CardContent className="mt-2 text-xs">
              Add react-native-reanimated/plugin plugin to your babel.config.js.
            </CardContent>
            <CodeBlock
              code={`
              module.exports = {
                presets: [
                  ... // don't add it here :)
                ],
                plugins: [
                  ...
                  'react-native-reanimated/plugin',
                ],
              };`}
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
import React from 'react';
import {Canvas, Circle, Fill} from '@shopify/react-native-skia';
import {useSharedValue} from 'react-native-reanimated';
import {GestureResponderEvent} from 'react-native';

const App = () => {
  const circleLocationX = useSharedValue(200);
  const circleLocationY = useSharedValue(200);

  const handleMoveEvent = (event: GestureResponderEvent) => {
    'worklet';
    const {locationX, locationY} = event.nativeEvent;
    circleLocationX.value = locationX;
    circleLocationY.value = locationY;
  };

  return (
    <>
      <Canvas
        style={{
          flex: 1,
          width: '100%',
          height: 'auto',
        }}
        onTouchStart={e => {
          console.log('onTouchStart');
          handleMoveEvent(e);
        }}
        onTouchMove={handleMoveEvent}
        onTouchEnd={e => {
          console.log('onTouchEnd');
        }}>
        <Fill color="#120a3d" />
        <Circle cx={circleLocationX} cy={circleLocationY} r={100} color="red" />
      </Canvas>
    </>
  );
};

export default App;
`;
