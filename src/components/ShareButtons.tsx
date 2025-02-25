import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaShareAlt } from "react-icons/fa";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export const ShareButtons = ({ title, url }: ShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareOptions = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FaFacebook className="text-blue-600" />,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <FaTwitter className="text-blue-400" />,
    },
    {
      name: "WhatsApp",
      url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <FaWhatsapp className="text-green-500" />,
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <FaLinkedin className="text-blue-700" />,
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url,
        });
      } catch (error) {
        console.error("Erro ao compartilhar:", error);
      }
    } else {
      alert("Seu navegador não suporta compartilhamento nativo.");
    }
  };

  return (
    <div className="flex items-center gap-3">
      {shareOptions.map((option) => (
        <a
          key={option.name}
          href={option.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-600 hover:text-black transition"
        >
          {option.icon}
        </a>
      ))}

      {"share" in navigator ? (
        <button onClick={handleNativeShare} className="text-gray-600 hover:text-black transition">
          <FaShareAlt />
        </button>
      ) : null}
    </div>
  );
};
