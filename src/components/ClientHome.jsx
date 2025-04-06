import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import AuthNavBar from './AuthNavBar';
import FiltersBar from './FiltersBar';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const products = [
  {
    id: 1,
    name: 'Vestido de noche elegante',
    brand: 'Vintage Luxe',
    category: 'Vestidos',
    condition: 'Nuevo',
    size: 'M',
    available: true,
    forSale: true,
    forRent: false,
    salePrice: 120,
    dailyPrice: null,
    images: [''],
    provider: { name: 'María Fernández' }
  },
  {
    id: 2,
    name: 'Chaqueta de cuero vintage',
    brand: 'Retro Style',
    category: 'Abrigos',
    condition: 'Usado',
    size: 'L',
    available: true,
    forSale: true,
    forRent: true,
    salePrice: 200,
    dailyPrice: 25,
    images: [''],
    provider: { name: 'Carlos Mendoza' }
  }
];
const ClientHome = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <div className="relative min-h-screen bg-beige overflow-hidden font-poppins">
   
    <div className="absolute w-[800px] h-[800px] -top-60 -right-60 bg-nude opacity-30 rounded-full" />
    <div className="absolute w-[400px] h-[400px] top-1/2 -left-24 bg-baby-blue opacity-20 rounded-full" />

      <AuthNavBar />
      <FiltersBar />

      <section className="relative z-10 pt-32 px-5 md:px-8 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair font-bold text-4xl md:text-5xl text-coffee mb-4">
            Moda Circular
          </h1>
          <p className="text-xl md:text-2xl text-baby-blue mb-8">
            Descubre prendas únicas y contribuye a la moda sostenible
          </p>
          <Link
            to="/products"
            className="bg-coffee text-beige px-8 py-3 rounded-full inline-flex items-center gap-2 hover:bg-coffee/90 transition-colors"
          >
            <FiShoppingBag className="text-xl" />
            <span>Explorar Colección</span>
          </Link>
        </div>
      </section>

      <section className="pb-16 px-5 md:px-8 lg:px-12 mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-playfair font-bold text-3xl text-coffee">Destacados</h2>
            <button 
              onClick={() => handleNavigation('/products')}
              className="flex items-center gap-2 text-coffee font-bold hover:text-coffee/80 transition-colors"
            >
              <span>Ver todos</span>
              <FiArrowRight />
            </button>
          </div>
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {products.map((product) => (
              <div 
                key={product.id}
                className="min-w-[300px] flex-1"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientHome;