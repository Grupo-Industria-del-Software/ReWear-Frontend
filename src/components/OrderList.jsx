import { useEffect, useState } from 'react';
import { format } from 'date-fns';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [orderStatuses, setOrderStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState({});
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [editedRentalDates, setEditedRentalDates] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('accessToken');
        if (!token) throw new Error('No se encontró token de autenticación.');

        const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/order/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const message = await res.text();
          throw new Error(`Error ${res.status}: ${message}`);
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchOrderStatuses = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/OrderStatus`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!res.ok) {
          const message = await res.text();
          throw new Error(`Error ${res.status}: ${message}`);
        }
        const data = await res.json();
        setOrderStatuses(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
    fetchOrderStatuses();
  }, []);

  const handleEditClick = (e, orderId, currentStatusId) => {
    e.stopPropagation();
    setEditingOrderId(orderId);
    setSelectedStatus((prev) => ({ ...prev, [orderId]: currentStatusId }));
  };

  const handleStatusChange = (orderId, statusId) => {
    setSelectedStatus((prev) => ({ ...prev, [orderId]: Number(statusId) }));
  };

  const handleSaveClick = async (orderId) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const newStatusId = selectedStatus[orderId];

      const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/order/${orderId}/status/${newStatusId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(`Error ${res.status}: ${message}`);
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                orderStatus: orderStatuses.find((s) => s.id === newStatusId)?.label || newStatusId,
              }
            : order
        )
      );
      setEditingOrderId(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleOrderClick = async (orderId) => {
    if (expandedOrderId === orderId) {
      setExpandedOrderId(null);
      return;
    }

    setExpandedOrderId(orderId);

    if (!orderDetails[orderId]) {
      try {
        const token = sessionStorage.getItem('accessToken');
        const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/order/${orderId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          const message = await res.text();
          throw new Error(`Error ${res.status}: ${message}`);
        }
        const data = await res.json();
        setOrderDetails((prev) => ({ ...prev, [orderId]: data }));
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }
  };

  const handleRentalDateChange = (orderId, itemId, field, value) => {
    setEditedRentalDates((prev) => ({
      ...prev,
      [orderId]: {
        ...prev[orderId],
        [itemId]: {
          ...prev[orderId]?.[itemId],
          [field]: value,
        },
      },
    }));
  };

  const handleSaveRentalDates = async (orderId, itemId) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const rentalData = editedRentalDates[orderId]?.[itemId];

      const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/order/${orderId}/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rentalStart: rentalData?.rentalStart,
          rentalEnd: rentalData?.rentalEnd,
        }),
      });

      if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);

      // Refrescar datos
      handleOrderClick(orderId);
      setExpandedOrderId(null);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleDeleteItem = async (orderId, itemId) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/order/${orderId}/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Error ${res.status}: ${await res.text()}`);

      // Actualiza los items de la orden de forma automática
      setOrderDetails((prev) => {
        const updatedOrderDetails = { ...prev };
        const updatedItems = updatedOrderDetails[orderId].orderItems.filter((item) => item.id !== itemId);

        // Calcula el nuevo total
        const updatedTotal = updatedItems.reduce((acc, item) => acc + item.price, 0);

        updatedOrderDetails[orderId] = {
          ...updatedOrderDetails[orderId],
          orderItems: updatedItems,
          totalPrice: updatedTotal,
        };

        return updatedOrderDetails;
      });

      // También actualiza la lista de órdenes si es necesario
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, totalPrice: prevOrders.find(o => o.id === orderId).totalPrice } : order
        )
      );
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // Función para eliminar una orden completa
  const handleDeleteOrder = async (orderId) => {
    try {
      const token = sessionStorage.getItem('accessToken');
      const res = await fetch(`${process.env.REACT_APP_API_ENV}/api/order/${orderId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(`Error ${res.status}: ${message}`);
      }

      // Actualiza la lista de órdenes eliminando la orden borrada
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
      // Si la orden estaba expandida, se cierra la vista de detalles
      if (expandedOrderId === orderId) {
        setExpandedOrderId(null);
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  if (loading) return <p className="p-4 text-center">Cargando órdenes...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">Error: {error}</p>;
  if (!orders.length) return <p className="p-4 text-center">No tienes órdenes aún.</p>;

  return (
    <div className="flex flex-col gap-6 p-4">
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => handleOrderClick(order.id)}
          className="bg-[#F8F5F2] rounded-2xl p-6 border-2 border-[#E4C9B6] transition-transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
        >
          <div className="flex flex-wrap justify-between items-center mb-5 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[#A26964] text-xl font-semibold font-serif">
                Orden #{order.id}
              </span>
              <span className="text-[#A2B0CA] text-sm font-sans">{order.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {editingOrderId === order.id ? (
                <>
                  <select
                    value={selectedStatus[order.id]}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="bg-[#C2D2C7] text-[#F8F5F2] px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide font-sans"
                  >
                    {orderStatuses.map((status) => (
                      <option key={status.id} value={status.id}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleSaveClick(order.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    Guardar
                  </button>
                </>
              ) : (
                <>
                  <span className="bg-[#C2D2C7] text-[#F8F5F2] px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide font-sans">
                    {order.orderStatus}
                  </span>
                  <button
                    onClick={(e) => handleEditClick(e, order.id, order.statusId || 0)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    Editar estado
                  </button>
                  {/* Botón para eliminar la orden */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteOrder(order.id);
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    Eliminar orden
                  </button>
                </>
              )}
            </div>
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

          {expandedOrderId === order.id && orderDetails[order.id] && (
            <div className="mt-4 border-t pt-4">
              <h3 className="text-lg font-semibold mb-4 text-[#A26964]">Items de la orden</h3>
              <div className="grid gap-4">
                {orderDetails[order.id].orderItems.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className="bg-white border border-[#E4C9B6] rounded-xl p-4 shadow-sm"
                    >
                      <div className="text-sm text-gray-800 mb-2">
                        <strong>Producto:</strong> {item.productName}
                      </div>
                      <div className="text-sm text-gray-800 mb-2">
                        <strong>Talla:</strong> {item.productSize || 'Sin especificar'}
                      </div>
                      <div className="text-sm text-gray-800 mb-2">
                        <strong>Precio:</strong> ${item.price.toFixed(2)}
                      </div>

                      <button
                        onClick={() => handleDeleteItem(order.id, item.id)}
                        className="mt-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        Eliminar item
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderList;

