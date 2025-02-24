import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Post } from "../types/Post";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  const formattedPosts = useMemo(() => {
    return posts.map(post => ({
      ...post,
      formattedDate: format(new Date(post.createdAt.toDate()), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
    }));
  }, [posts]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="lg:text-center">
        <h2 className="text-4xl font-script text-primary mb-4">Blog</h2>
        <p className="mt-4 max-w-2xl text-gray-500 lg:mx-auto">
          Confira os artigos mais recentes sobre alimentação saudável, dicas de nutrição e receitas deliciosas.
        </p>
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {formattedPosts.map(post => (
          <Link to={`/blog/${post.slug}`} >
            <div key={post.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-fit"  loading="lazy"/>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                {/* <p className="text-gray-500 text-sm">Por {post.authorName}</p> */}
                <p className="mt-2 text-gray-600">{post.excerpt}</p>
                <p className="text-sm text-gray-500 italic mt-2 text-right">
                  Publicado em {format(new Date(post.createdAt.toDate()), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                </p>
                <span 
                  className="mt-4 inline-block text-primary font-medium hover:underline">
                  Ler mais →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
