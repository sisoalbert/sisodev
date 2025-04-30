import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye, Code, CopyIcon } from "lucide-react";
import { toast } from "sonner";

interface CodeHighlighterProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export default function CodeHighlighter({
  code,
  language = "javascript",
  showLineNumbers = true,
  className,
}: CodeHighlighterProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  if (showPreview && language === "html") {
    return (
      <div className="relative border rounded-md overflow-hidden">
        <div className="flex items-center justify-between p-2 bg-muted/30 border-b">
          <div className="text-xs font-mono text-muted-foreground">
            HTML Preview
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(false)}
              className="h-7 px-2"
            >
              <Code className="h-3.5 w-3.5 mr-1" />
              View Code
            </Button>
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
    <div
      className={cn("relative border rounded-md overflow-hidden", className)}
    >
      <div className="flex items-center justify-between p-2 bg-muted/30 border-b">
        <div className="text-xs font-mono text-muted-foreground">
          {language.toUpperCase()}
        </div>
        <div className="flex gap-1">
          {language === "html" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowPreview(true)}
              className="h-7 px-2"
            >
              <Eye className="h-3.5 w-3.5 mr-1" />
              Preview
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyCode}
            className="h-7 px-2"
          >
            <CopyIcon className="h-3.5 w-3.5 mr-1" />
            Copy
          </Button>
        </div>
      </div>
      <pre
        className={cn(
          "p-4 overflow-auto text-sm font-mono",
          showLineNumbers && "line-numbers"
        )}
      >
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
}
