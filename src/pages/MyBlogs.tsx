import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { useAuthStore } from "../store/authStore";
import Footer from "../components/Footer";
import MyBlogCard from "../components/cards/MyBlogCard";
import SEO from "../components/SEO";

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

  // Handle error state
  if (error && !error.includes("Missing or insufficient permissions")) {
    return (
      <>
        <SEO
          title="My Blogs - Error"
          description="Unable to load your blog posts. Please try again or contact support if the issue persists."
          keywords={['my blogs', 'error', 'blog management', 'technical issues']}
        />
        <div
          style={{
            height: "100vh",
            backgroundColor: "#f3f4f6",
            display: "flex",
            flexDirection: "column",
          }}
        >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "32px 16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
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
            My Blogs
          </h1>
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
              Error loading your blogs
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
      </>
    );
  }

  if (!user) {
    return (
      <>
        <SEO
          title="My Blogs - Login Required"
          description="Please log in to access your personal blog collection. Manage, edit, and publish your content."
          keywords={['my blogs', 'login', 'blog management', 'user account']}
        />
        <div
          style={{
            height: "100vh",
            backgroundColor: "#f3f4f6",
            display: "flex",
            flexDirection: "column",
          }}
        >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "32px 16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
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
            My Blogs
          </h1>
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
              Please log in to view your blogs
            </h2>
            <p style={{ color: "#6b7280", marginBottom: "16px" }}>
              Access your personal blog collection
            </p>
            <Link
              to="/login"
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
              Login
            </Link>
          </div>
        </div>
        <Footer />
      </div>
      </>
    );
  }

  // Handle empty state
  if (!loading && blogs.length === 0) {
    return (
      <>
        <SEO
          title="My Blogs - Get Started"
          description="You haven't created any blog posts yet. Start sharing your thoughts and ideas with the world. Create your first blog today."
          keywords={['my blogs', 'create blog', 'get started', 'blog writing', 'content creation']}
        />
        <div
          style={{
            height: "100vh",
            backgroundColor: "#f3f4f6",
            display: "flex",
            flexDirection: "column",
          }}
        >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "32px 16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
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
            My Blogs
          </h1>
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
                padding: "10px 20px",
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
        </div>
        <Footer />
      </div>
      </>
    );
  }

  // Normal state with blogs or loading
  return (
    <>
      <SEO
        title="My Blogs"
        description={`Manage your ${blogs.length} blog posts. Edit, publish, and organize your content. Access your personal blog dashboard.`}
        keywords={['my blogs', 'blog management', 'dashboard', 'edit blogs', 'content management']}
      />
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
    </>
  );
}

export default MyBlogs;
