// src/components/Carousel.jsx
"use client"; // Torna este componente um Client Component

import { useState } from "react";

// ProdutoFactory para criar produtos
class ProdutoFactory {
  constructor(nome, imgs, info) {
    this.nome = nome;
    this.imgs = imgs; // Agora é um array de imagens
    this.info = info; // Informações do produto
  }
}

// Produtos com várias imagens e informações
const produto1 = new ProdutoFactory(
  "WHEY 100% LATA 450g - SABOR MORANGO",
  ["/img/p1.png", "/img/p2.png"],
  {
    categoria: "PROTEÍNA",
    EAN: "7899598016134",
    CEST: "123456",
    PESO: "450g",
    VALIDADE: "18 meses",
    DUN: "DUN001",
    EMBALAGEM: "LATA",
    CLASSIFICACAO_FISCAL: "2106.90.30",
    DIMENSOES_EMB: "11×20×11 cm",
    CAIXA_EMBARQUE: "20×20 cm",
    QUANT_POR_CAIXA: 4,
    CAIXA_POR_PALLET: 200,
  }
);

const produto2 = new ProdutoFactory(
  "OUTRO PRODUTO",
  ["/img/p1.png", "/img/p2.png"],
  {
    categoria: "OUTRA CATEGORIA",
    EAN: "7899999999999",
    CEST: "654321",
    PESO: "500g",
    VALIDADE: "12 meses",
    DUN: "DUN002",
    EMBALAGEM: "PACOTE",
    CLASSIFICACAO_FISCAL: "2106.90.30",
    DIMENSOES_EMB: "15×25×10 cm",
    CAIXA_EMBARQUE: "25×25 cm",
    QUANT_POR_CAIXA: 10,
    CAIXA_POR_PALLET: 100,
  }
);

const produtos = [produto1, produto2]; // Cada produto será um card

const categorias = ["TODAS", "PROTEÍNA", "OUTRA CATEGORIA"]; // Definindo as categorias

export default function Carousel() {
  const [currentImages, setCurrentImages] = useState(
    Array(produtos.length).fill(0)
  ); // Índices das imagens atuais para cada produto
  const [selectedImage, setSelectedImage] = useState(null); // Estado para imagem em destaque
  const [selectedCategory, setSelectedCategory] = useState("TODAS"); // Categoria selecionada
  const [searchText, setSearchText] = useState(""); // Estado para armazenar o texto de busca

  // Função para filtrar produtos por categoria e por texto
  const filteredProducts = produtos.filter((produto) => {
    const matchesCategory =
      selectedCategory === "TODAS" ||
      produto.info.categoria === selectedCategory;

    const matchesSearchText =
      produto.nome.toLowerCase().includes(searchText.toLowerCase()) ||
      produto.info.categoria.toLowerCase().includes(searchText.toLowerCase());

    return matchesCategory && matchesSearchText;
  });

  const handleNext = (index) => {
    setCurrentImages((prev) => {
      const newImages = [...prev];
      newImages[index] = (newImages[index] + 1) % produtos[index].imgs.length; // Avança a imagem do produto
      return newImages;
    });
  };

  const handlePrev = (index) => {
    setCurrentImages((prev) => {
      const newImages = [...prev];
      newImages[index] =
        (newImages[index] - 1 + produtos[index].imgs.length) %
        produtos[index].imgs.length; // Retorna a imagem do produto
      return newImages;
    });
  };

  const handleImageClick = (img) => {
    setSelectedImage(img); // Define a imagem selecionada
  };

  const handleCloseModal = () => {
    setSelectedImage(null); // Fecha o modal
  };

  return (
    <div>
      {/* Filtro de categoria */}
      <div className="mb-4">
        <span className="font-bold ">Filtrar por categoria:</span>
        <div className="flex space-x-2 mt-2">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              className={` text-black p-2 rounded ${
                selectedCategory === categoria ? "bg-gray-300" : "bg-gray-200"
              }`}
              onClick={() => setSelectedCategory(categoria)}
            >
              {categoria}
            </button>
          ))}
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
                className="w-56 h-56 object-contain" // Tamanho aumentado da imagem
                src={produto.imgs[currentImages[index]]}
                alt={produto.nome}
                onClick={() =>
                  handleImageClick(produto.imgs[currentImages[index]])
                } // Ação ao clicar na imagem
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
              <div className="border-b-2 border-gray-300 my-2"></div>{" "}
              {/* Borda abaixo do nome */}
              <div className="grid grid-cols-3 gap-2 mt-2">
                <div className="text-black">
                  Categoria: {produto.info.categoria}
                </div>
                <div className="text-black">EAN: {produto.info.EAN}</div>
                <div className="text-black">CEST: {produto.info.CEST}</div>
                <div className="text-black">PESO: {produto.info.PESO}</div>
                <div className="text-black">
                  VALIDADE: {produto.info.VALIDADE}
                </div>
                <div className="text-black">DUN: {produto.info.DUN}</div>
                <div className="text-black">
                  EMBALAGEM: {produto.info.EMBALAGEM}
                </div>
                <div className="text-black">
                  CLASSIF. FISCAL: {produto.info.CLASSIFICACAO_FISCAL}
                </div>
                <div className="text-black">
                  DIMENSÕES DA EMB.: {produto.info.DIMENSOES_EMB}
                </div>
                <div className="text-black">
                  CAIXA DE EMBARQUE: {produto.info.CAIXA_EMBARQUE}
                </div>
                <div className="text-black">
                  QUANT. POR CAIXA: {produto.info.QUANT_POR_CAIXA}
                </div>
                <div className="text-black">
                  CAIXA POR PALLET: {produto.info.CAIXA_POR_PALLET}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
  );
}
