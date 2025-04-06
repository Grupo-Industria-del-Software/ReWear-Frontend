import React from "react";
import Sidebar from "./Sidebar";
import CatalogManager from "./CatalogManager";

const Category = () => {
  const fields = [
    {
      name: "label",
      label: "Nombre de la Categoría",
      required: true,
      validate: (value, data, currentItem) => {
        if (!value || value.trim() === "") {
          return "El nombre de la categoría es obligatorio.";
        }
        const exists = data.some(item => 
          item.label &&  
          item.label.toLowerCase() === value.toLowerCase() &&
          (!currentItem.id || item.id !== currentItem.id)
        );
        return exists ? "La categoría ya existe. Por favor, ingrese un nombre único." : null;
      },
    },
  ];

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <CatalogManager
          catalogName="Categorías"
          fields={fields}
          endpoint="/api/Category"  
        />
      </div>
    </div>
  );
};

export default Category;