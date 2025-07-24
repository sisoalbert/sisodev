import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import PublishModal from "../components/PublishModal";
import SectionSidebar from "../components/SectionSidebar";
import { useAuthStore } from "../store/authStore";
import { useBlogStore } from "../store/blogStore";
import type { Section, Blog, BlogStatus, Visibility } from "../types";
import SEO from "../components/SEO";
import { Menu, X } from "lucide-react";

// Media query hook for responsive behavior
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
          Loading blog post...
        </div>
      </div>
    );
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
    <>
      <SEO
        title={`Edit ${blog.title}`}
        description={`Edit your blog post: ${blog.title}. Make changes and update your content with our rich text editor.`}
        keywords={['edit blog', 'update article', 'blog editor', 'content management']}
      />
      <div
        style={{
          height: "100vh",
          backgroundColor: "#F9FAFB",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {/* Desktop Sidebar - Hidden on mobile */}
        {!isMobile && (
          <SectionSidebar
            sections={sections}
            currentSectionId={currentSectionId}
            onSectionSelect={handleSectionSelect}
            onAddSection={addSection}
            onRemoveSection={removeSection}
            onUpdateSectionName={handleUpdateSectionName}
          />
        )}

        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: "100vh",
            overflow: "auto",
            padding: isMobile ? "1rem" : "2rem",
            paddingTop: "5rem",
            paddingBottom: "2rem",
            gap: "1.5rem",
          }}
        >
          {/* Control Buttons */}
          <div
            style={{
              width: "100%",
              maxWidth: "8.5in",
              minWidth: "320px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "0.5rem",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => navigate(`/blogs/${blog.slug}`)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(107, 114, 128, 0.8)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                ← Back to Blog
              </button>
            </div>

            {/* Sections Menu Button - Only show on mobile */}
            {isMobile && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(59, 130, 246, 0.8)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                <Menu size={16} />
                Sections
              </button>
            )}
          </div>
          <div
            style={{
              width: "100%",
              maxWidth: "8.5in",
              minWidth: "320px",
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
              Update
            </button>
          </div>
          <div
            style={{
              padding: "2rem",
              paddingTop: "1rem",
            }}
          >
            <div 
              style={{ 
                marginTop: "3rem",
                marginLeft: "-2rem",
                marginRight: "-2rem",
              }}
            >
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

      {/* Mobile Sections Drawer - Only show on mobile */}
      {isMobile && isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            zIndex: "1000",
          }}
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            style={{
              width: "280px",
              maxWidth: "80vw",
              height: "100vh",
              backgroundColor: "#f8fafc",
              borderRight: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              transform: isSidebarOpen
                ? "translateX(0)"
                : "translateX(-100%)",
              transition: "transform 0.3s ease-in-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "1rem",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0,
                }}
              >
                Sections
              </h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  padding: "0.5rem",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} color="#6b7280" />
              </button>
            </div>

            {/* Sections List */}
            <div
              style={{
                flex: 1,
                padding: "1rem",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {sections.length === 0 ? (
                <div
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                  }}
                >
                  No sections available.
                </div>
              ) : (
                sections.map((section, index) => (
                  <div
                    key={section.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.375rem",
                      backgroundColor:
                        currentSectionId === section.id ? "#eff6ff" : "white",
                      borderColor:
                        currentSectionId === section.id
                          ? "#3b82f6"
                          : "#e2e8f0",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleSectionSelect(section);
                      setIsSidebarOpen(false);
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#374151",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {section.name || `Section ${index + 1}`}
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {/* Add Section Button */}
              <button
                onClick={() => {
                  addSection();
                  setIsSidebarOpen(false);
                }}
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  marginTop: "0.5rem",
                }}
              >
                + Add Section
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
}

export default EditBlog;