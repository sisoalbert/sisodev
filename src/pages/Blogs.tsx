import React from "react";

function Blogs() {
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
          </div>
        </div>
      </nav>
    );
  };
  return (
    <div>
      <Navbar />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "32px 16px",
          backgroundColor: "#f3f4f6",
        }}
      >
        <h1
          style={{ fontSize: "30px", fontWeight: "bold", marginBottom: "24px" }}
        >
          Blog Posts
        </h1>
        <p style={{ color: "#6b7280" }}>Blog listing page coming soon...</p>
      </div>
    </div>
  );
}

export default Blogs;
