import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Post } from "../types/Post";

export const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];

      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:text-center">
        <h2 className="text-4xl font-script text-primary mb-4">Blog</h2>
        <p className="mt-4 max-w-2xl text-gray-500 lg:mx-auto">
          Confira os artigos mais recentes sobre alimentação saudável, dicas de nutrição e receitas deliciosas.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
              <p className="mt-2 text-gray-600">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-primary font-medium hover:underline">
                Ler mais →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
