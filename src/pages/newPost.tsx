import { useState } from "react";
import { createPost } from "../services/postServices";
import { auth } from "../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const NewPost = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [slug, setSlug] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const formatSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
      .trim();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
    }
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">Novo Post</h2>
      
      <label className="block text-sm font-medium text-gray-700">Título</label>
      <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required 
        className="w-full px-3 py-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700">Resumo</label>
      <input 
        type="text" 
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        required 
        className="w-full px-3 py-2 border rounded-md"
      />
      
      <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
      <ReactQuill 
        value={content} 
        onChange={setContent} 
        className="bg-white border rounded-md"
      />
      
      <label className="block text-sm font-medium text-gray-700">Slug</label>
      <input 
        type="text" 
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        className="w-full px-3 py-2 border rounded-md"
      />
      
      <label className="block text-sm font-medium text-gray-700">Imagem</label>
      <input type="file" onChange={handleFileChange} required className="w-full text-sm text-gray-500" />
      
      {previewUrl && (
        <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover mt-2 rounded-md" />
      )}
      
      <div className="flex justify-end">
      <button 
        type="submit" 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Criar Post
      </button>
      </div>
    </form>
  );
};
