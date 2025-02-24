import { useState } from "react";
import { createPost } from "../services/postServices";
import { auth } from "../firebase"; 

export const NewPost = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const formatSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "") 
      .trim();
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return alert("Título e conteúdo são obrigatórios!");
    }
  
    if (!file) {
      return alert("Selecione uma imagem!");
    }
  
    const formattedSlug = formatSlug(slug || title);
    const user = auth.currentUser;
  
    if (!user) {
      return alert("Você precisa estar logado para criar um post!");
    }
  
    const postData = {
      title,
      excerpt,
      content,
      slug: formattedSlug,
      authorId: user.uid,
      authorName: user.displayName || "Usuário desconhecido", 
      authorAvatar: user.photoURL || "",
      createdAt: new Date(),
    };
  
    try {
      const response = await createPost(postData, file);
  
      if (response.success) {
        alert("Post criado com sucesso!");
      } else {
        alert("Erro ao criar post: " + response.error);
      }
    } catch (error) {
      console.error("Erro ao criar post:", error);
      alert("Ocorreu um erro ao salvar o post.");
    }
  };
  
  
  

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Novo Post</h2>
      <div>
      <label className="block text-sm font-medium text-gray-700">Título</label>
      <input 
        type="text" 
        placeholder="Título" 
        onChange={(e) => setTitle(e.target.value)} 
        required 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">Resumo</label>
      <input 
        type="text" 
        placeholder="Resumo" 
        onChange={(e) => setExcerpt(e.target.value)} 
        required 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
      <textarea 
        placeholder="Conteúdo" 
        onChange={(e) => setContent(e.target.value)} 
        required 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">Slug (ex: alimentacao-saudavel)</label>
      <input 
        type="text" 
        placeholder="Slug (ex: alimentacao-saudavel)" 
        onChange={(e) => setSlug(e.target.value)} 
        required 
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      </div>
      <div>
      <label className="block text-sm font-medium text-gray-700">Imagem</label>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files?.[0] || null)} 
        required 
        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-dark"
      />
      </div>
      <div className="flex justify-end">
        <button 
          type="submit" 
          className="bg-primary-alert text-white px-4 py-2 mt-4 rounded hover:bg-primary-ok focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Criar Post
        </button>
      </div>
    </form>
  );
};
