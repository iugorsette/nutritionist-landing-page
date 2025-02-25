import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Trash, Edit, Plus } from "lucide-react";
import { Post } from "../types/Post";
import { Loading } from "../components/Loading";

export const AdminPanel = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId: string) => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      await deleteDoc(doc(db, "posts", postId));
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Painel de Administração 🚀</h1>
        <Link
          to="/admin/new"
          className="bg-primary text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-2" /> Criar Post
        </Link>
      </div>

      {loading ? (
        <>
        <Loading />;
        </>
      ) : posts.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
              <th className="border px-4 py-2 text-left">Título</th>
              <th className="border px-4 py-2 text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td className="border px-4 py-2 text-gray-500">{post.title}</td>
                <td className="flex items-center border pl-8 py-2 text-center space-x-2">
                  <Link to={`/admin/edit/${post.id}`} className="text-blue-500">
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500"
                  >
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">Nenhum post encontrado.</p>
      )}
    </div>
  );
};
