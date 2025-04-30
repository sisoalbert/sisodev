import React, { useCallback, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Image,
  Undo,
  Redo,
  Code,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import CodeHighlighter from "../CodeHighlighter/CodeHighlighter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RichTextEditorProps {
  initialContent: string;
  onChange: (content: string) => void;
  className?: string;
}

export default function RichTextEditor({
  initialContent,
  onChange,
  className,
}: RichTextEditorProps) {
  const [editorContent, setEditorContent] = useState(initialContent);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showCodeEditor, setShowCodeEditor] = useState(false);
  const [codeContent, setCodeContent] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const editorRef = useRef<HTMLDivElement>(null);

  const handleExecuteCommand = useCallback(
    (command: string, value: string | null = null) => {
      document.execCommand(command, false, value);
      if (editorRef.current) {
        const content = editorRef.current.innerHTML;
        setEditorContent(content);
        onChange(content);
      }
    },
    [onChange]
  );

  const handleEditorChange = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const content = e.currentTarget.innerHTML;
      setEditorContent(content);
      onChange(content);
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleExecuteCommand("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  const handleLinkInsert = useCallback(() => {
    const url = prompt("Enter link URL:", "https://");
    if (url) {
      handleExecuteCommand("createLink", url);
    }
  }, [handleExecuteCommand]);

  const handleImageInsert = useCallback(() => {
    const url = prompt("Enter image URL:", "https://");
    if (url) {
      handleExecuteCommand("insertImage", url);
    }
  }, [handleExecuteCommand]);

  const handleCodeInsert = () => {
    setShowCodeEditor(true);
  };

  const handleCodeSave = () => {
    if (codeContent.trim()) {
      const codeHtml = `<pre class="code-block" data-language="${codeLanguage}"><code class="language-${codeLanguage}">${codeContent
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")}</code></pre>`;
      handleExecuteCommand("insertHTML", codeHtml);
      setShowCodeEditor(false);
      setCodeContent("");
    }
  };

  const handleCodeCancel = () => {
    setShowCodeEditor(false);
    setCodeContent("");
  };

  useEffect(() => {
    // Process code blocks in preview mode
    if (isPreviewMode && editorRef.current) {
      const codeBlocks = editorRef.current.querySelectorAll(
        "pre.code-block code"
      );
      codeBlocks.forEach((block) => {
        const parent = block.parentElement;
        if (parent) {
          const language = parent.getAttribute("data-language") || "javascript";
          const code = block.textContent || "";
          const wrapper = document.createElement("div");
          wrapper.className = "my-4";

          // Create a React element-like structure for CodeHighlighter
          const highlighter = document.createElement("div");
          highlighter.className = "code-highlighter";
          highlighter.setAttribute("data-code", code);
          highlighter.setAttribute("data-language", language);

          wrapper.appendChild(highlighter);
          parent.replaceWith(wrapper);
        }
      });
    }
  }, [isPreviewMode]);

  return (
    <div className={cn("flex flex-col border rounded-md", className)}>
      <Tabs defaultValue="edit" className="w-full">
        <div className="flex flex-wrap justify-between items-center p-2 bg-muted/30 border-b">
          <div className="flex flex-wrap gap-1">
            {!isPreviewMode && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("bold")}
                  title="Bold"
                >
                  <Bold className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("italic")}
                  title="Italic"
                >
                  <Italic className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("underline")}
                  title="Underline"
                >
                  <Underline className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1 self-center" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("justifyLeft")}
                  title="Align Left"
                >
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("justifyCenter")}
                  title="Align Center"
                >
                  <AlignCenter className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("justifyRight")}
                  title="Align Right"
                >
                  <AlignRight className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1 self-center" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("insertOrderedList")}
                  title="Ordered List"
                >
                  <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("insertUnorderedList")}
                  title="Bullet List"
                >
                  <List className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1 self-center" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLinkInsert}
                  title="Insert Link"
                >
                  <Link className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleImageInsert}
                  title="Insert Image"
                >
                  <Image className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCodeInsert}
                  title="Insert Code Block"
                >
                  <Code className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-border mx-1 self-center" />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("undo")}
                  title="Undo"
                >
                  <Undo className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleExecuteCommand("redo")}
                  title="Redo"
                >
                  <Redo className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>

          <TabsList>
            <TabsTrigger
              value="edit"
              onClick={() => setIsPreviewMode(false)}
              className="text-xs"
            >
              Edit
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              onClick={() => setIsPreviewMode(true)}
              className="text-xs"
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              Preview
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="edit" className="flex-1">
          {showCodeEditor ? (
            <div className="p-4">
              <div className="mb-4 flex items-center gap-2">
                <Select value={codeLanguage} onValueChange={setCodeLanguage}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="javascript">JavaScript</SelectItem>
                    <SelectItem value="typescript">TypeScript</SelectItem>
                    <SelectItem value="html">HTML</SelectItem>
                    <SelectItem value="css">CSS</SelectItem>
                    <SelectItem value="jsx">JSX</SelectItem>
                    <SelectItem value="bash">Bash</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <textarea
                className="w-full h-[200px] p-3 border rounded-md font-mono text-sm focus:outline-none"
                value={codeContent}
                onChange={(e) => setCodeContent(e.target.value)}
                placeholder={`// Enter your ${codeLanguage} code here...`}
              />
              <div className="flex justify-end gap-2 mt-3">
                <Button variant="outline" onClick={handleCodeCancel}>
                  Cancel
                </Button>
                <Button onClick={handleCodeSave}>Insert Code Block</Button>
              </div>
            </div>
          ) : (
            <div
              ref={editorRef}
              className="flex-1 p-4 focus:outline-none min-h-[200px] overflow-auto prose prose-sm max-w-none"
              contentEditable
              dangerouslySetInnerHTML={{ __html: editorContent }}
              onInput={handleEditorChange}
              onKeyDown={handleKeyDown}
            />
          )}
        </TabsContent>

        <TabsContent value="preview" className="flex-1">
          <div
            className="p-4 prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: editorContent }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
