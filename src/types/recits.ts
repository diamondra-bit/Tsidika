export interface Recit {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  category: string;
  cover_image: string;
  featured: boolean;
  published: boolean;
  read_time: number;
  created_at: string;
}