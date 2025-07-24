import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent, type Analytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, increment, serverTimestamp, getDoc } from "firebase/firestore";

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

// Page view tracking functions
export const pageViewService = {
  // Track a page view for a blog post
  trackPageView: async (blogId: string): Promise<void> => {
    try {
      const pageViewRef = doc(db, 'pageViews', blogId);
      
      // Use setDoc with merge to increment views or create if doesn't exist
      await setDoc(pageViewRef, {
        views: increment(1),
        lastUpdated: serverTimestamp()
      }, { merge: true });
      
      // Also log to analytics
      if (analytics) {
        logEvent(analytics, 'page_view', {
          content_type: 'blog_post',
          content_id: blogId,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error tracking page view:', error);
      // Log error to analytics
      if (analytics) {
        logEvent(analytics, 'page_view_error', {
          error_message: (error as Error).message,
          content_id: blogId,
          timestamp: new Date().toISOString()
        });
      }
    }
  },

  // Get page views for a blog post
  getPageViews: async (blogId: string): Promise<number> => {
    try {
      const pageViewRef = doc(db, 'pageViews', blogId);
      const pageViewSnap = await getDoc(pageViewRef);
      
      if (pageViewSnap.exists()) {
        const data = pageViewSnap.data();
        return data.views || 0;
      }
      return 0;
    } catch (error) {
      console.error('Error getting page views:', error);
      return 0;
    }
  },

  // Get page views for multiple blog posts
  getBulkPageViews: async (blogIds: string[]): Promise<Record<string, number>> => {
    const viewCounts: Record<string, number> = {};
    
    try {
      // Get all page view documents in parallel
      const promises = blogIds.map(async (blogId) => {
        const views = await pageViewService.getPageViews(blogId);
        return { blogId, views };
      });
      
      const results = await Promise.all(promises);
      
      // Convert to object format
      results.forEach(({ blogId, views }) => {
        viewCounts[blogId] = views;
      });
      
      return viewCounts;
    } catch (error) {
      console.error('Error getting bulk page views:', error);
      return viewCounts;
    }
  }
};
