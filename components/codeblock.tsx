"use client";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [isCopied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative">
      <CopyToClipboard text={code} onCopy={handleCopy}>
        <button className="absolute top-2 right-2 px-2 py-1 bg-gray-800 text-white text-xs font-semibold rounded-md focus:outline-none hover:bg-gray-700">
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </CopyToClipboard>
      <SyntaxHighlighter language={language} style={docco}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;
