import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const Chat = ({ role = 'client' }) => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMsg, setNewMsg] = useState('');
  const userId = role === 'client' ? 2 : 1;
  const baseUrl = 'https://localhost:7039/api/Chat';

  useEffect(() => {
    fetch(`${baseUrl}/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error('Error en la solicitud');
        return response.json();
      })
      .then(data => setChats(data))
      .catch(error => console.error('Error al cargar chats:', error));
  }, [userId]);

  const handleSend = () => {
    if (!newMsg.trim() || !selectedChat) return;
    const messageDto = {
      chatId: selectedChat.chatId,
      senderId: userId,
      content: newMsg
    };
    fetch(`${baseUrl}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(messageDto)
    })
      .then(response => {
        if (!response.ok) throw new Error('Error en la solicitud');
        return response.json();
      })
      .then(newMessage => {
        const updatedChat = { 
          ...selectedChat, 
          messages: [...(selectedChat.messages || []), newMessage] 
        };
        setSelectedChat(updatedChat);
        setChats(prevChats =>
          prevChats.map(chat =>
            chat.chatId === updatedChat.chatId ? updatedChat : chat
          )
        );
        setNewMsg('');
      })
      .catch(error => console.error('Error al enviar el mensaje:', error));
  };

  return (
    <div className="min-h-screen bg-[#FAEDE4]">
      <div className="flex flex-col md:flex-row h-full">
        <div className={`md:w-1/3 border-r border-gray-300 p-6 bg-[#D9A89C] text-white ${selectedChat ? 'hidden md:block' : 'block'}`}>
          <h1 className="text-2xl font-bold mb-4">Conversaciones</h1>
          <ul>
            {chats.map((chat, index) => {
              const displayName = role === 'client' ? (chat.providerName || 'Proveedor') : (chat.buyerName || 'Cliente');
              const displayImage = role === 'client' ? (chat.providerImageUrl || 'https://via.placeholder.com/50') : (chat.buyerImageUrl || 'https://via.placeholder.com/50');
              return (
                <li
                  key={chat.chatId || index}
                  onClick={() => setSelectedChat(chat)}
                  className={`flex items-center justify-between p-3 mb-3 rounded-lg cursor-pointer ${selectedChat && selectedChat.chatId === chat.chatId ? 'bg-[#F7D7C4] text-[#8B5A56]' : 'hover:bg-[#F7D7C4] hover:text-[#8B5A56]'}`}
                >
                  <div className="flex items-center">
                    <img 
                      src={displayImage}
                      alt={displayName}
                      className="w-10 h-10 rounded-full mr-3 border border-white"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                    />
                    <div>
                      <span className="font-semibold block">{displayName}</span>
                      <span className="text-sm text-gray-200">
                        {chat.messages && chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : 'No hay mensajes aún'}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className={`flex-1 p-6 flex flex-col ${selectedChat ? 'block' : 'hidden md:block'}`}>
          {selectedChat ? (
            <>
              <div className="md:hidden mb-4 flex items-center">
                <button 
                  onClick={() => setSelectedChat(null)}
                  className="text-[#8B5A56] text-2xl mr-2"
                >
                  <FaArrowLeft />
                </button>
              </div>
              <div className="mb-4 flex items-center space-x-4 text-[#8B5A56]">
                <img 
                  src={role === 'client' ? (selectedChat.providerImageUrl || 'https://via.placeholder.com/50') : (selectedChat.buyerImageUrl || 'https://via.placeholder.com/50')}
                  alt={role === 'client' ? (selectedChat.providerName || 'Proveedor') : (selectedChat.buyerName || 'Cliente')}
                  className="w-12 h-12 rounded-full border border-[#D9A89C]"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/50'; }}
                />
                <h2 className="text-2xl font-bold">
                  {role === 'client' ? (selectedChat.providerName || 'Proveedor') : (selectedChat.buyerName || 'Cliente')}
                </h2>
              </div>
              <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 overflow-y-auto mb-4 border border-[#D9A89C]">
                {selectedChat.messages && selectedChat.messages.length > 0 ? (
                  selectedChat.messages.map((msg, index) => (
                    <div 
                      key={msg.id || index} 
                      className={`mb-4 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}
                    >
                      <span className={`inline-block px-4 py-2 rounded-lg shadow ${msg.senderId === userId ? 'bg-[#D9A89C] text-white' : 'bg-[#FAEDE4] text-[#8B5A56]'}`}>
                        {msg.content}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No hay mensajes aún.</p>
                )}
              </div>
              <div className="flex">
                <input
                  type="text"
                  className="flex-1 p-3 border rounded-l-lg bg-[#FAEDE4] text-[#8B5A56] placeholder-[#8B5A56]"
                  placeholder="Escribe un mensaje..."
                  value={newMsg}
                  onChange={(e) => setNewMsg(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <button 
                  onClick={handleSend}
                  className="bg-[#8B5A56] hover:bg-[#6F3F3D] text-white px-6 py-3 rounded-r-lg"
                >
                  Enviar
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-[#8B5A56]">
              <p>Selecciona una conversación para ver los mensajes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
