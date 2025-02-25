import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { BlogCard } from "./BlogCard";
import { Post } from "../types/Post";
import { Search, X } from "lucide-react";
import { Loading } from "./Loading";

export const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-end mb-4">
        {!isSearchOpen ? (
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 bg-primary text-white rounded-full hover:bg-opacity-80 transition"
          >
            <Search size={20} />
          </button>
        ) : (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Pesquisar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchTerm("");
              }}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
            >
              <X size={20} />
            </button>
          </div>
        )}
      </div>

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => <BlogCard key={post.id} post={post} />)
        ) : (
          <p className="text-center col-span-3">Nenhum post encontrado.</p>
        )}
      </div>
    </div>
  );
};
