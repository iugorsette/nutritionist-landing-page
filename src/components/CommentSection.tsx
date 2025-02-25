import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, query, where, getDocs, orderBy, Timestamp, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Comment, CommentSectionProps } from "../types/Comment";
import { signInWithGoogle } from "../services/authServices";
import { FaGoogle, FaTrash, FaEdit, FaCheck, FaTimes } from "react-icons/fa";

export const CommentSection = ({ postId }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

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
    if (!newComment.trim() || !user) return;

    const newCommentData = {
      postId,
      authorId: user.uid,
      authorName: user.displayName || user.email || "Anônimo",
      content: newComment,
      createdAt: Timestamp.now(),
    };

    const docRef = await addDoc(collection(db, "comments"), newCommentData);
    setComments([{ id: docRef.id, ...newCommentData }, ...comments]);
    setNewComment("");
  };

  const handleDeleteComment = async (commentId: string) => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir este comentário?");
    if (!confirmDelete) return;

    await deleteDoc(doc(db, "comments", commentId));
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleEditComment = (comment: Comment) => {
    setEditingComment(comment.id);
    setEditText(comment.content);
  };

  const handleSaveEdit = async (commentId: string) => {
    if (!editText.trim()) return;

    const commentRef = doc(db, "comments", commentId);
    await updateDoc(commentRef, { content: editText });

    setComments(comments.map((comment) => (comment.id === commentId ? { ...comment, content: editText } : comment)));
    setEditingComment(null);
  };

  return (
    <div className="mt-8 p-6 bg-gray-100 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Comentários</h3>

      {user ? (
        <form onSubmit={handleAddComment} className="mb-4">
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
      ) : (
        <div className="flex items-baseline gap-2 content-center">
          <p className="mb-4">Faça login para comentar:</p>
          <button
            onClick={signInWithGoogle}
            className="flex items-center gap-2 bg-primary-ok hover:bg-blue-600 text-white px-4 py-2 rounded-full transition"
          >
            <FaGoogle /> Entrar com Google
          </button>
        </div>
      )}

      {loading ? (
        <p>Carregando comentários...</p>
      ) : (
        <ul>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <li key={comment.id} className="border-b py-2 flex justify-between items-center group">
                <div className="w-full">
                  <p className="font-semibold">{comment.authorName}</p>

                  {editingComment === comment.id ? (
                    <div className="flex items-center gap-2">
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="w-full px-2 py-1 border rounded-md"
                      />
                      <button
                        onClick={() => handleSaveEdit(comment.id)}
                        className="text-green-500 hover:text-green-700 transition"
                        title="Salvar"
                      >
                        <FaCheck />
                      </button>
                      <button
                        onClick={() => setEditingComment(null)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Cancelar"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="text-gray-700">{comment.content}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.createdAt.toDate()).toLocaleString()}
                      </p>
                    </>
                  )}
                </div>

                {user && user.uid === comment.authorId && editingComment !== comment.id && (
                  <div className="hidden group-hover:flex gap-2">
                    <button
                      onClick={() => handleEditComment(comment)}
                      className="text-blue-500 hover:text-blue-700 transition"
                      title="Editar"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-red-500 hover:text-red-700 transition"
                      title="Excluir"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
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
