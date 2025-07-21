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
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#374151',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        width: '8.5in',
        height: '11in',
        backgroundColor: 'white',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        color: 'black'
      }}>
        <Editor
          content={currentSection.content}
          onContentChange={handleContentChange}
          isReadOnly={mode === "preview"}
        />
      </div>
    </div>
  );
}

export default EditorPage;
