export type ReadingStatus = "to_read" | "reading" | "finished" | "paused";

export type Category =
  | "Finance"
  | "Investasi"
  | "Bisnis"
  | "Programming"
  | "Self Development";

export interface Book {
  id: string;
  user_id: string;
  title: string;
  author: string;
  category: Category;
  cover_url: string | null;
  status: ReadingStatus;
  progress: number; // 0-100
  rating: number | null;
  started_at: string | null;
  finished_at: string | null;
  created_at: string;
  tags: string[];
}

export interface BookNote {
  id: string;
  book_id: string;
  user_id: string;
  content: string;
  page_reference: string | null;
  created_at: string;
}

export interface TimelineEntry {
  id: string;
  book_id: string;
  title: string;
  event: string;
  created_at: string;
}
