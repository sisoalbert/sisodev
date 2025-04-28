import { CodelabData } from "@/types";

export const codelabData: CodelabData = {
  title: "Cloud Firestore Quickstart Codelab",
  lastUpdated: "2025-01-23",
  authors: ["Abe Haskins", "Nicolas Garnier"],
  sections: [
    {
      id: "overview",
      order: 1,
      title: "Overview",
      content:
        "<h1>Overview</h1>\n\n<h2>Goals</h2>\n<p>In this quickstart, you'll build a minimal web app that reads and writes to Cloud Firestore.</p>\n\n<h2>What you'll learn</h2>\n<ul>\n  <li>Initialize Firebase in a web app</li>\n  <li>Write a document to Firestore</li>\n  <li>Read documents in real time</li>\n</ul>",
    },
    {
      id: "setup",
      order: 2,
      title: "Create and set up a Firebase project",
      content:
        '<h1>Create and set up a Firebase project</h1>\n\n<p>1. Go to the <a href="https://console.firebase.google.com/">Firebase console</a> and click &quot;Add project&quot;.</p>\n<p>2. Enter a project name and accept the terms.</p>\n<p>3. In "Build" on the left menu, select "Firestore Database" and click "Create database".</p>\n<p>4. Choose test mode and your preferred region, then click "Enable".</p>',
    },
  ],
};
