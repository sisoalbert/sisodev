import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/types";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Pencil, Eye } from "lucide-react";

interface SectionItemProps {
  section: Section;
  onUpdate: (updatedSection: Section) => void;
  onDelete: (id: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function SectionItem({
  section,
  onUpdate,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}: SectionItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [title, setTitle] = useState(section.title);
  const [content, setContent] = useState(section.content);

  const handleSave = () => {
    if (!title.trim()) {
      toast.error("Section title cannot be empty");
      return;
    }

    onUpdate({
      ...section,
      title,
      content,
    });
    setIsEditing(false);
    toast.success("Section updated");
  };

  const handleCancel = () => {
    setTitle(section.title);
    setContent(section.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this section?")) {
      onDelete(section.id);
      toast.success("Section deleted");
    }
  };

  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between py-3">
        {isEditing ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Section Title"
            className="w-full mr-2"
          />
        ) : (
          <div className="font-medium flex items-center gap-2">
            <span className="bg-primary/10 px-2 py-1 rounded text-xs">
              {section.order}
            </span>
            <span>{section.title}</span>
          </div>
        )}

        <div className="flex items-center gap-1">
          {!isFirst && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMoveUp(section.id)}
              title="Move Up"
            >
              ↑
            </Button>
          )}
          {!isLast && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMoveDown(section.id)}
              title="Move Down"
            >
              ↓
            </Button>
          )}

          {!isEditing && (
            <Button variant="outline" size="sm" onClick={togglePreview}>
              {isPreview ? (
                <Pencil className="h-3.5 w-3.5 mr-1" />
              ) : (
                <Eye className="h-3.5 w-3.5 mr-1" />
              )}
              {isPreview ? "Edit" : "Preview"}
            </Button>
          )}

          {isEditing ? (
            <>
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button variant="default" size="sm" onClick={handleSave}>
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </>
          )}
        </div>
      </CardHeader>

      {isEditing ? (
        <CardContent>
          <Label htmlFor="section-content">Content</Label>
          <RichTextEditor
            initialContent={content}
            onChange={setContent}
            className="mt-2"
          />
        </CardContent>
      ) : (
        <CardContent>
          {isPreview ? (
            <div
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            <div className="prose prose-sm max-w-none line-clamp-3 text-muted-foreground">
              {content.replace(/<[^>]*>/g, " ").substring(0, 150)}
              {content.length > 150 && "..."}
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}
