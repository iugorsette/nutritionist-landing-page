import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp } from "firebase/firestore";

interface Comment {
  id: string;
  authorName: string;
  content: string;
  createdAt: Timestamp;
}

interface CommentSectionProps {
  postId: string;
}

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      const q = query(collection(db, "comments"), where("postId", "==", postId), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(commentsData);
      setLoading(false);
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !authorName.trim()) return;

    const newCommentData = {
      postId,
      authorName,
      content: newComment,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "comments"), newCommentData);
    setComments([{ id: docRef.id, ...newCommentData }, ...comments]);
    setNewComment("");
    setAuthorName("");
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Comentários</h3>

      <form onSubmit={handleAddComment} className="mb-4">
        <input
          type="text"
          placeholder="Seu nome"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md mb-2"
        />
        <textarea
          placeholder="Escreva um comentário..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded-md"
        />
        <button type="submit" className="mt-2 bg-primary text-white px-4 py-2 rounded-md">
          Comentar
        </button>
      </form>

      {loading ? (
        <p>Carregando comentários...</p>
      ) : (
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.id} className="border-b py-2">
                <p className="font-semibold">{comment.authorName}</p>
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500">
                  {new Date(comment.createdAt.toDate()).toLocaleString()}
                </p>
              </li>
            ))
          ) : (
            <p className="text-gray-500">Nenhum comentário ainda. Seja o primeiro!</p>
          )}
        </ul>
      )}
    </div>
  );
};
