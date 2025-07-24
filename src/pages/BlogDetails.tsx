import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useBlogStore } from "../store/blogStore";
import { useAuthStore } from "../store/authStore";
import { logBlogEvent } from "../lib/firebase";
import ReadOnlySectionSidebar from "../components/ReadOnlySectionSidebar";
import Editor from "../components/Editor";
import { Calendar, User, Eye, Menu, X } from "lucide-react";
import { LetterShimmer } from "../components/shimmers";
import type { Blog, Section } from "../types";
import SEO from "../components/SEO";

// Media query hook for responsive behavior
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [matches, query]);

  return matches;
}

function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fetchBlogBySlug, deleteBlog, loading, error } = useBlogStore();
  const { user } = useAuthStore();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    if (slug) {
      fetchBlogBySlug(slug).then((fetchedBlog) => {
        setBlog(fetchedBlog);
        if (fetchedBlog && fetchedBlog.sections.length > 0) {
          const sectionParam = searchParams.get('s');
          const targetSection = sectionParam ? 
            fetchedBlog.sections.find(section => section.id === sectionParam) :
            null;
          setCurrentSectionId(targetSection ? targetSection.id : fetchedBlog.sections[0].id);
          
          // Log analytics event for blog view
          logBlogEvent.viewBlogPost(fetchedBlog.id, fetchedBlog.title, fetchedBlog.userId);
        }
        setIsInitialLoading(false);
      });
    }
  }, [slug, fetchBlogBySlug, user]);

  useEffect(() => {
    if (blog && blog.sections.length > 0) {
      const sectionParam = searchParams.get('s');
      if (sectionParam) {
        const targetSection = blog.sections.find(section => section.id === sectionParam);
        if (targetSection && targetSection.id !== currentSectionId) {
          setCurrentSectionId(targetSection.id);
        }
      }
    }
  }, [searchParams, blog, currentSectionId]);

  const handleDeleteBlog = async () => {
    if (!blog) return;

    try {
      await deleteBlog(blog.id);
      const returnTo = searchParams.get("returnTo");
      navigate(returnTo || "/");
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
    setShowDeleteConfirm(false);
  };

  const handleSectionSelect = (section: Section) => {
    setCurrentSectionId(section.id);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('s', section.id);
    setSearchParams(newSearchParams);
  };

  const getCurrentSection = () => {
    return blog?.sections.find((section) => section.id === currentSectionId);
  };

  const getCurrentSectionIndex = () => {
    if (!blog || !currentSectionId) return -1;
    return blog.sections.findIndex(
      (section) => section.id === currentSectionId
    );
  };

  const handlePreviousSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex > 0 && blog) {
      const prevSection = blog.sections[currentIndex - 1];
      setCurrentSectionId(prevSection.id);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('s', prevSection.id);
      setSearchParams(newSearchParams);
    }
  };

  const handleNextSection = () => {
    const currentIndex = getCurrentSectionIndex();
    if (currentIndex < (blog?.sections.length || 0) - 1 && blog) {
      const nextSection = blog.sections[currentIndex + 1];
      setCurrentSectionId(nextSection.id);
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set('s', nextSection.id);
      setSearchParams(newSearchParams);
    }
  };

  const currentSection = getCurrentSection();
  const currentIndex = getCurrentSectionIndex();
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < (blog?.sections.length || 0) - 1;

  if (loading || isInitialLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#F9FAFB",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow:
              "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            width: "100%",
            maxWidth: "8.5in",
            minHeight: "11in",
          }}
        >
          {/* Blog title shimmer */}
          <LetterShimmer 
            lines={2} 
            wordsPerLine={[6, 8]} 
            showAvatar={false} 
            showTimestamp={false}
            style={{ marginBottom: "24px", border: "none", padding: "0" }}
          />
          
          {/* Blog metadata shimmer */}
          <LetterShimmer 
            lines={1} 
            wordsPerLine={[12]} 
            showAvatar={true} 
            showTimestamp={true}
            style={{ marginBottom: "32px", border: "none", padding: "0" }}
          />
          
          {/* Blog content paragraphs */}
          <LetterShimmer 
            lines={4} 
            wordsPerLine={[15, 18, 12, 16]} 
            showAvatar={false} 
            showTimestamp={false}
            style={{ marginBottom: "24px", border: "none", padding: "0" }}
          />
          
          <LetterShimmer 
            lines={3} 
            wordsPerLine={[14, 20, 8]} 
            showAvatar={false} 
            showTimestamp={false}
            style={{ marginBottom: "24px", border: "none", padding: "0" }}
          />
          
          <LetterShimmer 
            lines={5} 
            wordsPerLine={[12, 16, 18, 10, 14]} 
            showAvatar={false} 
            showTimestamp={false}
            style={{ marginBottom: "24px", border: "none", padding: "0" }}
          />
          
          <LetterShimmer 
            lines={2} 
            wordsPerLine={[16, 11]} 
            showAvatar={false} 
            showTimestamp={false}
            style={{ border: "none", padding: "0" }}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#374151",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#dc2626",
            }}
          >
            Error Loading Blog
          </h1>
          <p style={{ marginBottom: "1.5rem", color: "#6b7280" }}>{error}</p>
          <button
            onClick={() => {
              const returnTo = searchParams.get("returnTo");
              navigate(returnTo || "/");
            }}
            style={{
              backgroundColor: "#dc2626",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#374151",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "0.5rem",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#1f2937",
            }}
          >
            Blog Post Not Found
          </h1>
          <p style={{ color: "#6b7280", marginBottom: "1.5rem" }}>
            The blog post "{slug}" could not be found.
          </p>
          <button
            onClick={() => {
              const returnTo = searchParams.get("returnTo");
              navigate(returnTo || "/");
            }}
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.375rem",
              border: "none",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  // Create structured data for blog article
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.description || `Read ${blog.title} on SisoDev - Expert insights on software engineering and web development.`,
    author: {
      '@type': 'Person',
      name: blog.author || 'SisoDev Team',
      url: `https://sisodev.com/profile/${blog.userId}`
    },
    publisher: {
      '@type': 'Organization',
      name: 'SisoDev',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sisodev.com/logo.svg'
      }
    },
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt || blog.createdAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sisodev.com/blogs/${blog.slug}`
    },
    wordCount: blog.sections?.reduce((count, section) => count + (section.content?.length || 0), 0) || 0,
    keywords: blog.tags?.join(', ') || 'software engineering, programming, web development',
    about: {
      '@type': 'Thing',
      name: blog.category || 'Software Engineering'
    },
    articleSection: blog.category || 'Technology',
    inLanguage: 'en-US',
    url: `https://sisodev.com/blogs/${blog.slug}`
  };

  return (
    <>
      <SEO
        title={blog.title}
        description={blog.description || `Read ${blog.title} - Expert insights on software engineering, web development, and modern programming techniques.`}
        keywords={blog.tags || ['programming', 'software engineering', 'web development']}
        author={blog.author}
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt || blog.createdAt}
        type="article"
        structuredData={structuredData}
        canonical={`https://sisodev.com/blogs/${blog.slug}`}
      />
      <div
        style={{
          height: "100vh",
          backgroundColor: "#F9FAFB",
          display: "flex",
          overflow: "hidden", // Prevent body scrolling
        }}
      >
      {/* Desktop Sidebar - Hidden on mobile */}
      {!isMobile && (
        <ReadOnlySectionSidebar
          sections={blog.sections}
          currentSectionId={currentSectionId}
          onSectionSelect={handleSectionSelect}
        />
      )}

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: "100vh",
          overflow: "auto",
          padding: isMobile ? "1rem" : "2rem",
          paddingTop: "5rem", // Adjusted for navbar clearance
          paddingBottom: "2rem",
          gap: "1.5rem",
        }}
      >
        {/* Control Buttons */}
        <div
          style={{
            width: "100%",
            maxWidth: "8.5in",
            minWidth: "320px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "0.5rem",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={() => {
              const returnTo = searchParams.get("returnTo");
              navigate(returnTo || "/");
            }}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "rgba(107, 114, 128, 0.8)",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            ← Back
          </button>

          {user && user.uid === blog.userId && (
            <>
              <button
                onClick={() => navigate(`/edit-blog/${blog.id}`)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(59, 130, 246, 0.8)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "rgba(220, 38, 38, 0.8)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.375rem",
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                }}
              >
                Delete
              </button>
            </>
          )}
          </div>
          
          {/* Sections Menu Button - Only show on mobile */}
          {isMobile && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                backgroundColor: "rgba(59, 130, 246, 0.8)",
                color: "white",
                border: "none",
                borderRadius: "0.375rem",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
              }}
            >
              <Menu size={16} />
              Sections
            </button>
          )}
        </div>
        <div
          style={{
            width: "100%",
            maxWidth: "8.5in",
            minWidth: "320px",
            // minHeight: "11in",
            backgroundColor: "white",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            color: "black",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            marginBottom: "6rem",
          }}
        >
          {/* Blue Header Section - Only show for first section */}
          {currentIndex === 0 && (
            <div
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                padding: "2rem",
                minHeight: "200px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                flexShrink: 0, // Prevent header from shrinking
              }}
            >
              <h1
                style={{
                  fontSize: "2.25rem",
                  fontWeight: "bold",
                  marginBottom: "0.5rem",
                  lineHeight: "1.2",
                }}
              >
                {blog.title}
              </h1>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  fontSize: "0.875rem",
                  opacity: 0.9,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Calendar size={16} />
                  Last updated:{" "}
                  {blog.createdAt.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <User size={16} />
                  By: {blog.contributors || "Anonymous"}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Eye size={16} />
                  Views: 43
                </span>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div
            style={{
              padding: "2rem",
              paddingTop: "1rem",
            }}
          >
            {currentSection && (
              <div>
                <div>
                  <Editor
                    content={currentSection.content}
                    onContentChange={() => {}}
                    isReadOnly={true}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Section Navigation */}
          {blog && blog.sections.length > 1 && (
            <div
              style={{
                padding: "2rem 2rem 3rem 2rem",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {hasPrevious ? (
                <button
                  onClick={handlePreviousSection}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#f3f4f6",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5e7eb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                  }}
                >
                  <span>←</span>
                  <span>
                    Previous:{" "}
                    {blog.sections[currentIndex - 1]?.name ||
                      `Section ${currentIndex}`}
                  </span>
                </button>
              ) : (
                <div></div>
              )}

              {hasNext ? (
                <button
                  onClick={handleNextSection}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#2563eb";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#3b82f6";
                  }}
                >
                  <span>
                    Next:{" "}
                    {blog.sections[currentIndex + 1]?.name ||
                      `Section ${currentIndex + 2}`}
                  </span>
                  <span>→</span>
                </button>
              ) : (
                <div></div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sections Drawer - Only show on mobile */}
      {isMobile && isSidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            zIndex: "1000",
          }}
          onClick={() => setIsSidebarOpen(false)}
        >
          <div
            style={{
              width: "280px",
              maxWidth: "80vw",
              height: "100vh",
              backgroundColor: "#f8fafc",
              borderRight: "1px solid #e2e8f0",
              display: "flex",
              flexDirection: "column",
              transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
              transition: "transform 0.3s ease-in-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div
              style={{
                padding: "1rem",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "white",
              }}
            >
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#374151",
                  margin: 0,
                }}
              >
                Sections
              </h3>
              <button
                onClick={() => setIsSidebarOpen(false)}
                style={{
                  padding: "0.5rem",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "0.375rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} color="#6b7280" />
              </button>
            </div>

            {/* Sections List */}
            <div
              style={{
                flex: 1,
                padding: "1rem",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
              }}
            >
              {blog.sections.length === 0 ? (
                <div
                  style={{
                    padding: "1rem",
                    textAlign: "center",
                    color: "#6b7280",
                    fontSize: "0.875rem",
                  }}
                >
                  No sections available.
                </div>
              ) : (
                blog.sections.map((section, index) => (
                  <div
                    key={section.id}
                    style={{
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.375rem",
                      backgroundColor:
                        currentSectionId === section.id ? "#eff6ff" : "white",
                      borderColor:
                        currentSectionId === section.id ? "#3b82f6" : "#e2e8f0",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      handleSectionSelect(section);
                      setIsSidebarOpen(false);
                    }}
                  >
                    <div
                      style={{
                        padding: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.875rem",
                          fontWeight: "500",
                          color: "#374151",
                          marginBottom: "0.5rem",
                        }}
                      >
                        {section.name || `Section ${index + 1}`}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
            bottom: "0",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "1000",
          }}
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "32px",
              borderRadius: "8px",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
              maxWidth: "400px",
              width: "90%",
              margin: "16px",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "16px",
              }}
            >
              Delete Blog Post
            </h3>

            <p
              style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "24px",
                lineHeight: "1.5",
              }}
            >
              Are you sure you want to delete "{blog?.title}"? This action
              cannot be undone and the blog post will be permanently removed.
            </p>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-end",
              }}
            >
              <button
                onClick={() => setShowDeleteConfirm(false)}
                style={{
                  backgroundColor: "#6b7280",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleDeleteBlog}
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#9ca3af" : "#dc2626",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: loading ? "not-allowed" : "pointer",
                }}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default BlogDetails;
