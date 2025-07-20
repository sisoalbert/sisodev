import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useBlogStore } from "../store/blogStore";
import type { Section, BlogStatus, Visibility } from "../types";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [imageUrl, setImageUrl] = useState(
    "https://images.unsplash.com/photo-1752856188307-f93c2820db04?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  );
  const [tags, setTags] = useState("#webdev #javascript #typescript");
  const [category, setCategory] = useState("Web Development");
  const [contributors, setContributors] = useState("Anonymous");
  const [sections, setSections] = useState<Section[]>([
    { id: "1", name: "Introduction", content: "" },
  ]);
  const [status, setStatus] = useState<BlogStatus>("published");
  const [visibility, setVisibility] = useState<Visibility>("public");

  const { user } = useAuthStore();
  const { createBlog, loading, error, clearError } = useBlogStore();
  const navigate = useNavigate();

  const addSection = () => {
    const newSection: Section = {
      id: Date.now().toString(),
      name: "",
      content: "",
    };
    setSections([...sections, newSection]);
  };

  const updateSection = (
    id: string,
    field: "name" | "content",
    value: string
  ) => {
    setSections(
      sections.map((section) =>
        section.id === id ? { ...section, [field]: value } : section
      )
    );
  };

  const removeSection = (id: string) => {
    if (sections.length > 1) {
      setSections(sections.filter((section) => section.id !== id));
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a blog post");
      return;
    }

    if (
      sections.some(
        (section) => !section.name.trim() || !section.content.trim()
      )
    ) {
      alert("Please fill in all section names and content");
      return;
    }

    try {
      const blogData = {
        title: title.trim(),
        slug: generateSlug(title),
        userId: user.uid,
        subTitle: subTitle.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        category: category.trim() || undefined,
        contributors: contributors.trim() || undefined,
        sections,
        status,
        visibility,
      };

      await createBlog(blogData);
      navigate(`/blogs/${blogData.slug}`);
    } catch (error) {
      console.error("Error creating blog:", error);
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
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "32px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
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
            Create New Blog Post
          </h1>

          {error && (
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
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Basic Info */}
            <div style={{ marginBottom: "24px" }}>
              <h2
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  marginBottom: "16px",
                  color: "#374151",
                }}
              >
                Basic Information
              </h2>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    clearError();
                  }}
                  required
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Subtitle
                </label>
                <input
                  type="text"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Image URL
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              <div style={{ marginBottom: "16px" }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    marginBottom: "8px",
                    color: "#374151",
                  }}
                >
                  Contributors
                </label>
                <input
                  type="text"
                  value={contributors}
                  onChange={(e) => setContributors(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "4px",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                  onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "8px",
                      color: "#374151",
                    }}
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "16px",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "8px",
                      color: "#374151",
                    }}
                  >
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="react, javascript, tutorial"
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "16px",
                      outline: "none",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "8px",
                      color: "#374151",
                    }}
                  >
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as BlogStatus)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "16px",
                      outline: "none",
                      backgroundColor: "white",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="pending-review">Pending Review</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      marginBottom: "8px",
                      color: "#374151",
                    }}
                  >
                    Visibility
                  </label>
                  <select
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value as Visibility)}
                    style={{
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "4px",
                      fontSize: "16px",
                      outline: "none",
                      backgroundColor: "white",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                    onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="unlisted">Unlisted</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#374151",
                  }}
                >
                  Sections
                </h2>
                <button
                  type="button"
                  onClick={addSection}
                  style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: "none",
                    fontSize: "14px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Add Section
                </button>
              </div>

              {sections.map((section, index) => (
                <div
                  key={section.id}
                  style={{
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    padding: "16px",
                    marginBottom: "16px",
                    backgroundColor: "#f9fafb",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "12px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#6b7280",
                      }}
                    >
                      Section {index + 1}
                    </span>
                    {sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSection(section.id)}
                        style={{
                          backgroundColor: "#dc2626",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          border: "none",
                          fontSize: "12px",
                          cursor: "pointer",
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div style={{ marginBottom: "12px" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        marginBottom: "6px",
                        color: "#374151",
                      }}
                    >
                      Section Name *
                    </label>
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) =>
                        updateSection(section.id, "name", e.target.value)
                      }
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: "white",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        marginBottom: "6px",
                        color: "#374151",
                      }}
                    >
                      Content *
                    </label>
                    <textarea
                      value={section.content}
                      onChange={(e) =>
                        updateSection(section.id, "content", e.target.value)
                      }
                      required
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #d1d5db",
                        borderRadius: "4px",
                        fontSize: "14px",
                        outline: "none",
                        backgroundColor: "white",
                        resize: "vertical",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#3b82f6")}
                      onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                paddingTop: "24px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "12px",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/")}
                style={{
                  backgroundColor: "#6b7280",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#9ca3af" : "#3b82f6",
                  color: "white",
                  padding: "12px 24px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "500",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Creating..." : "Create Blog Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
