import { BlogList } from "../components/BlogList";

export const Blog = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="lg:text-center">
        <h2 className="text-4xl font-script text-primary mb-2">Blog</h2>
        <p className="mt-2 max-w-2xl text-gray-500 lg:mx-auto">
          Confira os artigos mais recentes sobre alimentação saudável, dicas de nutrição e receitas deliciosas.
        </p>
      </div>
      <BlogList />
    </div>
  );
};
