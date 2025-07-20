import React from "react";
import Editor from "../components/Editor";

function EditorPage() {
  const [currentSection, setCurrentSection] = React.useState({
    content: "",
    isReadOnly: false,
  });
  const [mode, setMode] = React.useState("edit");
  const handleContentChange = (content: string) => {
    setCurrentSection({
      ...currentSection,
      content,
    });
  };

  const handleModeChange = (mode: string) => {
    setMode(mode);
  };

  return (
    <div>
      <Editor
        content={currentSection.content}
        onContentChange={handleContentChange}
        isReadOnly={mode === "preview"}
      />
    </div>
  );
}

export default EditorPage;
