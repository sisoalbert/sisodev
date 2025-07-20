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
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}
