import React, { useState } from 'react';

const ProfileProvider = () => {
  const [profile, setProfile] = useState({
    name: 'Proveedor Ejemplo',
    email: 'proveedor@ejemplo.com',
    phone: '123456789',
    photo: 'https://via.placeholder.com/100',
  });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    // Lógica para guardar cambios (ej. llamada a API)
    setEditMode(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-[#333333]">Mi Perfil</h2>
      <div className="bg-white rounded-md shadow-md p-4 flex flex-col items-center">
        <div className="relative">
          <img
            src={profile.photo}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover"
          />
          {/* Puedes agregar funcionalidad para cambiar la foto al hacer clic */}
        </div>

        {!editMode ? (
          <div className="mt-4 text-center">
            <p className="text-[#333333] font-medium">{profile.name}</p>
            <p className="text-gray-600">{profile.email}</p>
            <p className="text-gray-600">{profile.phone}</p>
            <button
              className="mt-4 px-4 py-2 bg-[#B57C7C] text-white rounded-md"
              onClick={() => setEditMode(true)}
            >
              Editar Perfil
            </button>
          </div>
        ) : (
          <div className="mt-4 w-full max-w-sm">
            <label className="block mb-2 text-[#333333]">Nombre</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              value={profile.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />

            <label className="block mb-2 text-[#333333]">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md p-2 mb-2"
              value={profile.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />

            <label className="block mb-2 text-[#333333]">Teléfono</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
              value={profile.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />

            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 bg-gray-300 text-[#333333] rounded-md"
                onClick={() => setEditMode(false)}
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 bg-[#B57C7C] text-white rounded-md"
                onClick={handleSave}
              >
                Guardar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileProvider;
