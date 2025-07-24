import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { useAuthStore } from "../store/authStore";
import Footer from "../components/Footer";
import BlogCard from "../components/cards/BlogCard";

function Blogs() {
  const { blogs, loading, error, fetchPublicBlogs } = useBlogStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublicBlogs();
  }, [fetchPublicBlogs]);

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#f3f4f6",
        overflowY: "auto",
      }}
    >
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
              <button
                onClick={() => navigate("/create-blog")}
                style={{
                  backgroundColor: "#3b82f6",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  display: "inline-block",
                }}
              >
                Create Your First Blog
              </button>
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
        {/* Add margin bottom before footer */}
        <div style={{ marginBottom: "32px" }} />
      </div>

      <Footer />
    </div>
  );
}

export default Blogs;
