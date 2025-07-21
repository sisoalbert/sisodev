import React from "react";
import Editor from "../components/Editor";
import PublishModal from "../components/PublishModal";
import SectionSidebar from "../components/SectionSidebar";
import { useAuthStore } from "../store/authStore";
import { useBlogStore } from "../store/blogStore";
import { useNavigate } from "react-router-dom";
import type { Section, BlogStatus, Visibility } from "../types";
function EditorPage() {
  const [currentSectionId, setCurrentSectionId] = React.useState<string | null>(null);
  const [mode, setMode] = React.useState("edit");
  const [isPublishModalOpen, setIsPublishModalOpen] = React.useState(false);
  const [sections, setSections] = React.useState<Section[]>([]);
  const [title, setTitle] = React.useState("");
  const [subTitle, setSubTitle] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [contributors, setContributors] = React.useState("");
  const [status, setStatus] = React.useState<BlogStatus>("published");
  const [visibility, setVisibility] = React.useState<Visibility>("public");

  const { user } = useAuthStore();
  const { createBlog, loading, error, clearError } = useBlogStore();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (sections.length === 0) {
      const firstSection: Section = {
        id: Date.now().toString(),
        name: "Introduction",
        content: "",
      };
      setSections([firstSection]);
      setCurrentSectionId(firstSection.id);
    }
  }, [sections.length]);

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      name: `Section ${sections.length + 1}`,
      content: "",
    };
    setSections([...sections, newSection]);
    setCurrentSectionId(newSection.id);
  };

  const updateSection = (
    id: string,
    field: "name" | "content",
    value: string
  ) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      const newSections = sections.filter((section) => section.id !== id);
      setSections(newSections);
      if (currentSectionId === id && newSections.length > 0) {
        setCurrentSectionId(newSections[0].id);
      }
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleContentChange = (content: string) => {
    if (currentSectionId) {
      updateSection(currentSectionId, "content", content);
    }
  };

  const handleSectionSelect = (section: Section) => {
    setCurrentSectionId(section.id);
  };

  const handleUpdateSectionName = (id: string, name: string) => {
    updateSection(id, "name", name);
  };

  const getCurrentSection = () => {
    return sections.find(section => section.id === currentSectionId);
  };

  const handleModeChange = (mode: string) => {
    setMode(mode);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a blog post");
      return;
    }

    if (
      sections.some(
        (section) => !section.name.trim() || !section.content.trim()
      )
    ) {
      alert("Please fill in all section names and content");
      return;
    }

    try {
      const blogData = {
        title: title.trim(),
        slug: generateSlug(title),
        userId: user.uid,
        subTitle: subTitle.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        category: category.trim() || undefined,
        contributors: contributors.trim() || undefined,
        sections,
        status,
        visibility,
      };

      await createBlog(blogData);
      navigate(`/blogs/${blogData.slug}`);
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };

  const currentSection = getCurrentSection();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#374151",
        display: "flex",
        padding: "2rem",
        gap: "2rem",
      }}
    >
      <SectionSidebar
        sections={sections}
        currentSectionId={currentSectionId}
        onSectionSelect={handleSectionSelect}
        onAddSection={addSection}
        onRemoveSection={removeSection}
        onUpdateSectionName={handleUpdateSectionName}
      />
      
      <div style={{ 
        flex: 1, 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center" 
      }}>
        <div
          style={{
            width: "8.5in",
            height: "11in",
            backgroundColor: "white",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            padding: "2rem",
            color: "black",
            position: "relative",
          }}
        >
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            gap: "0.5rem",
          }}
        >
          {mode === "edit" ? (
            <button
              onClick={() => handleModeChange("preview")}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Preview
            </button>
          ) : (
            <button
              onClick={() => handleModeChange("edit")}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#6b7280",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              Edit
            </button>
          )}
          <button
            onClick={() => setIsPublishModalOpen(true)}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#10b981",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Publish
          </button>
        </div>
          <div style={{ marginTop: "3rem" }}>
            <Editor
              content={currentSection?.content || ""}
              onContentChange={handleContentChange}
              isReadOnly={mode === "preview"}
            />
          </div>
        </div>
      </div>

      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublish}
        title={title}
        setTitle={setTitle}
        subTitle={subTitle}
        setSubTitle={setSubTitle}
        imageUrl={imageUrl}
        setImageUrl={setImageUrl}
        contributors={contributors}
        setContributors={setContributors}
        category={category}
        setCategory={setCategory}
        tags={tags}
        setTags={setTags}
        status={status}
        setStatus={setStatus}
        visibility={visibility}
        setVisibility={setVisibility}
      />
    </div>
  );
}

export default EditorPage;
