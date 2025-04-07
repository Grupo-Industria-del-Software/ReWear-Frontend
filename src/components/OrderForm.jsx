import React, { useState, useEffect } from 'react';
import {
  FiUser, FiShoppingBag, FiPackage, FiTrash2, FiPlusCircle,
  FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const OrderForm = () => {
  const { state } = useLocation();
  const initialProductId = state?.productId || '';
  const [customerId, setCustomerId] = useState(state?.buyerId || '');
  const [customerName, setCustomerName] = useState('');
  const [orderStatusId, setOrderStatusId] = useState('');
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [items, setItems] = useState([{
    productId: initialProductId,
    tipo: 'venta',
    rentalStart: '',
    rentalEnd: '',
    productInfo: null,
    isNew: false 
  }]);
  const [customerProducts, setCustomerProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // 1) Traer nombre del cliente
  useEffect(() => {
    if (!customerId) return;
    fetch(`${process.env.REACT_APP_API_ENV}/api/Auth/${customerId}`)
      .then(res => res.json())
      .then(data => setCustomerName(`${data.firstName} ${data.lastName}`))
      .catch(() => setCustomerName(''));
  }, [customerId]);

  // 2) Traer estados de orden
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_ENV}/api/OrderStatus`)
      .then(res => res.json())
      .then(setOrderStatuses)
      .catch(console.error);
  }, []);

  // 3) Traer info de cada producto
  useEffect(() => {
    items.forEach((it, idx) => {
      if (it.productId && !it.productInfo) {
        fetch(`${process.env.REACT_APP_API_ENV}/api/Product/${it.productId}`)
          .then(res => res.json())
          .then(data => {
            setItems(prev => {
              const copy = [...prev];
              copy[idx].productInfo = data;
              return copy;
            });
          })
          .catch(console.error);
      }
    });
  }, [items]);

  const handleItemChange = (index, field, value) => {
    setItems(prev => {
      const copy = [...prev];
      copy[index][field] = value;
      if (field === 'productId') copy[index].productInfo = null;
      return copy;
    });
  };

  // Función para traer los productos del usuario usando el token de sessionStorage
  const fetchCustomerProducts = async () => {
    const token = sessionStorage.getItem("accessToken");
    if (!token) return;

    try {
      const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/Product/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.error('Error al obtener los productos del usuario');
        return;
      }
      const data = await res.json();
      setCustomerProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addItem = () => {
    // Al agregar producto, si no se han cargado los productos del usuario, se traen
    if (customerProducts.length === 0) {
      fetchCustomerProducts();
    }
    setItems(prev => [
      ...prev,
      {
        productId: '',
        tipo: 'venta',
        rentalStart: '',
        rentalEnd: '',
        productInfo: null,
        isNew: true
      }
    ]);
  };

  const removeItem = index => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!orderStatusId) {
      setError('Selecciona el estado de la orden.');
      setLoading(false);
      return;
    }
    if (items.some(i => !i.productId)) {
      setError('Completa todos los productos.');
      setLoading(false);
      return;
    }

    const payload = {
      customerId: +customerId,
      orderStatusId: +orderStatusId,
      orderItems: items.map(i => ({
        productId: +i.productId,
        tipo: i.tipo,
        rentalStart: i.tipo === 'renta' ? i.rentalStart : null,
        rentalEnd: i.tipo === 'renta' ? i.rentalEnd : null
      }))
    };

    const token = sessionStorage.getItem("accessToken");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/order`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Error al crear la orden');
      const { id } = await res.json();
      setSuccess(`Orden creada con ID ${id}`);
      // Resetear formulario
      setCustomerId('');
      setCustomerName('');
      setOrderStatusId('');
      setItems([{
        productId: '',
        tipo: 'venta',
        rentalStart: '',
        rentalEnd: '',
        productInfo: null,
        isNew: false
      }]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E1DAD3] flex items-center justify-center p-4 font-poppins">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#F8F5F2] rounded-3xl shadow-xl p-8 sm:p-12 w-full max-w-3xl"
      >
        <h2 className="text-center mb-8 text-3xl font-playfair font-bold">
          <span className="text-[#A26964]">Crear</span>{' '}
          <span className="text-[#A2B0C4]">Orden</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {success && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-center bg-[#C2D2C7] text-[#F8F5F2] rounded-xl py-3 mb-6 gap-2"
            >
              <FiCheckCircle /> {success}
            </motion.div>
          )}
          {error && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex items-center justify-center bg-[#A26964] text-[#F8F5F2] rounded-xl py-3 mb-6 gap-2"
            >
              <FiAlertCircle /> {error}
            </motion.div>
          )}

          {/* Nombre del cliente */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Nombre del cliente
            </label>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center bg-white p-4 rounded-xl shadow"
            >
              <FiUser className="text-[#A26964] text-xl mr-3" />
              <span className="text-gray-700 font-medium">
                {customerName || 'Cargando...'}
              </span>
            </motion.div>
          </div>

          {/* Estado de la orden */}
          <div>
            <label
              htmlFor="orderStatus"
              className="block mb-1 font-medium text-gray-700"
            >
              Estado de la orden
            </label>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center bg-white p-4 rounded-xl shadow"
            >
              <FiPackage className="text-[#A26964] text-xl mr-3" />
              <select
                id="orderStatus"
                value={orderStatusId}
                onChange={e => setOrderStatusId(e.target.value)}
                className="w-full outline-none text-gray-700 font-medium"
                required
              >
                <option value="">Seleccionar estado</option>
                {orderStatuses.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>

          {/* Productos */}
          {items.map((it, idx) => (
            <div
              key={idx}
              className="border-2 border-[#A26964] bg-white rounded-xl p-4 relative"
            >
              <h3 className="font-semibold text-lg mb-4">
                Producto {idx + 1}
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Mostrar info legible o input/select para producto */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Producto
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="bg-[#F8F5F2] p-3 rounded-lg shadow-sm"
                  >
                    {it.productInfo ? (
                      <div className="space-y-2">
                        <p className="font-medium text-gray-800">
                          {it.productInfo.name}
                        </p>
                        <p className="text-gray-600">
                          {it.productInfo.description}
                        </p>
                        <p className="text-[#A26964] font-semibold">
                          ${it.productInfo.price}
                        </p>
                        {it.productInfo.productImages?.[0]?.imageUrl && (
                          <img
                            src={it.productInfo.productImages[0].imageUrl}
                            alt={it.productInfo.name}
                            className="w-24 h-24 object-cover rounded"
                          />
                        )}
                      </div>
                    ) : (
                      <>
                        {it.isNew ? (
                          <select
                            value={it.productId}
                            onChange={e =>
                              handleItemChange(idx, 'productId', e.target.value)
                            }
                            required
                            className="w-full outline-none text-gray-700 font-medium bg-white p-3 rounded-lg shadow-sm"
                          >
                            <option value="">Seleccionar producto</option>
                            {customerProducts.length > 0 ? (
                              customerProducts.map(prod => (
                                <option key={prod.id} value={prod.id}>
                                  {prod.name} - {prod.size}
                                </option>
                              ))
                            ) : (
                              <option value="">Cargando productos...</option>
                            )}
                          </select>
                        ) : (
                          <input
                            type="number"
                            value={it.productId}
                            onChange={e =>
                              handleItemChange(idx, 'productId', e.target.value)
                            }
                            required
                            className="w-full outline-none text-gray-700 font-medium bg-white p-3 rounded-lg shadow-sm"
                            placeholder="ID del producto"
                          />
                        )}
                      </>
                    )}
                  </motion.div>
                </div>

                {/* Tipo */}
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Tipo
                  </label>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center bg-[#F8F5F2] p-3 rounded-lg shadow-sm"
                  >
                    <FiShoppingBag className="text-[#A26964] text-xl mr-3" />
                    <select
                      value={it.tipo}
                      onChange={e =>
                        handleItemChange(idx, 'tipo', e.target.value)
                      }
                      className="w-full outline-none text-gray-700 font-medium bg-transparent"
                    >
                      <option value="venta">Venta</option>
                      <option value="renta">Renta</option>
                    </select>
                  </motion.div>
                </div>

                {/* Fechas si renta */}
                {it.tipo === 'renta' && (
                  <>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Fecha inicio
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-[#F8F5F2] p-3 rounded-lg shadow-sm"
                      >
                        <input
                          type="date"
                          value={it.rentalStart}
                          onChange={e =>
                            handleItemChange(idx, 'rentalStart', e.target.value)
                          }
                          required
                          className="w-full outline-none text-gray-700 font-medium bg-transparent"
                        />
                      </motion.div>
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-gray-700">
                        Fecha fin
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-[#F8F5F2] p-3 rounded-lg shadow-sm"
                      >
                        <input
                          type="date"
                          value={it.rentalEnd}
                          onChange={e =>
                            handleItemChange(idx, 'rentalEnd', e.target.value)
                          }
                          required
                          className="w-full outline-none text-gray-700 font-medium bg-transparent"
                        />
                      </motion.div>
                    </div>
                  </>
                )}
              </div>

              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  className="absolute top-2 right-2 bg-[#A26964] text-white rounded-full p-2 shadow hover:bg-red-600 transition"
                >
                  <FiTrash2 />
                </button>
              )}
            </div>
          ))}

          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={addItem}
              className="flex items-center text-[#A26964] font-medium"
            >
              <FiPlusCircle className="mr-1" /> Añadir producto
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#A26964] text-[#F8F5F2] p-4 rounded-lg mt-6 ${
                loading ? 'cursor-not-allowed opacity-50' : 'hover:bg-[#8B5A56]'
              }`}
            >
              {loading ? 'Creando...' : 'Crear Orden'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default OrderForm;
