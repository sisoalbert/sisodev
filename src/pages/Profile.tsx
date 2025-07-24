import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { User, Plus, Eye, UserPen, LogOut, Settings } from "lucide-react";
import Footer from "../components/Footer";
import SEO from "../components/SEO";

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

  const getUserInitials = (email: string | null | undefined) => {
    if (!email) return "SD";
    const parts = email.split("@")[0].split(".");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return email.substring(0, 2).toUpperCase();
  };

  const formatDate = (timestamp: string | undefined) => {
    if (!timestamp) return "Not available";
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysActive = () => {
    if (!user?.metadata?.creationTime) return 0;
    const created = new Date(user.metadata.creationTime);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <>
      <SEO
        title={`Profile - ${user?.email || 'User'}`}
        description="Manage your SisoDev profile, view account statistics, and access your blog management dashboard."
        keywords={['profile', 'user account', 'dashboard', 'account settings', 'user stats']}
        type="profile"
      />
      <div
        className="profile-container"
        style={{
          height: "100vh",
          backgroundColor: "#F9FAFB",
          overflowY: "auto",
        }}
      >
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        {/* Fixed Left Sidebar - Profile Card */}
        <div
          className="profile-sidebar"
          style={{
            width: "400px",
            height: "100vh",
            background: "white",
            borderRight: "1px solid #E5E7EB",
            overflow: "auto",
            padding: "2rem",
            paddingTop: "5rem", // Account for navbar
            flexShrink: 0,
          }}
        >
          {/* Profile Header */}
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background: "#3b82f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1rem",
                fontSize: "3rem",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {getUserInitials(user?.email)}
            </div>
            <h1
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#374151",
                marginBottom: "0.5rem",
              }}
            >
              {user?.displayName || "SisoDev"}
            </h1>
            <p style={{ color: "#6B7280", fontSize: "1rem" }}>
              {/* Content Creator{" "} */}
              <span
                style={{
                  background: "#3b82f6",
                  color: "white",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "4px",
                  fontSize: "0.8rem",
                  fontWeight: "600",
                }}
              >
                Active
              </span>
            </p>
          </div>

          {/* Account Information */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontSize: "1.1rem",
                fontWeight: "600",
                color: "#374151",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <User size={20} color="#3b82f6" />
              Account Information
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ color: "#6B7280", fontWeight: "500" }}>Email</span>
              <span
                style={{
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                }}
              >
                {user?.email || "Not available"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ color: "#6B7280", fontWeight: "500" }}>
                User ID
              </span>
              <span
                style={{
                  color: "#374151",
                  fontWeight: "600",
                  fontFamily: "'SF Mono', Monaco, 'Cascadia Code', monospace",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (user?.uid) {
                    navigator.clipboard.writeText(user.uid);
                    // Could add a toast notification here
                  }
                }}
                title="Click to copy"
              >
                {user?.uid
                  ? `${user.uid.substring(0, 10)}...`
                  : "Not available"}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 0",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ color: "#6B7280", fontWeight: "500" }}>
                Member Since
              </span>
              <span
                style={{
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                }}
              >
                {formatDate(user?.metadata?.creationTime)}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 0",
              }}
            >
              <span style={{ color: "#6B7280", fontWeight: "500" }}>
                Account Status
              </span>
              <span
                style={{
                  color: "#374151",
                  fontWeight: "600",
                  fontSize: "0.9rem",
                }}
              >
                ✅ Verified
              </span>
            </div>
          </div>
        </div>

        {/* Scrollable Right Content Area - Actions Card */}
        <div
          className="profile-content"
          style={{
            flex: 1,
            height: "100vh",
            overflow: "auto",
            padding: "2rem",
            paddingTop: "5rem", // Account for navbar
            paddingBottom: "2rem",
          }}
        >
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              background: "white",
              borderRadius: "8px",
              padding: "2rem",
              border: "1px solid #E5E7EB",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* Stats Grid */}
            <div
              className="stats-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                marginBottom: "2rem",
              }}
            >
              <div
                style={{
                  background: "#F9FAFB",
                  borderRadius: "4px",
                  padding: "1.5rem",
                  textAlign: "center",
                  border: "1px solid #E5E7EB",
                }}
              >
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#374151",
                    display: "block",
                  }}
                >
                  0
                </span>
                <span
                  style={{
                    color: "#6B7280",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    display: "block",
                  }}
                >
                  Blogs Published
                </span>
              </div>
              <div
                style={{
                  background: "#F9FAFB",
                  borderRadius: "4px",
                  padding: "1.5rem",
                  textAlign: "center",
                  border: "1px solid #E5E7EB",
                }}
              >
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#374151",
                    display: "block",
                  }}
                >
                  0
                </span>
                <span
                  style={{
                    color: "#6B7280",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    display: "block",
                  }}
                >
                  Total Views
                </span>
              </div>
              <div
                style={{
                  background: "#F9FAFB",
                  borderRadius: "4px",
                  padding: "1.5rem",
                  textAlign: "center",
                  border: "1px solid #E5E7EB",
                }}
              >
                <span
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#374151",
                    display: "block",
                  }}
                >
                  {getDaysActive()}
                </span>
                <span
                  style={{
                    color: "#6B7280",
                    fontSize: "0.9rem",
                    marginTop: "0.5rem",
                    display: "block",
                  }}
                >
                  Days Active
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ marginBottom: "2rem" }}>
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Settings size={20} color="#3b82f6" />
                Quick Actions
              </h2>
              <div
                className="quick-actions"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() => navigate("/create-blog")}
                  style={{
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    padding: "1rem 1.5rem",
                    borderRadius: "4px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#2563eb";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#3b82f6";
                  }}
                >
                  <Plus size={16} />
                  Create New Blog
                </button>
                <button
                  onClick={() => navigate("/blogs")}
                  style={{
                    background: "#6B7280",
                    color: "white",
                    border: "none",
                    padding: "1rem 1.5rem",
                    borderRadius: "4px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#4B5563";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#6B7280";
                  }}
                >
                  <Eye size={16} />
                  View All Blogs
                </button>
                <button
                  onClick={() => navigate("/blogs/mine")}
                  style={{
                    background: "#6B7280",
                    color: "white",
                    border: "none",
                    padding: "1rem 1.5rem",
                    borderRadius: "4px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    textDecoration: "none",
                    fontSize: "0.95rem",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#4B5563";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#6B7280";
                  }}
                >
                  <UserPen size={16} />
                  View My Blogs
                </button>
              </div>
            </div>

            {/* Account Management */}
            <div>
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Settings size={20} color="#3b82f6" />
                Account Management
              </h2>
              <button
                onClick={handleSignOut}
                disabled={loading}
                style={{
                  background: "#3b82f6",
                  color: "white",
                  border: "none",
                  padding: "0.75rem 2rem",
                  borderRadius: "4px",
                  fontWeight: "600",
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  width: "100%",
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseOver={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#2563eb";
                  }
                }}
                onMouseOut={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#3b82f6";
                  }
                }}
              >
                <LogOut size={16} />
                {loading ? "Signing Out..." : "Sign Out"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add margin bottom before footer */}
      <div style={{ marginBottom: "32px" }} />

      {/* Footer inside scroll */}
      <Footer />

      {/* Mobile Responsive Styles */}
      <style>
        {`
          @media (max-width: 768px) {
            /* On mobile, stack the sidebar and content vertically and allow scrolling */
            .profile-container {
              flex-direction: column !important;
              height: auto !important;
              min-height: 100vh !important;
              overflow: visible !important;
            }
            .profile-sidebar {
              width: 100% !important;
              height: auto !important;
              border-right: none !important;
              border-bottom: 1px solid #E5E7EB !important;
              overflow: visible !important;
              padding-top: 5rem !important;
            }
            .profile-content {
              height: auto !important;
              overflow: visible !important;
              padding: 1rem !important;
              padding-top: 1rem !important;
            }
            .stats-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            .quick-actions {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>
    </div>
    </>
  );
}

export default Profile;
