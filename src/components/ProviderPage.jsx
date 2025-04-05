import React, { useState } from 'react';
import ProviderNavbar from './ProviderNabvar';
import ProductList from './ProductList';
import Chat from './Chat';
import OrdersList from './OrderList';
import Profile from './ProfileProvider';

const ProviderPage = () => {
  const [activeTab, setActiveTab] = useState('products');

  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductList />;
      case 'chat':
        return <Chat />;
      case 'orders':
        return <OrdersList />;
      case 'profile':
        return <Profile />;
      default:
        return <ProductList />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F1F1] font-sans">
      {/* Navbar fija en la parte inferior en mobile */}
      <ProviderNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Contenido principal */}
      <div className="pt-16 pb-20 px-4 md:px-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default ProviderPage;
