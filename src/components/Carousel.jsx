"use client"; // Torna este componente um Client Component

import { useState, useEffect } from "react";
import axios from "axios"; // Importa axios para fazer requisições HTTP

export default function Carousel() {
  const [produtos, setProdutos] = useState([]); // Estado para armazenar produtos vindos do backend
  const [currentImages, setCurrentImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("TODAS");
  const [searchText, setSearchText] = useState("");

  // Faz a requisição para buscar produtos quando o componente é montado
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/produtos"); // URL do seu backend
        setProdutos(response.data); // Armazena os produtos no estado
        setCurrentImages(Array(response.data.length).fill(0)); // Define o estado inicial das imagens
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      }
    };

    fetchProdutos();
  }, []);

  // Filtra produtos por categoria e texto de busca
  const filteredProducts = produtos.filter((produto) => {
    const matchesCategory =
      selectedCategory === "TODAS" || produto.categoria === selectedCategory;

    const normalizedSearchText = searchText
      .normalize("NFD") // Normaliza para a forma de decomposição
      .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
      .toLowerCase(); // Converte para minúsculas

    const normalizedNome = produto.nome
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const normalizedCategoria = produto.categoria
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    const matchesSearchText =
      normalizedNome.includes(normalizedSearchText) ||
      normalizedCategoria.includes(normalizedSearchText);

    return matchesCategory && matchesSearchText;
  });

  const handleNext = (index) => {
    setCurrentImages((prev) => {
      const newImages = [...prev];
      if (produtos[index]?.imgs?.length) {
        // Verifica se imgs existe e tem elementos
        newImages[index] = (newImages[index] + 1) % produtos[index].imgs.length;
      }
      return newImages;
    });
  };

  const handlePrev = (index) => {
    setCurrentImages((prev) => {
      const newImages = [...prev];
      if (produtos[index]?.imgs?.length) {
        // Verifica se imgs existe e tem elementos
        newImages[index] =
          (newImages[index] - 1 + produtos[index].imgs.length) %
          produtos[index].imgs.length;
      }
      return newImages;
    });
  };

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      {/* Filtro de categoria */}
      <div className="mb-4">
        <span className="font-bold">Filtrar por categoria:</span>
        <div className="flex space-x-2 mt-2">
          {["TODAS", ...new Set(produtos.map((p) => p.categoria))].map(
            (categoria) => (
              <button
                key={categoria}
                className={`text-black p-2 rounded ${
                  selectedCategory === categoria ? "bg-gray-300" : "bg-gray-200"
                }`}
                onClick={() => setSelectedCategory(categoria)}
              >
                {categoria}
              </button>
            )
          )}
        </div>
      </div>

      {/* Campo de busca por texto */}
      <div className="mb-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar produto..."
          className="border p-2 rounded w-full"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredProducts.map((produto, index) => (
          <div
            key={index}
            className="produto bg-gray-100 border rounded-lg p-4 flex"
          >
            <div className="relative mx-4">
              <button
                onClick={() => handlePrev(index)}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black p-2 rounded"
              >
                ←
              </button>
              <img
                className="w-56 h-56 object-contain"
                src={
                  produto.imgs &&
                  produto.imgs.length > 0 &&
                  currentImages[index] !== undefined
                    ? produto.imgs[currentImages[index]]
                    : "default-image.jpg" // Imagem padrão
                }
                alt={produto.nome || "Imagem do Produto"}
                onClick={() =>
                  currentImages[index] !== undefined && produto.imgs?.length
                    ? handleImageClick(produto.imgs[currentImages[index]])
                    : null
                }
              />
              <button
                onClick={() => handleNext(index)}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 text-black p-2 rounded"
              >
                →
              </button>
            </div>
            <div className="flex-1">
              <h2 className="produto__nome font-bold text-black">
                {produto.nome}
              </h2>
              <div className="border-b-2 border-gray-300 my-2"></div>
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="text-black">Categoria: {produto.categoria}</div>
                <div className="text-black">EAN: {produto.EAN}</div>
                <div className="text-black">CEST: {produto.CEST}</div>
                <div className="text-black">PESO: {produto.PESO}</div>
                <div className="text-black">VALIDADE: {produto.VALIDADE}</div>
                <div className="text-black">DUN: {produto.DUN}</div>
                <div className="text-black">EMBALAGEM: {produto.EMBALAGEM}</div>
                <div className="text-black">
                  CLASSIF. FISCAL: {produto.CLASSIFICACAO_FISCAL}
                </div>
                <div className="text-black">
                  DIMENSÕES DA EMB.: {produto.DIMENSOES_EMB}
                </div>
                <div className="text-black">
                  CAIXA DE EMBARQUE: {produto.CAIXA_EMBARQUE}
                </div>
                <div className="text-black">
                  QUANT. POR CAIXA: {produto.QUANT_POR_CAIXA}
                </div>
                <div className="text-black">
                  CAIXA POR PALLET: {produto.CAIXA_POR_PALLET}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Modal para imagem em destaque */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="relative">
              <img
                src={selectedImage}
                alt="Imagem em destaque"
                className="max-w-full max-h-full"
              />
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-white bg-red-600 rounded-full p-2"
              >
                ✖
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
