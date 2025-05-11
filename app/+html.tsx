import { ScrollViewStyleReset } from "expo-router/html";
import { type PropsWithChildren } from "react";

export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {/* Optional: Disable body scrolling for a native-like feel */}
        <ScrollViewStyleReset />
        {/* Add more head elements here, like favicons or analytics scripts */}
      </head>
      <body>{children}</body>
    </html>
  );
}
