import { useState } from "react";
import { Search } from "lucide-react";

export const SearchButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex items-center">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 bg-primary text-white rounded-full hover:bg-opacity-80 transition"
        >
          <Search size={20} />
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Pesquisar..."
            className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            ✖
          </button>
        </div>
      )}
    </div>
  );
};
