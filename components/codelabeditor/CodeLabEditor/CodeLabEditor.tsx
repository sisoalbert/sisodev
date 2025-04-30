import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodelabData } from "@/types";
import SectionList from "@/components/SectionManager/SectionList";
import { toast } from "sonner";
import { format } from "date-fns";
import { Eye, Pencil } from "lucide-react";

interface CodeLabEditorProps {
  initialData: CodelabData;
  onSave?: (data: CodelabData) => void;
}

export default function CodeLabEditor({
  initialData,
  onSave,
}: CodeLabEditorProps) {
  const [codelabData, setCodelabData] = useState<CodelabData>({
    ...initialData,
    lastUpdated: initialData.lastUpdated || format(new Date(), "yyyy-MM-dd"),
  });
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");

  const handleTitleChange = (title: string) => {
    setCodelabData({ ...codelabData, title });
  };

  const handleAuthorsChange = (authorsString: string) => {
    const authors = authorsString
      .split(",")
      .map((author) => author.trim())
      .filter(Boolean);
    setCodelabData({ ...codelabData, authors });
  };

  const handleSectionsChange = (sections: typeof codelabData.sections) => {
    setCodelabData({ ...codelabData, sections });
  };

  const handleSave = () => {
    setCodelabData({
      ...codelabData,
      lastUpdated: format(new Date(), "yyyy-MM-dd"),
    });

    onSave?.(codelabData);
    toast.success("CodeLab saved successfully!");
  };

  const exportCodeLab = () => {
    const dataStr = JSON.stringify(codelabData, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${codelabData.title
      .toLowerCase()
      .replace(/\s+/g, "-")}-codelab.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    toast.success("CodeLab exported successfully!");
  };

  const preProcessCodeBlocks = (content: string): string => {
    // Replace code blocks with the proper highlighted version
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    const codeBlocks = tempDiv.querySelectorAll("pre.code-block");
    codeBlocks.forEach((block) => {
      const codeElement = block.querySelector("code");
      if (!codeElement) return;

      const language = block.getAttribute("data-language") || "javascript";
      const codeContent = codeElement.textContent || "";

      // Create enhanced code block view
      const enhancedBlock = document.createElement("div");
      enhancedBlock.className =
        "relative border rounded-md overflow-hidden my-4";

      const header = document.createElement("div");
      header.className =
        "flex items-center justify-between p-2 bg-muted/30 border-b";
      header.innerHTML = `<div class="text-xs font-mono text-muted-foreground">${language.toUpperCase()}</div>`;

      const codeWrapper = document.createElement("pre");
      codeWrapper.className = "p-4 overflow-auto text-sm font-mono";

      const newCodeEl = document.createElement("code");
      newCodeEl.className = `language-${language}`;
      newCodeEl.textContent = codeContent;

      codeWrapper.appendChild(newCodeEl);
      enhancedBlock.appendChild(header);
      enhancedBlock.appendChild(codeWrapper);

      block.replaceWith(enhancedBlock);
    });

    return tempDiv.innerHTML;
  };

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>CodeLab Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={codelabData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="CodeLab Title"
            />
          </div>
          <div>
            <Label htmlFor="authors">Authors (comma separated)</Label>
            <Input
              id="authors"
              value={codelabData.authors.join(", ")}
              onChange={(e) => handleAuthorsChange(e.target.value)}
              placeholder="Author 1, Author 2"
            />
          </div>
          <div>
            <Label>Last Updated</Label>
            <Input value={codelabData.lastUpdated} readOnly disabled />
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 flex justify-end gap-2">
        <Button
          variant={viewMode === "edit" ? "default" : "outline"}
          onClick={() => setViewMode("edit")}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Edit Mode
        </Button>
        <Button
          variant={viewMode === "preview" ? "default" : "outline"}
          onClick={() => setViewMode("preview")}
        >
          <Eye className="h-4 w-4 mr-2" />
          Preview Mode
        </Button>
      </div>

      {viewMode === "edit" ? (
        <SectionList
          sections={codelabData.sections}
          onChange={handleSectionsChange}
        />
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-3xl font-bold mb-2">{codelabData.title}</h1>
          <p className="text-sm text-gray-500 mb-8">
            Last updated: {codelabData.lastUpdated} • By:{" "}
            {codelabData.authors.join(", ")}
          </p>

          {codelabData.sections.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No sections yet. Add some sections to see the preview.
            </div>
          ) : (
            <div className="space-y-12">
              {codelabData.sections.map((section) => (
                <div
                  key={section.id}
                  className="border-t pt-8 first:border-t-0 first:pt-0"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-sm">
                      {section.order}
                    </span>
                    <h2 className="text-2xl font-medium">{section.title}</h2>
                  </div>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: preProcessCodeBlocks(section.content),
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={exportCodeLab}>
          Export
        </Button>
        <Button onClick={handleSave}>Save CodeLab</Button>
      </div>
    </div>
  );
}
