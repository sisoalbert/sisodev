import { useEffect, useRef } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { codeBlock } from "@blocknote/code-block";
import { enhanceCodeBlocksWithCopyButton } from "../components/CopyableCodeBlock";

// Helper function to debounce function calls
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

const useBlockNoteEditor = (
  initialContent: string,
  onContentChange: (content: string) => void
): BlockNoteEditor => {
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
    codeBlock,
  });

  // // Add copy button functionality to all code blocks
  if (editor) {
    enhanceCodeBlocksWithCopyButton(editor);
  }

  const prevContentRef = useRef<string>(initialContent);

  useEffect(() => {
    if (initialContent !== prevContentRef.current) {
      editor.replaceBlocks(
        editor.document,
        initialContent ? JSON.parse(initialContent) : []
      );
      prevContentRef.current = initialContent;
    }
  }, [initialContent, editor]);

  useEffect(() => {
    // Create debounced handler that only fires after 300ms of inactivity
    const handleChange = debounce(() => {
      const content = JSON.stringify(editor.document);
      // Only update if content actually changed
      if (content !== prevContentRef.current) {
        prevContentRef.current = content;
        onContentChange(content);
      }
    }, 300);

    // Register the debounced handler
    const unsubscribe = editor.onChange(handleChange);

    // Cleanup function to remove the onChange handler
    return () => {
      // Check if unsubscribe exists before calling it
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [editor, onContentChange]);

  return editor;
};

export default useBlockNoteEditor;
