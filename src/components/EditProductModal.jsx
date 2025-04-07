import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

const EditProductModal = ({
  product,
  categories,
  conditions,
  sizes,
  brands,
  productStatuses,
  onClose,
  onSubmit,
}) => {
  // Creamos un estado local para las imágenes actuales, para poder actualizarlas al eliminar alguna.
  const [currentImages, setCurrentImages] = useState([]);

  // Inicializamos las imágenes locales al montar el componente o cuando cambie el producto
  useEffect(() => {
    setCurrentImages(product.images || []);
  }, [product]);

  // Función para eliminar la imagen
  const handleDeleteImage = async (imageId) => {
    const token = sessionStorage.getItem("accessToken");
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENV}/api/Product/image/${imageId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const text = await res.text();
        console.error("Error al eliminar imagen:", text);
        alert("Error al eliminar imagen");
        return;
      }
      alert("Imagen eliminada ✅");
      // Actualizar el estado eliminando la imagen eliminada
      setCurrentImages((prevImages) =>
        prevImages.filter((img) => img.id !== imageId)
      );
    } catch (err) {
      console.error(err);
      alert("Error de conexión al eliminar imagen");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 rounded-3xl shadow-2xl relative">
        <h3 className="text-2xl font-serif text-[#A86B5A] mb-6 text-center">
          Editar producto
        </h3>
        <form onSubmit={onSubmit} className="space-y-6">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              name="name"
              type="text"
              defaultValue={product.name}
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-[#A86B5A]/50 focus:border-[#A86B5A]"
            />
          </div>
          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              name="description"
              defaultValue={product.description}
              rows={3}
              className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-[#A86B5A]/50 focus:border-[#A86B5A]"
            />
          </div>
          {/* Precios */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio venta
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                defaultValue={product.price}
                className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-[#A86B5A]/50 focus:border-[#A86B5A]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Precio día
              </label>
              <input
                name="pricePerDay"
                type="number"
                step="0.01"
                defaultValue={product.pricePerDay}
                className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-[#A86B5A]/50 focus:border-[#A86B5A]"
              />
            </div>
          </div>
          {/* Selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: "categoryId", list: categories, label: "Categoría" },
              { name: "conditionId", list: conditions, label: "Condición" },
              { name: "sizeId", list: sizes, label: "Talla" },
              { name: "brandId", list: brands, label: "Marca" },
              {
                name: "productStatusId",
                list: productStatuses,
                label: "Estado",
              },
            ].map(({ name, list, label }) => (
              <div key={name}>
                <label className="block text-sm font-medium text-gray-700">
                  {label}
                </label>
                <select
                  name={name}
                  defaultValue={String(product[name])}
                  className="w-full mt-2 p-3 border border-gray-300 rounded-xl focus:ring-[#A86B5A]/50 focus:border-[#A86B5A]"
                >
                  {list.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          {/* Checkboxes */}
          <div className="flex items-center space-x-6">
            {[
              { name: "isForSale", label: "En venta" },
              { name: "isForRental", label: "En alquiler" },
            ].map(({ name, label }) => (
              <label key={name} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={name}
                  defaultChecked={product[name]}
                  className="h-5 w-5 text-[#A86B5A] border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">{label}</span>
              </label>
            ))}
          </div>
          {/* Subir imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subir imágenes
            </label>
            {/* Input para nuevas imágenes */}
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              className="mt-2"
            />
          </div>
          {/* Mostrar imágenes actuales con opción de eliminación */}
          {currentImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {currentImages.map((img, idx) => (
                <div key={img.id} className="relative">
                  <img
                    src={img.imageUrl}
                    alt={`Actual ${idx + 1}`}
                    className="h-20 w-full object-cover rounded-md border"
                  />
                  {/* Botón para eliminar */}
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(img.id)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          {/* Botones */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#A86B5A] text-white rounded-xl hover:bg-[#A86B5A]/90"
            >
              Guardar
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;
