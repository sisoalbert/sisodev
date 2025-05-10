import React, { useState } from "react";
import { router } from "expo-router";
import { CodelabData } from "@/types";
import CodeLabEditor from "@/components/editor/CodeLabEditor";

const emptyCodelab: CodelabData = {
  title: "New Codelab",
  lastUpdated: new Date().toISOString().split("T")[0],
  authors: [""],
  sections: [
    {
      id: "section-1",
      order: 1,
      title: "Introduction",
      content: "<h1>Introduction</h1>\n<p>Welcome to your new codelab!</p>",
    },
  ],
};

const CreateCodelab: React.FC = () => {
  const [currentCodelab, setCurrentCodelab] =
    useState<CodelabData>(emptyCodelab);

  const handleSave = (data: CodelabData) => {
    // Get existing codelabs
    const savedCodelabs = localStorage.getItem("codelabs");
    const codelabs = savedCodelabs ? JSON.parse(savedCodelabs) : [];

    // Add new codelab
    const updatedCodelabs = [...codelabs, data];
    localStorage.setItem("codelabs", JSON.stringify(updatedCodelabs));

    // Navigate to codelabs list
    router.push("/codelabs");
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CodeLabEditor
          initialData={currentCodelab}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default CreateCodelab;
