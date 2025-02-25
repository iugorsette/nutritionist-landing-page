import { Timestamp } from "firebase/firestore";

export interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: Timestamp;
  authorId: string;
}

export interface CommentSectionProps {
  postId: string; 
}
