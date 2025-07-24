import { useEffect } from "react";
import { useBlogStore } from "../store/blogStore";
import { useAuthStore } from "../store/authStore";
import type { Blog } from "../types";

function Blogs() {
  const { blogs, loading, error, fetchPublicBlogs } = useBlogStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchPublicBlogs();
  }, [fetchPublicBlogs]);

  const Navbar = () => {
    return (
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
    );
  };

  const BlogCard = ({ blog }: { blog: Blog }) => {
    return (
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          marginBottom: "24px",
          cursor: "pointer",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onClick={() => (window.location.href = `/blogs/${blog.slug}?returnTo=${encodeURIComponent(window.location.pathname)}`)}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow =
            "0 8px 15px -3px rgba(0, 0, 0, 0.1)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
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
          <h2
            style={{
              fontSize: "20px",
              fontWeight: "600",
              color: "#1f2937",
              marginBottom: "8px",
              lineHeight: "1.3",
            }}
          >
            {blog.title}
          </h2>

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
              <span
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  fontWeight: "500",
                }}
              >
                By {blog.contributors || "Anonymous"}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {blog.category && (
                <span
                  style={{
                    backgroundColor: "#e5e7eb",
                    color: "#374151",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    fontSize: "12px",
                    fontWeight: "500",
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
        </div>
      </div>
    );
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f3f4f6" }}>
      <Navbar />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 16px",
        }}
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            marginBottom: "24px",
            color: "#1f2937",
          }}
        >
          Blog Posts
        </h1>

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
              Loading blogs...
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
              No blog posts yet
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "16px" }}>
              Be the first to create a blog post!
            </p>
            {user && (
              <a
                href="/create-blog"
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  display: "inline-block",
                }}
              >
                Create Your First Blog
              </a>
            )}
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

export default Blogs;
