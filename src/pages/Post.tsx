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
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
          <h1 className="text-4xl font-bold text-gray-900">{post.title}</h1>
          <div 
            className="prose prose-lg mt-4 text-gray-600"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />
          {postId && <CommentSection postId={postId} />}
        </>
      )}
    </div>
  );
};
