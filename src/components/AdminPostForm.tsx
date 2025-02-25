import { useState, useEffect } from "react";
import { createPost, updatePost, getPostById } from "../services/postServices";
import { auth } from "../firebase";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";

interface AdminPostFormProps {
  onPostUpdated?: () => void;
}

export const AdminPostForm = ({ onPostUpdated }: AdminPostFormProps) => {
  const { id } = useParams();

  const [postForm, setPostForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    slug: "",
    imageUrl: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      getPostById(id).then(({ post }) => {
        if (post) {
          setPostForm({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            slug: post.slug,
            imageUrl: post.imageUrl || "",
          });
          setPreviewUrl(post.imageUrl || null);
        }
      });
    }
  }, [id]);

  const formatSlug = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { title, content, slug } = postForm;

    if (!title.trim() || !content.trim()) {
      return alert("Título e conteúdo são obrigatórios!");
    }
    if (!file && !id) {
      return alert("Selecione uma imagem!");
    }

    const formattedSlug = formatSlug(slug || title);
    const user = auth.currentUser;
    if (!user) {
      return alert("Você precisa estar logado para criar ou editar um post!");
    }

    const postData = {
      ...postForm,
      slug: formattedSlug,
      authorId: user.uid,
      authorName: user.displayName || "Usuário desconhecido",
      authorAvatar: user.photoURL || "",
      createdAt: id ? undefined : new Date(),
    };

    try {
      let response;
      if (id) {
        response = await updatePost(id, postData as any, file);
        alert("Post atualizado com sucesso!");
      } else {
        response = await createPost(postData, file as File);
        alert("Post criado com sucesso!");
      }

      if (response.success) {
        onPostUpdated?.();
      } else {
        alert("Erro ao salvar post: " + response.error);
      }
    } catch (error) {
      console.error("Erro ao salvar post:", error);
      alert("Ocorreu um erro ao salvar o post.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-bold mb-4">{id ? "Editar Post" : "Novo Post"}</h2>

      <label className="block text-sm font-medium text-gray-700">Título</label>
      <input
        type="text"
        name="title"
        value={postForm.title}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700">Resumo</label>
      <input
        type="text"
        name="excerpt"
        value={postForm.excerpt}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700">Conteúdo</label>
      <ReactQuill value={postForm.content} onChange={(value) => setPostForm((prev) => ({ ...prev, content: value }))} className="bg-white border rounded-md" />

      <label className="block text-sm font-medium text-gray-700">Slug</label>
      <input
        type="text"
        name="slug"
        value={postForm.slug}
        onChange={handleChange}
        className="w-full px-3 py-2 border rounded-md"
      />

      <label className="block text-sm font-medium text-gray-700">Imagem</label>
      <input type="file" onChange={handleFileChange} className="w-full text-sm text-gray-500" />

      {previewUrl && <img src={previewUrl} alt="Preview" className="w-full h-48 object-cover mt-2 rounded-md" />}

      <div className="flex justify-end">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          {id ? "Atualizar Post" : "Criar Post"}
        </button>
      </div>
    </form>
  );
};
