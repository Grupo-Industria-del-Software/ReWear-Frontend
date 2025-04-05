import React, { useState } from 'react';
import Chat from './Chat'; 

const menuItems = [
  { id: 'productos', label: 'Productos' },
  { id: 'solicitudes', label: 'Solicitudes' },
  { id: 'chat', label: 'Chat' },
  { id: 'historial', label: 'Historial de Pedidos' },
  { id: 'estado', label: 'Estado de Pedidos' },
];

const Dashboard = () => {
  const [activeMenu, setActiveMenu] = useState('productos');

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold">Bienvenido, Vendedor</h2>
          <p className="text-sm text-gray-300">Administra tus productos y pedidos</p>
        </div>
        <nav>
          <ul>
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full text-left px-4 py-2 rounded mb-2 hover:bg-gray-700 ${
                    activeMenu === item.id ? 'bg-gray-700' : ''
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        {activeMenu === 'productos' && <ProductsSection />}
        {activeMenu === 'solicitudes' && <RequestsSection onAccept={() => setActiveMenu('chat')} />}
        {activeMenu === 'chat' && <Chat />}
        {activeMenu === 'historial' && <HistorySection />}
        {activeMenu === 'estado' && <OrderStatusSection />}
      </main>
    </div>
  );
};

// Componente para administrar productos
const ProductsSection = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Vestido Largo', price: 25 },
    { id: 2, name: 'Camisa Casual', price: 15 },
  ]);

  const handleEdit = (id) => {
    alert(`Editar producto ${id}`);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Mis Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white shadow rounded p-4 flex justify-between items-center">
            <div>
              <h2 className="font-semibold">{product.name}</h2>
              <p className="text-gray-600">$ {product.price}</p>
            </div>
            <button
              onClick={() => handleEdit(product.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Editar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para solicitudes
const RequestsSection = ({ onAccept }) => {
  const [requests, setRequests] = useState([
    { id: 1, client: 'Cliente A', product: 'Vestido Largo', status: 'Pendiente' },
    { id: 2, client: 'Cliente B', product: 'Camisa Casual', status: 'Pendiente' },
  ]);

  const handleAccept = (id) => {
    alert(`Solicitud ${id} aceptada`);
    // Al aceptar se cambia la vista al Chat
    onAccept();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Solicitudes</h1>
      <div className="space-y-4">
        {requests.map(req => (
          <div key={req.id} className="bg-white shadow rounded p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{req.client}</p>
              <p className="text-gray-600">{req.product}</p>
              <p className="text-sm text-yellow-600">{req.status}</p>
            </div>
            <button
              onClick={() => handleAccept(req.id)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Aceptar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para Historial de Pedidos
const HistorySection = () => {
  const [orders, setOrders] = useState([
    { id: 1, client: 'Cliente A', product: 'Vestido Largo', date: '2025-03-20', status: 'Entregado' },
    { id: 2, client: 'Cliente B', product: 'Camisa Casual', date: '2025-03-22', status: 'En Proceso' },
  ]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Historial de Pedidos</h1>
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Cliente</th>
            <th className="py-2 px-4 border-b">Producto</th>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Estado</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td className="py-2 px-4 border-b">{order.id}</td>
              <td className="py-2 px-4 border-b">{order.client}</td>
              <td className="py-2 px-4 border-b">{order.product}</td>
              <td className="py-2 px-4 border-b">{order.date}</td>
              <td className="py-2 px-4 border-b">{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Componente para Estado de Pedidos
const OrderStatusSection = () => {
  const [orders, setOrders] = useState([
    { id: 1, client: 'Cliente A', product: 'Vestido Largo', status: 'En Proceso' },
    { id: 2, client: 'Cliente B', product: 'Camisa Casual', status: 'Pendiente' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Estado de Pedidos</h1>
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white shadow rounded p-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">Pedido #{order.id}</p>
              <p className="text-gray-600">{order.client} - {order.product}</p>
              <p className="text-sm text-gray-700">Estado: {order.status}</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleStatusChange(order.id, 'En Proceso')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
              >
                En Proceso
              </button>
              <button
                onClick={() => handleStatusChange(order.id, 'Entregado')}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Entregado
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
