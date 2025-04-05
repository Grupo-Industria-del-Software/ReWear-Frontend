import React, { useState } from 'react';

const OrdersList = () => {
  // Datos de ejemplo
  const [orders, setOrders] = useState([
    { id: 101, user: 'Usuario 1', product: 'Blusa Vintage', status: 'Pendiente' },
    { id: 102, user: 'Usuario 2', product: 'Pantalón Jeans', status: 'En Proceso' },
  ]);

  const handleChangeStatus = (orderId, newStatus) => {
    // Lógica para cambiar estado (ej. llamada a API)
    const updatedOrders = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#333333]">Órdenes</h2>
      <div className="bg-white shadow-md rounded-md p-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 text-[#333333]">ID</th>
              <th className="p-2 text-[#333333]">Usuario</th>
              <th className="p-2 text-[#333333]">Producto</th>
              <th className="p-2 text-[#333333]">Estado</th>
              <th className="p-2 text-[#333333]">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b">
                <td className="p-2">{order.id}</td>
                <td className="p-2">{order.user}</td>
                <td className="p-2">{order.product}</td>
                <td className="p-2">{order.status}</td>
                <td className="p-2">
                  <select
                    className="border border-gray-300 rounded-md p-1"
                    value={order.status}
                    onChange={(e) => handleChangeStatus(order.id, e.target.value)}
                  >
                    <option value="Pendiente">Pendiente</option>
                    <option value="En Proceso">En Proceso</option>
                    <option value="Completada">Completada</option>
                    <option value="Cancelada">Cancelada</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersList;
