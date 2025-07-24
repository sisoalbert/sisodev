import { create } from "zustand";
import { db } from "../lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import type { Blog } from "../types";
import { useAuthStore } from "./authStore";

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  createBlog: (
    blogData: Omit<Blog, "id" | "createdAt" | "updatedAt">
  ) => Promise<string>;
  updateBlog: (
    blogId: string,
    blogData: Omit<Blog, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  deleteBlog: (blogId: string) => Promise<void>;
  fetchPublicBlogs: () => Promise<void>;
  fetchMyBlogs: () => Promise<void>;
  fetchBlogById: (blogId: string) => Promise<Blog | null>;
  fetchBlogBySlug: (slug: string) => Promise<Blog | null>;
  clearError: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
  blogs: [],
  loading: false,
  error: null,

  createBlog: async (blogData) => {
    set({ loading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, "blogs"), {
        ...blogData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      set({ loading: false });
      return docRef.id;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  updateBlog: async (blogId: string, blogData) => {
    set({ loading: true, error: null });
    try {
      const blogRef = doc(db, "blogs", blogId);
      await updateDoc(blogRef, {
        ...blogData,
        updatedAt: serverTimestamp(),
      });
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  deleteBlog: async (blogId: string) => {
    set({ loading: true, error: null });
    try {
      const blogRef = doc(db, "blogs", blogId);
      await deleteDoc(blogRef);
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  fetchBlogById: async (blogId: string) => {
    set({ loading: true, error: null });
    try {
      const blogRef = doc(db, "blogs", blogId);
      const blogSnap = await getDoc(blogRef);

      if (blogSnap.exists()) {
        const data = blogSnap.data();
        const blog: Blog = {
          id: blogSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Blog;
        set({ loading: false });
        return blog;
      } else {
        set({ loading: false });
        return null;
      }
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return null;
    }
  },

  fetchPublicBlogs: async () => {
    set({ loading: true, error: null });

    // Get user state directly without triggering subscriptions
    const authState = useAuthStore.getState();
    const user = authState.user;

    try {
      let q;
      if (user) {
        // Authenticated users can use orderBy and see all blogs
        q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      } else {
        // Unauthenticated users use specific query for published and public blogs
        q = query(
          collection(db, "blogs"),
          where("status", "==", "published"),
          where("visibility", "==", "public")
        );
      }

      const querySnapshot = await getDocs(q);

      const blogs: Blog[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const blog = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Blog;

        if (user) {
          // For authenticated users, filter client-side to show only published and public
          if (blog.status === "published" && blog.visibility === "public") {
            blogs.push(blog);
          }
        } else {
          // For unauthenticated users, all returned blogs should already match the criteria
          blogs.push(blog);
        }
      });

      // Sort client-side if we didn't use orderBy
      if (!user) {
        blogs.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      }

      set({ blogs, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchMyBlogs: async () => {
    set({ loading: true, error: null });
    try {
      // Get the current user from auth
      const authState = useAuthStore.getState();
      const user = authState.user;

      if (!user) {
        set({ blogs: [], loading: false });
        return;
      }

      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const blogs: Blog[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const blog = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Blog;

        // Only include blogs owned by the current user (all statuses and visibility)
        if (blog.userId === user.uid) {
          blogs.push(blog);
        }
      });

      set({ blogs, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchBlogBySlug: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      // Get the current user from auth
      const authState = useAuthStore.getState();
      const user = authState.user;

      let q;
      if (user) {
        // Authenticated users can query all blogs and filter by slug
        q = query(collection(db, "blogs"), where("slug", "==", slug));
      } else {
        // Unauthenticated users can only access published and public blogs
        q = query(
          collection(db, "blogs"),
          where("slug", "==", slug),
          where("status", "==", "published"),
          where("visibility", "==", "public")
        );
      }

      const querySnapshot = await getDocs(q);
      let foundBlog: Blog | null = null;

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const blog = {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Blog;

        if (user) {
          // For authenticated users, check permissions
          const isPublishedAndPublic =
            blog.status === "published" && blog.visibility === "public";
          const isOwnedByUser = blog.userId === user.uid;

          // Allow access if the blog is public and published OR if the user owns the blog (regardless of status/visibility)
          if (isPublishedAndPublic || isOwnedByUser) {
            foundBlog = blog;
          }
        } else {
          // For unauthenticated users, the query already filtered for published and public
          foundBlog = blog;
        }
      });

      set({ loading: false });
      return foundBlog;
    } catch (error) {
      console.log(error);
      set({ error: (error as Error).message, loading: false });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));
