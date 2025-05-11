export interface Author {
  name: string;
}

export interface Section {
  id: string;
  order: number;
  title: string;
  content: string;
}

export interface CodelabData {
  id?: string;
  title: string;
  lastUpdated: string;
  authors: string[];
  sections: Section[];
  imageUrl?: string;
  creator_id?: string;
  status?: 'draft' | 'published';
  visibility?: 'private' | 'public';
  views?: number;
}
