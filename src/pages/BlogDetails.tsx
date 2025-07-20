import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { useAuthStore } from "../store/authStore";
import type { Blog } from "../types";

function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { fetchBlogBySlug, deleteBlog, loading, error } = useBlogStore();
  const { user } = useAuthStore();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug).then(setBlog);
    }
  }, [slug, fetchBlogBySlug]);

  const handleDeleteBlog = async () => {
    if (!blog) return;

    try {
      await deleteBlog(blog.id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
    setShowDeleteConfirm(false);
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "18px", color: "#6b7280" }}>
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
          backgroundColor: "#f3f4f6",
          padding: "32px 16px",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "16px",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Error Loading Blog
            </h1>
            <p>{error}</p>
            <button
              onClick={() => navigate("/")}
              style={{
                backgroundColor: "#dc2626",
                color: "white",
                padding: "8px 16px",
                borderRadius: "4px",
                border: "none",
                marginTop: "12px",
                cursor: "pointer",
              }}
            >
              Back to Blogs
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#f3f4f6",
          padding: "32px 16px",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              Blog Post Not Found
            </h1>
            <p style={{ color: "#6b7280", marginBottom: "16px" }}>
              The blog post "{slug}" could not be found.
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "10px 20px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
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
        backgroundColor: "#f3f4f6",
        paddingBottom: "32px",
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{ backgroundColor: "#1f2937", color: "white", padding: "16px" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>
            <a
              href="/"
              style={{
                marginRight: "16px",
                color: "white",
                textDecoration: "none",
              }}
            >
              SisoDev
            </a>
          </div>
          <div>
            <a
              href="/"
              style={{
                marginRight: "16px",
                color: "white",
                textDecoration: "none",
              }}
            >
              All Blogs
            </a>

            <>
              <a
                href="/create-blog"
                style={{
                  marginRight: "16px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Create Blog
              </a>
              <a
                href="/profile"
                style={{
                  marginRight: "16px",
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Profile
              </a>
            </>
          </div>
        </div>
      </nav>

      {/* Blog Content */}
      <article
        style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 16px" }}
      >
        {/* Hero Image */}
        {blog.imageUrl && (
          <div
            style={{
              marginBottom: "32px",
              borderRadius: "8px",
              overflow: "hidden",
              height: "400px",
            }}
          >
            <img
              src={blog.imageUrl}
              alt={blog.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        {/* Blog Header */}
        <header
          style={{
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            marginBottom: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              color: "#1f2937",
              marginBottom: "12px",
              lineHeight: "1.2",
            }}
          >
            {blog.title}
          </h1>

          {blog.subTitle && (
            <p
              style={{
                fontSize: "18px",
                color: "#6b7280",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              {blog.subTitle}
            </p>
          )}

          {/* Meta Information */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "16px",
              paddingTop: "16px",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#6b7280" }}>By</span>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                {blog.contributors || "Anonymous"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontSize: "14px", color: "#6b7280" }}>
                Published
              </span>
              <span style={{ fontSize: "14px", color: "#374151" }}>
                {blog.createdAt.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {blog.category && (
              <div>
                <span
                  style={{
                    backgroundColor: "#e5e7eb",
                    color: "#374151",
                    padding: "4px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  {blog.category}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {blog.tags.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "500",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </header>

        {/* Blog Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {blog.sections.map((section, index) => (
            <section
              key={section.id}
              style={{
                backgroundColor: "white",
                padding: "32px",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#1f2937",
                  marginBottom: "16px",
                  paddingBottom: "8px",
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                {section.name}
              </h2>

              <div
                style={{
                  fontSize: "16px",
                  lineHeight: "1.7",
                  color: "#374151",
                  whiteSpace: "pre-wrap",
                }}
              >
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            marginTop: "32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => navigate("/")}
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
              ← Back to All Blogs
            </button>

            {user && user.uid === blog.userId && (
              <>
                <button
                  onClick={() => navigate(`/edit-blog/${blog.id}`)}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Edit Blog
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Delete Blog
                </button>
              </>
            )}
          </div>
        </footer>
      </article>

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
