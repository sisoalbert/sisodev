import React from "react";
import "@blocknote/react/style.css";
import useBlockNoteEditor from "../hooks/useBlockNoteEditor";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { enhanceCodeBlocksWithCopyButton } from "./CopyableCodeBlock";

interface EditorProps {
  content: string;
  onContentChange: (content: string) => void;
  isReadOnly: boolean;
}

const Editor: React.FC<EditorProps> = ({
  content,
  onContentChange,
  isReadOnly,
}) => {
  const editor = useBlockNoteEditor(content, onContentChange);

  // Add copy button functionality to all code blocks
  if (editor) {
    enhanceCodeBlocksWithCopyButton(editor);
  }

  return (
    <BlockNoteView
      editor={editor}
      editable={!isReadOnly}
      theme="light"
      className="h-full"
    />
  );
};

export default Editor;
