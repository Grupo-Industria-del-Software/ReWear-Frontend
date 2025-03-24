import React from "react";
import CatalogManager from "./CatalogManager";

const UserRoles = () => {
  const fields = [
    {
      name: "rol", 
      label: "Nombre del Rol", 
      required: true, 
      validate: (value, data) => {
        if (data.some((item) => item.rol.toLowerCase() === value.toLowerCase())) {
          return "El rol ya existe. Por favor, ingrese un nombre único.";
        }
        return null; 
      },
    },
  ];

  return (
    <CatalogManager
      catalogName="Roles de Usuario" 
      fields={fields} 
      endpoint="/api/userroles" 
    />
  );
};

export default UserRoles;