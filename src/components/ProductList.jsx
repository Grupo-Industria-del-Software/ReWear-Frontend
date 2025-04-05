import React, { useState } from 'react';

const ProductList = () => {
  // Datos de ejemplo
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Blusa Vintage',
      price: 20,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Pantalón Jeans',
      price: 30,
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const handleSave = () => {
    // Aquí iría la lógica para guardar los cambios (ej. llamada a API)
    setSelectedProduct(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#333333]">Mis Productos</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-md p-4">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-40 object-cover rounded-md mb-2" 
            />
            <h3 className="text-lg font-medium text-[#333333]">{product.name}</h3>
            <p className="text-[#C89FA3]">${product.price}</p>
            <button
              className="mt-2 px-3 py-1 bg-[#B57C7C] text-white rounded-md"
              onClick={() => handleEdit(product)}
            >
              Editar
            </button>
          </div>
        ))}
      </div>

      {/* Modal de edición */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md w-10/12 max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-[#333333]">Editar Producto</h3>
            <label className="block mb-2 text-[#333333]">Nombre:</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={selectedProduct.name}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, name: e.target.value })
              }
            />

            <label className="block mb-2 text-[#333333]">Precio:</label>
            <input
              type="number"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={selectedProduct.price}
              onChange={(e) =>
                setSelectedProduct({ ...selectedProduct, price: e.target.value })
              }
            />

            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 text-[#333333] rounded-md"
                onClick={() => setSelectedProduct(null)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-[#B57C7C] text-white rounded-md"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
