import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import AuthNavBar from './AuthNavBar';

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newMsg, setNewMsg] = useState('');
  const userId = sessionStorage.getItem('userId');
  const baseUrl = 'https://localhost:44367/api/Chat';

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
    <div className="min-h-screen bg-[#FAEDE4] flex flex-col">
      <AuthNavBar />
      
      {/* Contenedor principal con altura ajustada */}
      <div 
        className="flex-1 overflow-hidden" 
        style={{ 
          height: 'calc(100vh - 64px)',
          marginTop: '64px' 
        }}
      >
        <div className="flex h-full flex-col md:flex-row">
          {/* Lista de chats */}
          <div className={`md:w-1/3 border-r border-gray-300 p-4 bg-[#D9A89C] ${selectedChat ? 'hidden md:block' : 'block'} overflow-y-auto`}>
            <h1 className="text-2xl font-bold mb-4 text-white">Conversaciones</h1>
            <ul>
              {chats.map((chat) => (
                <li
                  key={chat.chatId}
                  onClick={() => setSelectedChat(chat)}
                  className={`flex items-center p-3 mb-3 rounded-lg cursor-pointer ${
                    selectedChat?.chatId === chat.chatId 
                      ? 'bg-[#F7D7C4] text-[#8B5A56]' 
                      : 'hover:bg-[#F7D7C4] hover:text-[#8B5A56]'
                  }`}
                >
                  <div className="flex items-center">
                    <img
                      src={chat.buyerImageUrl || 'https://via.placeholder.com/50'}
                      className="w-10 h-10 rounded-full mr-3 border-2 border-white"
                      alt=""
                    />
                    <div>
                    <span className="font-semibold block text-[#8B5A56]">{chat.buyerName || 'Cliente'}</span>
                    <span className="text-sm text-gray-200">
                      {chat.messages && chat.messages.length > 0 
                        ? chat.messages[chat.messages.length - 1].content
                        : 'No hay mensajes aún'}
                    </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Área de chat */}
          <div className={`flex-1 p-6 flex flex-col ${selectedChat ? 'block' : 'hidden md:block'}`}>
            {selectedChat ? (
              <>
                {/* Header fijo para móviles */}
                <div className="md:hidden flex items-center p-4 bg-[#FAEDE4] border-b border-[#D9A89C] fixed top-16 w-full z-50">
                  <button 
                    onClick={() => setSelectedChat(null)}
                    className="text-[#8B5A56] text-2xl mr-3"
                  >
                    <FaArrowLeft />
                  </button>
                  <img
                    src={selectedChat.buyerImageUrl || 'https://via.placeholder.com/50'}
                    className="w-8 h-8 rounded-full border border-[#D9A89C]"
                    alt=""
                  />
                  <h2 className="ml-2 font-bold text-[#8B5A56]">{selectedChat.buyerName}</h2>
                </div>

                {/* Mensajes */}
                <div 
                  className="flex-1 overflow-y-auto p-4 pt-20 md:pt-4" 
                  style={{ marginTop: '64px' }} 
                >
                  <div className="bg-white rounded-xl p-4 shadow-lg border border-[#D9A89C]">
                    {selectedChat.messages?.map((msg) => (
                      <div
                        key={msg.id}
                        className={`my-2 ${msg.senderId === userId ? 'text-right' : 'text-left'}`}
                      >
                        <span
                          className={`inline-block px-4 py-2 rounded-lg max-w-[70%] ${
                            msg.senderId === userId
                              ? 'bg-[#D9A89C] text-white'
                              : 'bg-[#FAEDE4] text-[#8B5A56]'
                          }`}
                        >
                          {msg.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Input de mensaje */}
                <div className="p-4 border-t border-[#D9A89C] bg-[#FAEDE4]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Escribe un mensaje..."
                      className="flex-1 p-2 rounded-lg border bg-white text-[#8B5A56]"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-[#8B5A56] text-white px-4 py-2 rounded-lg hover:bg-[#6F3F3D]"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-[#8B5A56]">
                <p>Selecciona una conversación</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;