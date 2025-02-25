import { Link } from "react-router-dom";
import { BlogCardProps } from "../types/Blog";

export const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={post.imageUrl} alt={post.title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
        <p className="text-gray-500 text-sm">Por {post.authorName}</p>
        <p className="mt-2 text-gray-600">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="mt-4 inline-block text-primary font-medium hover:underline">
          Ler mais →
        </Link>
      </div>
    </div>
  );
};
