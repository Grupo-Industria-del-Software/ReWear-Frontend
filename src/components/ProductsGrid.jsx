import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';

const ProductsGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
      category: '',
      size: '',
      brand: '',
      condition: '',
      minPrice: '',
      maxPrice: '',
      forRent: false,
      forSale: false
    });
  
    const fetchProducts = useCallback(async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(filters);
        const response = await fetch(`https://localhost:7039/api/Product?${params}`);
        if (!response.ok) throw new Error('Error fetching products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }, [filters]);
  
    useEffect(() => {
      fetchProducts();
    }, [fetchProducts]);
  
    const FilterSection = ({ title, children }) => (
      <div className="mb-6 p-4 bg-beige rounded-lg shadow-sm">
        <h3 className="font-playfair text-xl text-coffee mb-3">{title}</h3>
        {children}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <FilterSection title="Categorías">
          <select 
            className="w-full p-2 rounded border border-baby-blue"
            onChange={(e) => setFilters({...filters, category: e.target.value})}
          >
            <option value="">Todas</option>
            {['Vestidos', 'Pantalones', 'Camisas'].map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </FilterSection>

        <FilterSection title="Precio">
          <div className="space-y-2">
            <input
              type="number"
              placeholder="Mínimo"
              className="w-full p-2 rounded border border-baby-blue"
              onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
            />
            <input
              type="number"
              placeholder="Máximo"
              className="w-full p-2 rounded border border-baby-blue"
              onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
            />
          </div>
        </FilterSection>

        <FilterSection title="Disponibilidad">
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="text-coffee"
                onChange={(e) => setFilters({...filters, forSale: e.target.checked})}
              />
              <span className="font-poppins">Para venta</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="text-coffee"
                onChange={(e) => setFilters({...filters, forRent: e.target.checked})}
              />
              <span className="font-poppins">Para renta</span>
            </label>
          </div>
        </FilterSection>

        <FilterSection title="Condición">
          <select 
            className="w-full p-2 rounded border border-baby-blue"
            onChange={(e) => setFilters({...filters, condition: e.target.value})}
          >
            <option value="">Todas</option>
            {['Nuevo', 'Usado', 'Reacondicionado'].map(condition => (
              <option key={condition} value={condition}>{condition}</option>
            ))}
          </select>
        </FilterSection>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="font-poppins text-coffee">Cargando productos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          {products.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="font-poppins text-coffee">No se encontraron productos</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsGrid;