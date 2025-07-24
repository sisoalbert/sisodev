import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logBlogEvent } from '../../lib/firebase';
import type { Blog } from '../../types';

interface BlogCardProps {
  blog: Blog;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();
  const location = useLocation();

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
      onClick={() => {
        // Log analytics event for blog card click
        logBlogEvent.navigateToBlogDetails(blog.id, blog.slug, 'blog_card');
        navigate(`/blogs/${blog.slug}?returnTo=${encodeURIComponent(location.pathname)}`);
      }}
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

export default BlogCard;
