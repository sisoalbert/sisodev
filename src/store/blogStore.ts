import { create } from "zustand";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import type { Blog } from "../types";

interface BlogState {
  loading: boolean;
  error: string | null;
  createBlog: (
    blogData: Omit<Blog, "id" | "createdAt" | "updatedAt">
  ) => Promise<string>;
  clearError: () => void;
}

export const useBlogStore = create<BlogState>((set) => ({
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

  clearError: () => set({ error: null }),
}));
