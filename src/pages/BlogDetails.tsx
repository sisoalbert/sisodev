import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { useAuthStore } from "../store/authStore";
import ReadOnlySectionSidebar from "../components/ReadOnlySectionSidebar";
import Editor from "../components/Editor";
import type { Blog, Section } from "../types";

function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchBlogBySlug, deleteBlog, loading, error } = useBlogStore();
  const { user } = useAuthStore();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug).then((fetchedBlog) => {
        setBlog(fetchedBlog);
        if (fetchedBlog && fetchedBlog.sections.length > 0) {
          const sectionParam = searchParams.get('s');
          const targetSection = sectionParam ? 
            fetchedBlog.sections.find(section => section.id === sectionParam) :
            null;
          setCurrentSectionId(targetSection ? targetSection.id : fetchedBlog.sections[0].id);
        }
        setIsInitialLoading(false);
      });
    }
  }, [slug, fetchBlogBySlug, user]);

  useEffect(() => {
    if (blog && blog.sections.length > 0) {
      const sectionParam = searchParams.get('s');
      if (sectionParam) {
        const targetSection = blog.sections.find(section => section.id === sectionParam);
        if (targetSection && targetSection.id !== currentSectionId) {
          setCurrentSectionId(targetSection.id);
        }
      }
    }
  }, [searchParams, blog, currentSectionId]);

  const handleDeleteBlog = async () => {
    if (!blog) return;

    try {
      await deleteBlog(blog.id);
      const returnTo = searchParams.get("returnTo");
      navigate(returnTo || "/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
    setShowDeleteConfirm(false);
  };

  const handleSectionSelect = (section: Section) => {
    setCurrentSectionId(section.id);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('s', section.id);
    setSearchParams(newSearchParams);
  };

  const getCurrentSection = () => {
    return blog?.sections.find((section) => section.id === currentSectionId);
  };

  const getCurrentSectionIndex = () => {
    if (!blog || !currentSectionId) return -1;
    return blog.sections.findIndex(
      (section) => section.id === currentSectionId
    );
  };

  const handlePreviousSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0 && blog) {
      const prevSection = blog.sections[currentIndex - 1];
      setCurrentSectionId(prevSection.id);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('s', prevSection.id);
      setSearchParams(newSearchParams);
    }
  };

  const handleNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < (blog?.sections.length || 0) - 1 && blog) {
      const nextSection = blog.sections[currentIndex + 1];
      setCurrentSectionId(nextSection.id);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('s', nextSection.id);
      setSearchParams(newSearchParams);
    }
  };

  const currentSection = getCurrentSection();
  const currentIndex = getCurrentSectionIndex();
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < (blog?.sections.length || 0) - 1;

  if (loading || isInitialLoading) {
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

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#374151",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#dc2626",
            }}
          >
            Error Loading Blog
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "#6b7280" }}>{error}</p>
          <button
            onClick={() => {
              const returnTo = searchParams.get("returnTo");
              navigate(returnTo || "/");
            }}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#374151",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#1f2937",
            }}
          >
            Blog Post Not Found
          </h1>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
            The blog post "{slug}" could not be found.
          </p>
          <button
            onClick={() => {
              const returnTo = searchParams.get("returnTo");
              navigate(returnTo || "/");
            }}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#F9FAFB",
        display: "flex",
        overflow: "hidden", // Prevent body scrolling
      }}
    >
      <ReadOnlySectionSidebar
        sections={blog.sections}
        currentSectionId={currentSectionId}
        onSectionSelect={handleSectionSelect}
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
          paddingTop: "5rem", // Adjusted for navbar clearance
          paddingBottom: "2rem",
          gap: "1.5rem",
        }}
      >
        {/* Control Buttons */}
        <div
          style={{
            width: "100%",
            maxWidth: "8.5in",
            display: "flex",
            justifyContent: "flex-start",
            gap: "0.5rem",
            zIndex: 10,
          }}
        >
          <button
            onClick={() => {
              const returnTo = searchParams.get("returnTo");
              navigate(returnTo || "/");
            }}
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
            ← Back
          </button>

          {user && user.uid === blog.userId && (
            <>
              <button
                onClick={() => navigate(`/edit-blog/${blog.id}`)}
                style={{
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
                Edit
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(220, 38, 38, 0.8)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
        <div
          style={{
            width: "8.5in",
            // minHeight: "11in",
            backgroundColor: "white",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            color: "black",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            marginBottom: "6rem",
          }}
        >
          {/* Blue Header Section - Only show for first section */}
          {currentIndex === 0 && (
            <div
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "2rem",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexShrink: 0, // Prevent header from shrinking
              }}
            >
              <h1
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  lineHeight: "1.2",
                }}
              >
                {blog.title}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  fontSize: "0.875rem",
                  opacity: 0.9,
                  flexWrap: "wrap",
                }}
              >
                <span>
                  📅 Last updated:{" "}
                  {blog.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>👤 By: {blog.contributors || "Anonymous"}</span>
                <span>👁 Views: 43</span>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div
            style={{
              padding: "2rem",
              paddingTop: "1rem",
            }}
          >
            {currentSection && (
              <div>
                <div>
                  <Editor
                    content={currentSection.content}
                    onContentChange={() => {}}
                    isReadOnly={true}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section Navigation */}
          {blog && blog.sections.length > 1 && (
            <div
              style={{
                padding: "2rem 2rem 3rem 2rem",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {hasPrevious ? (
                <button
                  onClick={handlePreviousSection}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5e7eb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }}
                >
                  <span>←</span>
                  <span>
                    Previous:{" "}
                    {blog.sections[currentIndex - 1]?.name ||
                      `Section ${currentIndex}`}
                  </span>
                </button>
              ) : (
                <div></div>
              )}

              {hasNext ? (
                <button
                  onClick={handleNextSection}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#3b82f6";
                  }}
                >
                  <span>
                    Next:{" "}
                    {blog.sections[currentIndex + 1]?.name ||
                      `Section ${currentIndex + 2}`}
                  </span>
                  <span>→</span>
                </button>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1000",
          }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "8px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              maxWidth: "400px",
              width: "90%",
              margin: "16px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "16px",
              }}
            >
              Delete Blog Post
            </h3>

            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Are you sure you want to delete "{blog?.title}"? This action
              cannot be undone and the blog post will be permanently removed.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  backgroundColor: "#6b7280",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteBlog}
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#9ca3af" : "#dc2626",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
