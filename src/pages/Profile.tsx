import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Profile() {
  const { user, signOut, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        padding: "32px 16px",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <div
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
              fontSize: "30px",
              fontWeight: "bold",
              marginBottom: "24px",
              color: "#1f2937",
            }}
          >
            Profile
          </h1>

          <div style={{ marginBottom: "24px" }}>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#374151",
              }}
            >
              Account Information
            </h2>

            <div
              style={{
                backgroundColor: "#f9fafb",
                padding: "16px",
                borderRadius: "6px",
                marginBottom: "16px",
              }}
            >
              <div style={{ marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6b7280",
                    display: "block",
                  }}
                >
                  Email
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#1f2937",
                  }}
                >
                  {user?.email || "Not available"}
                </span>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6b7280",
                    display: "block",
                  }}
                >
                  User ID
                </span>
                <span
                  style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    fontFamily: "monospace",
                  }}
                >
                  {user?.uid || "Not available"}
                </span>
              </div>

              <div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#6b7280",
                    display: "block",
                  }}
                >
                  Account Created
                </span>
                <span
                  style={{
                    fontSize: "16px",
                    color: "#1f2937",
                  }}
                >
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString()
                    : "Not available"}
                </span>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              paddingTop: "24px",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "600",
                marginBottom: "16px",
                color: "#374151",
              }}
            >
              Account Actions
            </h2>

            <button
              onClick={handleSignOut}
              disabled={loading}
              style={{
                backgroundColor: loading ? "#9ca3af" : "#dc2626",
                color: "white",
                padding: "12px 24px",
                borderRadius: "6px",
                border: "none",
                fontSize: "16px",
                fontWeight: "500",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#b91c1c";
                }
              }}
              onMouseOut={(e) => {
                if (!loading) {
                  e.currentTarget.style.backgroundColor = "#dc2626";
                }
              }}
            >
              {loading ? "Signing Out..." : "Sign Out"}
            </button>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "12px",
              color: "#374151",
            }}
          >
            Quick Actions
          </h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
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
              Create New Blog
            </a>

            <a
              href="/blogs"
              style={{
                backgroundColor: "#6b7280",
                color: "white",
                padding: "10px 20px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              View All Blogs
            </a>
            <a
              href="/blogs/mine"
              style={{
                backgroundColor: "#6b7280",
                color: "white",
                padding: "10px 20px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
                display: "inline-block",
              }}
            >
              View My Blogs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
