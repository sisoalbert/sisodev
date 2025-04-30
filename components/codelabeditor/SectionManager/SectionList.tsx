import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Section } from "@/types";
import SectionItem from "./SectionItem";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Input } from "@/components/ui/input";

interface SectionListProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
}

export default function SectionList({ sections, onChange }: SectionListProps) {
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [isAddingSection, setIsAddingSection] = useState(false);

  const handleUpdateSection = (updatedSection: Section) => {
    const updatedSections = sections.map((section) =>
      section.id === updatedSection.id ? updatedSection : section
    );
    onChange(updatedSections);
  };

  const handleDeleteSection = (id: string) => {
    const updatedSections = sections
      .filter((section) => section.id !== id)
      .map((section, index) => ({
        ...section,
        order: index + 1,
      }));
    onChange(updatedSections);
  };

  const handleMoveUp = (id: string) => {
    const sectionIndex = sections.findIndex((section) => section.id === id);
    if (sectionIndex <= 0) return;

    const updatedSections = [...sections];
    const temp = updatedSections[sectionIndex].order;
    updatedSections[sectionIndex].order =
      updatedSections[sectionIndex - 1].order;
    updatedSections[sectionIndex - 1].order = temp;

    onChange(updatedSections.sort((a, b) => a.order - b.order));
    toast.success("Section moved up");
  };

  const handleMoveDown = (id: string) => {
    const sectionIndex = sections.findIndex((section) => section.id === id);
    if (sectionIndex >= sections.length - 1) return;

    const updatedSections = [...sections];
    const temp = updatedSections[sectionIndex].order;
    updatedSections[sectionIndex].order =
      updatedSections[sectionIndex + 1].order;
    updatedSections[sectionIndex + 1].order = temp;

    onChange(updatedSections.sort((a, b) => a.order - b.order));
    toast.success("Section moved down");
  };

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) {
      toast.error("Section title cannot be empty");
      return;
    }

    const newSection: Section = {
      id: uuidv4(),
      order: sections.length + 1,
      title: newSectionTitle.trim(),
      content: "<p>Add your content here...</p>",
    };

    onChange([...sections, newSection]);
    setNewSectionTitle("");
    setIsAddingSection(false);
    toast.success("New section added");
  };

  return (
    <div className="space-y-4">
      {sections.map((section, index) => (
        <SectionItem
          key={section.id}
          section={section}
          onUpdate={handleUpdateSection}
          onDelete={handleDeleteSection}
          onMoveUp={handleMoveUp}
          onMoveDown={handleMoveDown}
          isFirst={index === 0}
          isLast={index === sections.length - 1}
        />
      ))}

      {isAddingSection ? (
        <div className="flex items-center gap-2 mt-4">
          <Input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Section Title"
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddSection();
            }}
          />
          <Button onClick={handleAddSection}>Add</Button>
          <Button
            variant="outline"
            onClick={() => {
              setIsAddingSection(false);
              setNewSectionTitle("");
            }}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <Button
          variant="outline"
          onClick={() => setIsAddingSection(true)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" /> Add Section
        </Button>
      )}
    </div>
  );
}
