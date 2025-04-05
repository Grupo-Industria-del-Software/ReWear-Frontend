import React from 'react';
import { FiShoppingBag, FiMessageSquare, FiClipboard, FiUser } from 'react-icons/fi';

const ProviderNavbar = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 w-full bg-white shadow-md md:static md:shadow-none flex justify-around items-center py-2">
      <button
        onClick={() => setActiveTab('products')}
        className={`flex flex-col items-center text-sm ${
          activeTab === 'products' ? 'text-[#B57C7C] font-semibold' : 'text-[#333333]'
        }`}
      >
        <FiShoppingBag size={20} />
        <span>Productos</span>
      </button>

      <button
        onClick={() => setActiveTab('chat')}
        className={`flex flex-col items-center text-sm ${
          activeTab === 'chat' ? 'text-[#B57C7C] font-semibold' : 'text-[#333333]'
        }`}
      >
        <FiMessageSquare size={20} />
        <span>Chat</span>
      </button>

      <button
        onClick={() => setActiveTab('orders')}
        className={`flex flex-col items-center text-sm ${
          activeTab === 'orders' ? 'text-[#B57C7C] font-semibold' : 'text-[#333333]'
        }`}
      >
        <FiClipboard size={20} />
        <span>Órdenes</span>
      </button>

      <button
        onClick={() => setActiveTab('profile')}
        className={`flex flex-col items-center text-sm ${
          activeTab === 'profile' ? 'text-[#B57C7C] font-semibold' : 'text-[#333333]'
        }`}
      >
        <FiUser size={20} />
        <span>Perfil</span>
      </button>
    </nav>
  );
};

export default ProviderNavbar;
