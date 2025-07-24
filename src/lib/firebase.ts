import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (
  !firebaseConfig.apiKey ||
  !firebaseConfig.authDomain ||
  !firebaseConfig.projectId
) {
  throw new Error("Missing Firebase environment variables");
}

const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics: Analytics | null = null;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export { analytics };

// Custom event logging functions
export const logBlogEvent = {
  // Blog viewing events
  viewBlogList: () => {
    if (analytics) {
      logEvent(analytics, 'view_blog_list', {
        content_type: 'blog_list',
        timestamp: new Date().toISOString()
      });
    }
  },

  viewBlogPost: (blogId: string, blogTitle: string, authorId: string) => {
    if (analytics) {
      logEvent(analytics, 'view_blog_post', {
        content_type: 'blog_post',
        content_id: blogId,
        content_title: blogTitle,
        author_id: authorId,
        timestamp: new Date().toISOString()
      });
    }
  },

  // Blog interaction events
  createBlog: (blogId: string, blogTitle: string, category?: string) => {
    if (analytics) {
      logEvent(analytics, 'create_blog', {
        content_type: 'blog_post',
        content_id: blogId,
        content_title: blogTitle,
        category: category || 'uncategorized',
        timestamp: new Date().toISOString()
      });
    }
  },

  updateBlog: (blogId: string, blogTitle: string) => {
    if (analytics) {
      logEvent(analytics, 'update_blog', {
        content_type: 'blog_post',
        content_id: blogId,
        content_title: blogTitle,
        timestamp: new Date().toISOString()
      });
    }
  },

  deleteBlog: (blogId: string, blogTitle: string) => {
    if (analytics) {
      logEvent(analytics, 'delete_blog', {
        content_type: 'blog_post',
        content_id: blogId,
        content_title: blogTitle,
        timestamp: new Date().toISOString()
      });
    }
  },

  // Blog navigation events
  navigateToBlogDetails: (blogId: string, blogSlug: string, source: string) => {
    if (analytics) {
      logEvent(analytics, 'navigate_to_blog', {
        content_type: 'blog_post',
        content_id: blogId,
        content_slug: blogSlug,
        source: source, // 'blog_list', 'search', 'direct_link', etc.
        timestamp: new Date().toISOString()
      });
    }
  },

  // User engagement events
  searchBlogs: (searchTerm: string, resultsCount: number) => {
    if (analytics) {
      logEvent(analytics, 'search_blogs', {
        search_term: searchTerm,
        results_count: resultsCount,
        timestamp: new Date().toISOString()
      });
    }
  },

  // Error tracking
  blogError: (errorType: string, errorMessage: string, context?: string) => {
    if (analytics) {
      logEvent(analytics, 'blog_error', {
        error_type: errorType,
        error_message: errorMessage,
        context: context || 'unknown',
        timestamp: new Date().toISOString()
      });
    }
  }
};
