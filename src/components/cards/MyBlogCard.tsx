import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import type { Blog } from '../../types';

interface MyBlogCardProps {
  blog: Blog;
  onDelete: (blogId: string, blogTitle: string) => void;
}

const MyBlogCard: React.FC<MyBlogCardProps> = ({ blog, onDelete }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
          <button
            onClick={() => navigate(`/blogs/${blog.slug}?returnTo=${encodeURIComponent(
              location.pathname
            )}`)}
            style={{
              backgroundColor: "#f3f4f6",
              color: "#374151",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#e5e7eb";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#f3f4f6";
            }}
          >
            View
          </button>
          <button
            onClick={() => navigate(`/edit-blog/${blog.id}`)}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#2563eb";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#3b82f6";
            }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(blog.id, blog.title)}
            style={{
              backgroundColor: "#ef4444",
              color: "white",
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              fontSize: "14px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#dc2626";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#ef4444";
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBlogCard;
