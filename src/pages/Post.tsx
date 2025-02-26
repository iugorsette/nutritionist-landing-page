import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { CommentSection } from "../components/CommentSection";
import DOMPurify from "dompurify";

import { Post as PostData } from "../types/Post";

export const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<PostData | null>(null);
  const [postId, setPostId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false); // Estado para abrir/fechar modal

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      const q = query(collection(db, "posts"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setPost({
          id: doc.id,
          ...doc.data(),
        } as PostData);
        setPostId(doc.id);
      } else {
        setError("Post não encontrado.");
      }

      setLoading(false);
    };

    fetchPost();
  }, [slug]);

  if (loading) return <p className="text-center py-16">Carregando...</p>;
  if (error) return <p className="text-center py-16 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {post && (
        <>
          {/* Imagem clicável para abrir modal */}
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-md mb-6 cursor-pointer transition-transform hover:scale-105"
            onClick={() => setShowModal(true)}
          />

          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">{post.title}</h1>

          <div
            className="prose prose-lg mt-4 text-gray-600 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />

          {postId && <CommentSection postId={postId} />}

          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
              onClick={() => setShowModal(false)}
            >
              <div className="relative">
                <button
                  className="absolute top-2 right-2 text-white text-3xl font-bold"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="max-w-full max-h-screen rounded-lg"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
