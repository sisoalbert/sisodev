import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import PublishModal from "../components/PublishModal";
import SectionSidebar from "../components/SectionSidebar";
import { useAuthStore } from "../store/authStore";
import { useBlogStore } from "../store/blogStore";
import type { Section, Blog, BlogStatus, Visibility } from "../types";

function EditBlog() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { updateBlog, fetchBlogById, loading, error, clearError } = useBlogStore();
  
  const [blog, setBlog] = useState<Blog | null>(null);
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBlogById(id).then((fetchedBlog) => {
        if (fetchedBlog) {
          setBlog(fetchedBlog);
          setTitle(fetchedBlog.title);
          setSubTitle(fetchedBlog.subTitle || "");
          setImageUrl(fetchedBlog.imageUrl || "");
          setTags(fetchedBlog.tags.join(", "));
          setCategory(fetchedBlog.category || "");
          setContributors(fetchedBlog.contributors || "");
          setSections(fetchedBlog.sections);
          setStatus(fetchedBlog.status);
          setVisibility(fetchedBlog.visibility);
          if (fetchedBlog.sections.length > 0) {
            setCurrentSectionId(fetchedBlog.sections[0].id);
          }
        }
        setIsLoading(false);
      });
    }
  }, [id, fetchBlogById]);

  // Check if user owns this blog
  useEffect(() => {
    if (blog && user && blog.userId !== user.uid) {
      navigate('/');
    }
  }, [blog, user, navigate]);

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

    if (!user || !blog) {
      alert("You must be logged in and own this blog to edit it");
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

      await updateBlog(blog.id, blogData);
      navigate(`/blogs/${blogData.slug}`);
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const currentSection = getCurrentSection();

  React.useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  if (isLoading || loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f3f4f6',
        padding: '32px 16px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{
            backgroundColor: 'white',
            padding: '32px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h1 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '8px' }}>
              Blog Not Found
            </h1>
            <p style={{ color: '#6b7280', marginBottom: '16px' }}>
              The blog post you're trying to edit could not be found.
            </p>
            <button
              onClick={() => navigate('/')}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

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

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
              Update
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

export default EditBlog;