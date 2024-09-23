// src/components/Carousel.jsx
"use client"; // Torna este componente um Client Component

import { useState } from "react";

// ProdutoFactory para criar produtos
class ProdutoFactory {
  constructor(nome, categoria, imgs) {
    this.nome = nome;
    this.categoria = categoria;
    this.imgs = imgs; // Agora é um array de imagens
  }
}

// Produtos com várias imagens
const produto1 = new ProdutoFactory("Camiseta Polo 1", "POLO", [
  "/img/p1.jpg",
  "/img/p2.jpg",
]);
const produto2 = new ProdutoFactory("Camiseta Polo 2", "POLO", [
  "/img/p3.jpg",
  "/img/p4.jpg",
]);

const produto3 = new ProdutoFactory("Camiseta Polo 3", "POLO", [
  "/img/p5.jpg",
  "/img/p6.jpg",
]);

const produto4 = new ProdutoFactory("Camiseta Polo 4", "POLO", [
  "/img/p7.jpg",
  "/img/p8.jpg",
]);

const produto5 = new ProdutoFactory("Camiseta Polo 5", "POLO", [
  "/img/p9.jpg",
  "/img/p10.jpg",
]);

const produtos = [produto1, produto2, produto3, produto4, produto5]; // Cada produto será um card

export default function Carousel() {
  const [currentImages, setCurrentImages] = useState(
    Array(produtos.length).fill(0)
  ); // Índices das imagens atuais para cada produto

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {produtos.map((produto, index) => (
        <div key={index} className="produto bg-gray-100 border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => handlePrev(index)}
              className="p-2 bg-gray-200 rounded text-black"
            >
              ←
            </button>
            <img
              className="produto__img w-48"
              src={produto.imgs[currentImages[index]]}
              alt={produto.nome}
            />
            <button
              onClick={() => handleNext(index)}
              className="p-2 bg-gray-200 rounded text-black"
            >
              →
            </button>
          </div>
          <p className="produto__nome font-bold text-black">{produto.nome}</p>
          <p className="produto__categoria text-black">{produto.categoria}</p>
        </div>
      ))}
    </div>
  );
}
