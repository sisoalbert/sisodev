import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { useAuthStore } from "../store/authStore";
import Footer from "../components/Footer";
import MyBlogCard from "../components/cards/MyBlogCard";

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
          <Link
            to="/login"
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
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      height: "100vh", 
      backgroundColor: "#f3f4f6",
      overflowY: "auto"
    }}>
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
          <Link
            to="/create-blog"
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
          </Link>
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
            <Link
              to="/create-blog"
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
            </Link>
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
              <MyBlogCard key={blog.id} blog={blog} onDelete={handleDelete} />
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

export default MyBlogs;
