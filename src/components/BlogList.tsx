import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { BlogCard } from "./BlogCard";
import { Post } from "../types/Post";

export const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center py-16">Carregando...</p>;
  }

  return (
    <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};
