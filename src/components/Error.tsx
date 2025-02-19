import { Link } from "react-router-dom";
import errorImage from "../assets/error.webp";

export const ErrorPage = ({ message = "Ocorreu um erro inesperado!" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-6">
      {/* Imagem de erro */}
      <img src={errorImage} alt="Erro" className="w-64 sm:w-80 mb-6" />

      {/* Mensagem de erro */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Ops! Algo deu errado.</h1>
      <p className="text-gray-600 text-lg mb-6">{message}</p>

      {/* Botão para voltar à home */}
      <Link
        to="/"
        className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg text-lg font-medium transition shadow-md"
      >
        Voltar para a Home
      </Link>
    </div>
  );
};
