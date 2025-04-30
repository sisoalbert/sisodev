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
  title: string;
  lastUpdated: string;
  authors: string[];
  sections: Section[];
  imageUrl?: string;
}
