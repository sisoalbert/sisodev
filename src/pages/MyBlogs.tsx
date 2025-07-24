import { useEffect } from "react";
import { useBlogStore } from "../store/blogStore";
import { useAuthStore } from "../store/authStore";
import type { Blog } from "../types";

function MyBlogs() {
  const { blogs, loading, error, fetchMyBlogs, deleteBlog } = useBlogStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchMyBlogs();
  }, [fetchMyBlogs]);

  const handleDelete = async (blogId: string, blogTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${blogTitle}"?`)) {
      try {
        await deleteBlog(blogId);
        // Refresh the blogs list
        fetchMyBlogs();
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const BlogCard = ({ blog }: { blog: Blog }) => {
    const statusColor = {
      draft: "#f59e0b",
      published: "#10b981",
      archived: "#6b7280",
      deleted: "#ef4444",
      "pending-review": "#3b82f6",
    }[blog.status];

    const visibilityIcon = {
      public: "🌍",
      private: "🔒",
      unlisted: "👁️‍🗨️",
    }[blog.visibility];

    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          marginBottom: "24px",
        }}
      >
        {blog.imageUrl && (
          <div style={{ height: "200px", overflow: "hidden" }}>
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

        <div style={{ padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "12px",
            }}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "8px",
                lineHeight: "1.3",
                flex: 1,
                marginRight: "16px",
              }}
            >
              {blog.title}
            </h2>
            <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
              <span
                style={{
                  backgroundColor: statusColor,
                  color: "white",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontWeight: "500",
                  textTransform: "capitalize",
                }}
              >
                {blog.status}
              </span>
              <span
                style={{
                  fontSize: "16px",
                  padding: "2px",
                }}
                title={`Visibility: ${blog.visibility}`}
              >
                {visibilityIcon}
              </span>
            </div>
          </div>

          {blog.subTitle && (
            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "12px",
                lineHeight: "1.4",
              }}
            >
              {blog.subTitle}
            </p>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "16px",
            }}
          >
            <div>
              {blog.category && (
                <span
                  style={{
                    backgroundColor: "#e5e7eb",
                    color: "#374151",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
                    marginRight: "8px",
                  }}
                >
                  {blog.category}
                </span>
              )}
              <span
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                }}
              >
                {blog.createdAt.toLocaleDateString()}
              </span>
            </div>
          </div>

          {blog.tags && blog.tags.length > 0 && (
            <div style={{ marginTop: "12px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {blog.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      padding: "2px 6px",
                      borderRadius: "3px",
                      fontSize: "11px",
                      fontWeight: "500",
                    }}
                  >
                    {tag}
                  </span>
                ))}
                {blog.tags.length > 3 && (
                  <span
                    style={{
                      color: "#6b7280",
                      fontSize: "11px",
                    }}
                  >
                    +{blog.tags.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              gap: "8px",
              justifyContent: "flex-end",
            }}
          >
            <a
              href={`/blogs/${blog.slug}?returnTo=${encodeURIComponent(
                window.location.pathname
              )}`}
              style={{
                backgroundColor: "#f3f4f6",
                color: "#374151",
                padding: "8px 16px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                border: "1px solid #d1d5db",
              }}
            >
              View
            </a>
            <a
              href={`/edit-blog/${blog.id}`}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Edit
            </a>
            <button
              onClick={() => handleDelete(blog.id, blog.title)}
              style={{
                backgroundColor: "#ef4444",
                color: "white",
                padding: "8px 16px",
                borderRadius: "6px",
                border: "none",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (!user) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "32px 16px",
            textAlign: "center",
          }}
        >
          <h1 style={{ fontSize: "24px", marginBottom: "16px" }}>
            Please log in to view your blogs
          </h1>
          <a
            href="/login"
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "500",
            }}
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#1f2937",
            }}
          >
            My Blogs
          </h1>
          <a
            href="/create-blog"
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "12px 24px",
              borderRadius: "6px",
              textDecoration: "none",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Create New Blog
          </a>
        </div>

        {error && !error.includes("Missing or insufficient permissions") && (
          <div
            style={{
              backgroundColor: "#fee2e2",
              color: "#dc2626",
              padding: "12px",
              borderRadius: "4px",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            Error loading blogs: {error}
          </div>
        )}

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "#6b7280",
              }}
            >
              Loading your blogs...
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 16px",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "8px",
              }}
            >
              You haven't created any blogs yet
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "16px" }}>
              Start sharing your thoughts and ideas with the world!
            </p>
            <a
              href="/create-blog"
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "12px 24px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              Create Your First Blog
            </a>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "24px",
            }}
          >
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
