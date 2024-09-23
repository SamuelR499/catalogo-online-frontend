// src/app/page.jsx
import Carousel from '../components/Carousel';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-2xl font-bold my-4">Catálogo de Produtos</h1>
      <Carousel />
    </div>
  );
}
