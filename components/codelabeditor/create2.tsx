import { useState } from "react";
import { CodelabData } from "@/types";
import { codelabData } from "@/assets/data/codelabData";
import CodeLabEditor from "@/components/codelabeditor/CodeLabEditor/CodeLabEditor";

const Index = () => {
  const [currentCodelab, setCurrentCodelab] =
    useState<CodelabData>(codelabData);

  const handleSave = (data: CodelabData) => {
    setCurrentCodelab(data);
    // In a real app, you would save to a database or API here
    console.log("Saved codelab:", data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-6">
          <h1 className="text-2xl font-bold text-primary">CodeLab Creator</h1>
          <p className="text-gray-500">
            Create beautiful interactive tutorials with code highlighting
          </p>
        </div>
      </header>

      <main>
        <CodeLabEditor initialData={currentCodelab} onSave={handleSave} />
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
          CodeLab Creator © {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  );
};

export default Index;
