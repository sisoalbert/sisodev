import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import logo from "../assets/logo.svg";

const MainNavBar: React.FC = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hasInitiallyLoaded, setHasInitiallyLoaded] = useState(false);
  const { user, loading: authLoading } = useAuthStore();
  const location = useLocation();

  // Track initial auth loading completion
  useEffect(() => {
    if (!authLoading && !hasInitiallyLoaded) {
      setHasInitiallyLoaded(true);
    }
  }, [authLoading, hasInitiallyLoaded]);

  // Listen for authentication state changes
  useEffect(() => {
    // Close mobile menu when authentication state changes
    setIsMenuOpen(false);
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Prevent body scrolling when menu is open
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);


  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Helper function to check if a link is active
  const isActiveLink = useCallback((path: string) => {
    if (path === "/blogs" && (location.pathname === "/" || location.pathname === "/blogs")) {
      return true;
    }
    return location.pathname === path;
  }, [location.pathname]);

  // Helper function to get link styles with hover and active states
  const getLinkStyles = useCallback((path: string, isMobileLink = false) => ({
    color: "#333333",
    textDecoration: "none",
    fontWeight: isActiveLink(path) ? 700 : 500,
    fontSize: "0.95rem",
    padding: isMobileLink ? "12px 16px" : undefined,
    transition: "all 0.2s ease",
    borderRadius: isMobileLink ? "4px" : undefined,
  }), [isActiveLink]);

  // Only show loading during initial auth resolution, not subsequent operations
  const shouldShowLoading = authLoading && !hasInitiallyLoaded;

  // Memoize desktop menu items to prevent re-renders when auth state is stable
  const desktopMenuItems = useMemo(() => {
    if (isMobile || shouldShowLoading) {
      return shouldShowLoading && !isMobile ? (
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "20px",
              backgroundColor: "#f3f4f6",
              borderRadius: "4px",
              animation: "pulse 1.5s ease-in-out infinite alternate",
            }}
          />
          <div
            style={{
              width: "80px",
              height: "20px",
              backgroundColor: "#f3f4f6",
              borderRadius: "4px",
              animation: "pulse 1.5s ease-in-out infinite alternate",
            }}
          />
        </div>
      ) : null;
    }

    return (
      <div
        style={{
          display: "flex",
          gap: "24px",
          transition: "all 0.3s ease",
        }}
      >
        {user ? (
          <>
            <Link
              to="/blogs/mine"
              style={getLinkStyles("/blogs/mine")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3B82F6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#333333";
              }}
            >
              My Blogs
            </Link>
            <Link
              to="/create-blog"
              style={getLinkStyles("/create-blog")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3B82F6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#333333";
              }}
            >
              Create Blog
            </Link>
            <Link
              to="/profile"
              style={getLinkStyles("/profile")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3B82F6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#333333";
              }}
            >
              Profile
            </Link>
          </>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <Link
              to="/login"
              style={getLinkStyles("/login")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3B82F6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#333333";
              }}
            >
              Login
            </Link>
            <Link
              to="/signup"
              style={{
                backgroundColor: isActiveLink("/signup") ? "#2563EB" : "#3B82F6",
                color: "#FFFFFF",
                padding: "8px 16px",
                borderRadius: "4px",
                textDecoration: "none",
                fontWeight: isActiveLink("/signup") ? 700 : 500,
                fontSize: "0.95rem",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#2563EB";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isActiveLink("/signup") ? "#2563EB" : "#3B82F6";
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    );
  }, [isMobile, shouldShowLoading, user, getLinkStyles, isActiveLink]);

  return (
    <>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          height: "64px",
        }}
      >
        {/* Logo section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginLeft: "16px",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src={logo}
              alt="Siso Dev Logo"
              style={{ height: "32px", width: "32px" }}
            />
            <span
              style={{
                marginLeft: "8px",
                fontWeight: 700,
                fontSize: "1.25rem",
                color: "#333333",
              }}
            >
              Siso Dev
            </span>
          </Link>

          {/* Only show Blogs link on desktop in the left section */}
          {!isMobile && (
            <Link
              to="/blogs"
              style={getLinkStyles("/blogs")}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3B82F6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#333333";
              }}
            >
              Blogs
            </Link>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            marginRight: "16px",
            transition: "all 0.3s ease",
          }}
        >
          {/* Desktop menu items */}
          {desktopMenuItems}

          {/* Mobile Menu Button */}
          {isMobile && (
            <button
              onClick={toggleMenu}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                zIndex: 1001,
              }}
              aria-label="Toggle mobile menu"
            >
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "#333333",
                  marginBottom: "5px",
                }}
              ></div>
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "#333333",
                  marginBottom: "5px",
                }}
              ></div>
              <div
                style={{
                  width: "24px",
                  height: "2px",
                  backgroundColor: "#333333",
                }}
              ></div>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile menu overlay and content */}
      {isMobile && isMenuOpen && (
        <>
          {/* Overlay with reduced opacity */}
          <div
            onClick={closeMenu}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              padding: "16px",
              zIndex: 1000,
              maxHeight: "calc(100vh - 64px)",
              overflowY: "auto",
            }}
          >
            {/* Always show Blogs link in mobile menu */}
            <Link
              to="/blogs"
              style={getLinkStyles("/blogs", true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#F3F4F6";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={closeMenu}
            >
              Blogs
            </Link>

            {!shouldShowLoading && (user ? (
              <>
                <Link
                  to="/blogs/mine"
                  style={getLinkStyles("/blogs/mine", true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onClick={closeMenu}
                >
                  My Blogs
                </Link>
                <Link
                  to="/create-blog"
                  style={getLinkStyles("/create-blog", true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onClick={closeMenu}
                >
                  Create Blog
                </Link>
                <Link
                  to="/profile"
                  style={getLinkStyles("/profile", true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onClick={closeMenu}
                >
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={getLinkStyles("/login", true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onClick={closeMenu}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  style={getLinkStyles("/signup", true)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#F3F4F6";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </>
            ))}
          </div>
        </>
      )}
    </>
  );
});

export default MainNavBar;
