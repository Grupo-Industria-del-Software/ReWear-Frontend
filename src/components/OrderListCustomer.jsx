import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const OrderListCustomer = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) throw new Error('No se encontró token de autenticación.');
        const res = await fetch('https://localhost:44367/api/order/customer', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          const message = await res.text();
          throw new Error(`Error ${res.status}: ${message}`);
        }
        const data = await res.json();
        console.log("Respuesta de la API:", data);
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p className="p-4 text-center">Cargando órdenes...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">Error: {error}</p>;
  if (!orders.length) return <p className="p-4 text-center">No tienes órdenes aún.</p>;

  return (
    <div className="flex flex-col gap-6 p-4">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-[#F8F5F2] rounded-2xl p-6 border-2 border-[#E4C9B6] transition-transform hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="flex flex-wrap justify-between items-center mb-5 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[#A26964] text-xl font-semibold font-serif">
                Orden #{order.id}
              </span>
              <span className="text-[#A2B0CA] text-sm font-sans">
                {order.name}
              </span>
            </div>
            <span className="bg-[#C2D2C7] text-[#F8F5F2] px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide font-sans">
              {order.orderStatus}
            </span>
          </div>
          <div className="flex flex-wrap gap-8 mb-6">
            <div className="flex flex-col gap-1">
              <span className="text-[#A26964] text-sm font-serif">Fecha:</span>
              <span className="text-gray-600 text-sm font-sans">
                {format(new Date(order.createdAt), "dd/MM/yyyy 'a las' HH:mm")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[#A26964] text-sm font-serif">Total:</span>
              <span className="text-[#A26964] text-lg font-serif font-bold">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderListCustomer;