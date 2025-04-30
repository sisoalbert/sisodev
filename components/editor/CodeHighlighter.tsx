import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

interface CodeHighlighterProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const CodeHighlighter: React.FC<CodeHighlighterProps> = ({
  code,
  language = "javascript",
  showLineNumbers = true,
  className = "",
}) => {
  const [showPreview, setShowPreview] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    console.log("Code copied to clipboard");
  };

  if (showPreview && language === "html") {
    return (
      <div className="relative border rounded-md overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-gray-50 border-b">
          <div className="text-xs font-mono text-gray-600">HTML Preview</div>
          <div className="flex gap-1">
            <button
              onClick={() => setShowPreview(false)}
              className="flex items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              <AntDesign name="eye" size={20} />
              View Code
            </button>
          </div>
        </div>
        <div
          className="p-4 bg-white"
          dangerouslySetInnerHTML={{ __html: code }}
        />
      </div>
    );
  }

  return (
    <div className={`relative border rounded-md overflow-hidden ${className}`}>
      <div className="flex items-center justify-between p-2 bg-gray-50 border-b">
        <div className="text-xs font-mono text-gray-600">
          {language.toUpperCase()}
        </div>
        <div className="flex gap-1">
          {language === "html" && (
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
            >
              <AntDesign name="eye" size={20} />
              Preview
            </button>
          )}
          <button
            onClick={handleCopyCode}
            className="flex items-center px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded"
          >
            <AntDesign name="link" size={20} />
            Copy
          </button>
        </div>
      </div>
      <pre
        className={`p-4 overflow-auto text-sm font-mono ${
          showLineNumbers ? "line-numbers" : ""
        }`}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeHighlighter;
