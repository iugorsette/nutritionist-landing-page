import { Timestamp } from "firebase/firestore";

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  slug: string;
  createdAt: Timestamp; 
}
