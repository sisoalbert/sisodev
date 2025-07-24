import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { useAuthStore } from "../store/authStore";
import { logBlogEvent } from "../lib/firebase";
import Footer from "../components/Footer";
import BlogCard from "../components/cards/BlogCard";
import { BlogCardShimmer } from "../components/shimmers";

function Blogs() {
  const { blogs, loading, error, fetchPublicBlogs } = useBlogStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPublicBlogs();
  }, [fetchPublicBlogs]);

  // Handle error state
  if (error && !error.includes("Missing or insufficient permissions")) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            flex: 1,
            display: "flex",
          }}
        >
          <div
            style={{
              textAlign: "center",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#dc2626",
                marginBottom: "8px",
              }}
            >
              Error loading blogs
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "16px" }}>{error}</p>
            <button
              onClick={() => window.location.reload()}
              style={{
                backgroundColor: "#dc2626",
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
              Try Again
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle empty state
  if (!loading && blogs.length === 0) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            flex: 1,
            display: "flex",
          }}
        >
          <div
            style={{
              textAlign: "center",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
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
                onClick={() => {
                  // Log analytics event for creating first blog
                  logBlogEvent.navigateToBlogDetails(
                    "",
                    "create-first-blog",
                    "empty_state_cta"
                  );
                  navigate("/create-blog");
                }}
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
        </div>
        <Footer />
      </div>
    );
  }

  // Normal state with blogs or loading
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

        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
              gap: "24px",
            }}
          >
            {Array.from({ length: 6 }).map((_, index) => (
              <BlogCardShimmer key={`shimmer-${index}`} />
            ))}
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
