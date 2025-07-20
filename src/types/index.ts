export type BlogStatus = "draft" | "published" | "deleted" | "archived" | "pending-review";

export type Visibility = "public" | "private" | "unlisted";

export interface Section {
  id: string;
  name: string;
  content: string;
}

export type Mode = "edit" | "preview";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  userId: string;
  subTitle?: string;
  imageUrl?: string;
  tags: string[];
  category?: string;
  contributors?: string;
  sections: Section[];
  status: BlogStatus;         // Controls lifecycle (draft, published, etc.)
  visibility: Visibility;     // Controls who can see it (access)
  createdAt: Date;
  updatedAt: Date;
}
