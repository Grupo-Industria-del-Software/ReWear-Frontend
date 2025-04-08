import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import EditProductModal from "./EditProductModal"; // Ajusta la ruta según tu estructura

// Componente para mostrar el carrusel de imágenes
const ImageCarousel = ({ images }) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <img
        src="https://via.placeholder.com/300x200"
        className="w-full h-48 object-cover rounded-2xl"
        alt="Sin imagen"
      />
    );
  }

  const prev = () =>
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () =>
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full h-48 rounded-2xl overflow-hidden">
      <img
        src={images[index].imageUrl}
        alt={`Imagen ${index + 1}`}
        className="w-full h-48 object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 text-gray-600 p-1 rounded-full"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 text-gray-600 p-1 rounded-full"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
};

const ProductList = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [categories, setCategories] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productStatuses, setProductStatuses] = useState([]);

  // Estado para el modal/alerta de suscripción
  const [showSubscriptionAlert, setShowSubscriptionAlert] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  // Fetch de productos
  useEffect(() => {
    const fetchProducts = async () => {
      const token = sessionStorage.getItem("accessToken");
      const res = await fetch(
        `${process.env.REACT_APP_API_ENV}/api/Product/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  // Fetch de listas para selects
  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem("accessToken");
      const endpoints = [
        { url: `${process.env.REACT_APP_API_ENV}/api/Category`, setter: setCategories },
        { url: `${process.env.REACT_APP_API_ENV}/api/Condition`, setter: setConditions },
        { url: `${process.env.REACT_APP_API_ENV}/api/Size`, setter: setSizes },
        { url: `${process.env.REACT_APP_API_ENV}/api/Brand`, setter: setBrands },
        {
          url: `${process.env.REACT_APP_API_ENV}/api/ProductStatus`,
          setter: setProductStatuses,
        },
      ];
      try {
        await Promise.all(
          endpoints.map(async ({ url, setter }) => {
            const res = await fetch(url, {
              headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setter(
              data.map((item) => ({
                value: String(item.id),
                label: item.label,
              }))
            );
          })
        );
      } catch (err) {
        console.error("Error fetching lists:", err);
      }
    };
    fetchData();
  }, []);

  // Abrir modal de edición y pasar el producto seleccionado
  const openEditModal = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  // Manejar envío del formulario de edición
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("accessToken");
    const form = e.target;
    const fd = new FormData();

    fd.append("Name", form.name.value);
    fd.append("Description", form.description.value);
    fd.append("Price", form.price.value);
    fd.append("PricePerDay", form.pricePerDay.value);
    fd.append("CategoryId", form.categoryId.value);
    fd.append("ConditionId", form.conditionId.value);
    fd.append("SizeId", form.sizeId.value);
    fd.append("BrandId", form.brandId.value);
    fd.append("IsForSale", form.isForSale.checked);
    fd.append("IsForRental", form.isForRental.checked);
    fd.append("ProductStatusId", form.productStatusId.value);

    // Se usa el name "images" para que coincida con el controlador
    Array.from(form.images.files).forEach((file) => fd.append("images", file));

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_ENV}/api/Product/${selectedProduct.id}`,
        {
          method: "PATCH",
          headers: { Authorization: `Bearer ${token}` },
          body: fd,
        }
      );
      if (!res.ok) {
        const text = await res.text();
        console.error("Error actualizando:", text);
        alert("Error al actualizar producto");
        return;
      }
      alert("Producto actualizado ✅");
      closeModal();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error de conexión");
    }
  };

  // Función para verificar la suscripción del usuario antes de crear un nuevo producto
  const handleNewProductClick = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("No se encontró token de autenticación.");

      const res = await fetch(
        `${process.env.REACT_APP_API_ENV}/api/subscription/info`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Si el usuario tiene una suscripción activa, navega a la ruta "/product"
      if (res.ok) {
        navigate("/product");
      } else if (res.status === 404) {
        // Si no se encontró la suscripción, muestra el modal de alerta
        setShowSubscriptionAlert(true);
      } else {
        const message = await res.text();
        throw new Error(`Error ${res.status}: ${message}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error: " + err.message);
    }
  };

  // Función para crear la sesión de checkout y redirigir automáticamente al URL recibido
  const handleCheckoutSession = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const token = sessionStorage.getItem("accessToken");
      if (!token) throw new Error("No se encontró token de autenticación.");

      const res = await fetch(
        `${process.env.REACT_APP_API_ENV}/api/Payment/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const message = await res.text();
        throw new Error(`Error ${res.status}: ${message}`);
      }
      const data = await res.json();
      // Redireccionar automáticamente a la URL proporcionada por el endpoint
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setCheckoutError(err.message);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F2EE] p-6 md:p-10">
      <h2 className="text-3xl font-serif text-[#A86B5A] mb-8 text-center">
        Mis productos
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col"
          >
            <div className="mb-4">
              <ImageCarousel images={product.images} />
            </div>
            <h3 className="text-xl font-semibold text-[#4A4A4A]">
              {product.name}
            </h3>
            <p className="text-gray-600 mt-2 flex-1">
              {product.description}
            </p>
            <span className="text-[#3C7A57] font-bold mt-4 text-lg">
              ${product.price.toFixed(2)}
            </span>
            <button
              onClick={() => openEditModal(product)}
              className="mt-6 self-start px-5 py-2 bg-[#EAD7CE] text-[#A86B5A] rounded-xl hover:bg-[#EAD7CE]/80 transition inline-flex items-center"
            >
              <Pencil size={18} className="inline mr-2" />
              Editar
            </button>
          </div>
        ))}
      </div>

      {/* Botón flotante de "+" para agregar un nuevo producto */}
      <button
        onClick={handleNewProductClick}
        className="fixed bottom-8 right-8 bg-[#A86B5A] hover:bg-[#A86B5A]/90 text-white w-16 h-16 rounded-full shadow-xl flex items-center justify-center text-4xl"
      >
        +
      </button>

      {showEditModal && selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          categories={categories}
          conditions={conditions}
          sizes={sizes}
          brands={brands}
          productStatuses={productStatuses}
          onClose={closeModal}
          onSubmit={handleEditSubmit}
        />
      )}

      {/* Modal/Alerta para la suscripción */}
      {showSubscriptionAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-2xl p-8 mx-4 max-w-md w-full text-center">
            <h3 className="text-2xl font-semibold text-[#A86B5A] mb-4">
              No tienes Suscripción
            </h3>
            <p className="mb-6">
              Para agregar productos, debes contar con una suscripción activa.
            </p>
            {checkoutError && (
              <p className="text-red-500 text-sm mb-4">{checkoutError}</p>
            )}
            <button
              onClick={handleCheckoutSession}
              className="w-full py-2 bg-[#C2D2C7] hover:bg-[#A2B0CA] text-[#F8F5F2] rounded-full font-semibold transition"
              disabled={checkoutLoading}
            >
              {checkoutLoading ? "Procesando..." : "Suscríbete"}
            </button>
            <button
              onClick={() => setShowSubscriptionAlert(false)}
              className="mt-4 text-sm text-gray-600 hover:underline"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
