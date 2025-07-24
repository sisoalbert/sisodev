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
  const [searchParams] = useSearchParams();
  const { fetchBlogBySlug, deleteBlog, loading, error } = useBlogStore();
  const { user } = useAuthStore();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug).then((fetchedBlog) => {
        setBlog(fetchedBlog);
        if (fetchedBlog && fetchedBlog.sections.length > 0) {
          setCurrentSectionId(fetchedBlog.sections[0].id);
        }
      });
    }
  }, [slug, fetchBlogBySlug, user]);

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
  };

  const getCurrentSection = () => {
    return blog?.sections.find((section) => section.id === currentSectionId);
  };

  const currentSection = getCurrentSection();

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#374151",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "18px", color: "#f3f4f6" }}>
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
        backgroundColor: "#374151",
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
          alignItems: "flex-start",
          justifyContent: "center",
          height: "100vh",
          overflow: "auto",
          padding: "2rem",
          paddingTop: "4rem", // Add top margin for navbar clearance
          paddingBottom: "4rem", // Add bottom margin
        }}
      >
        <div
          style={{
            width: "8.5in",
            height: "11in",
            backgroundColor: "white",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            color: "black",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Blue Header Section */}
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

          {/* Control Buttons */}
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

          {/* Content Area */}
          <div
            style={{
              flex: 1,
              overflow: "auto", // Enable scrolling for content area
              padding: "2rem",
              paddingTop: "1rem",
            }}
          >
            {currentSection && (
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "600",
                    color: "#1f2937",
                    marginBottom: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {currentSection.name}
                </h2>

                <div
                  style={{
                    flex: 1,
                    minHeight: 0,
                  }}
                >
                  <Editor
                    content={currentSection.content}
                    onContentChange={() => {}}
                    isReadOnly={true}
                  />
                </div>
              </div>
            )}
          </div>
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
