import { create } from "zustand";
import { db } from "../lib/firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  getDocs, 
  query, 
  orderBy,
  doc,
  getDoc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
import type { Blog } from "../types";

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
  fetchBlogs: () => Promise<void>;
  fetchBlogById: (blogId: string) => Promise<Blog | null>;
  fetchBlogBySlug: (slug: string) => Promise<Blog | null>;
  clearError: () => void;
}

export const useBlogStore = create<BlogState>((set, get) => ({
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

  fetchBlogs: async () => {
    set({ loading: true, error: null });
    try {
      const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      
      const blogs: Blog[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        blogs.push({
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        } as Blog);
      });
      
      set({ blogs, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  fetchBlogBySlug: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const q = query(collection(db, "blogs"));
      const querySnapshot = await getDocs(q);
      
      let foundBlog: Blog | null = null;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.slug === slug) {
          foundBlog = {
            id: doc.id,
            ...data,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          } as Blog;
        }
      });
      
      set({ loading: false });
      return foundBlog;
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      return null;
    }
  },

  clearError: () => set({ error: null }),
}));
