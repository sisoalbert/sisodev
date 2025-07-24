import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import PublishModal from "../components/PublishModal";
import SectionSidebar from "../components/SectionSidebar";
import { useAuthStore } from "../store/authStore";
import { useBlogStore } from "../store/blogStore";
import type { Section, BlogStatus, Visibility } from "../types";
import SEO from "../components/SEO";

function CreateBlog() {
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [mode, setMode] = useState("edit");
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [contributors, setContributors] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [status, setStatus] = useState<BlogStatus>("published");
  const [visibility, setVisibility] = useState<Visibility>("public");

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
    return sections.find((section) => section.id === currentSectionId);
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

  React.useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F9FAFB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            fontSize: "1.125rem",
            color: "#4B5563",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            width: "100%",
            maxWidth: "8.5in",
            minHeight: "11in",
            textAlign: "center",
          }}
        >
          Creating blog post...
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Create New Blog"
        description="Write and publish your technical insights. Create engaging blog posts with our rich text editor and share your knowledge with the developer community."
        keywords={['create blog', 'write article', 'publish content', 'blog editor', 'content creation']}
      />
      <div
      style={{
        height: "100vh",
        backgroundColor: "#F9FAFB",
        display: "flex",
        overflow: "hidden",
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

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          overflow: "auto",
          padding: "2rem",
          paddingTop: "5rem",
          paddingBottom: "2rem",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            width: "8.5in",
            minHeight: "11in",
            backgroundColor: "white",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            color: "black",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            marginBottom: "6rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              display: "flex",
              gap: "0.5rem",
              zIndex: 10,
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
          <div
            style={{
              padding: "2rem",
              paddingTop: "1rem",
            }}
          >
            <div style={{ marginTop: "3rem" }}>
              <Editor
                content={currentSection?.content || ""}
                onContentChange={handleContentChange}
                isReadOnly={mode === "preview"}
              />
            </div>
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
    </>
  );
}

export default CreateBlog;
