import React from "react";
import Sidebar from "./Sidebar";
import CatalogManager from "./CatalogManager";

const Category = () => {
  const fields = [
    {
      name: "name",
      label: "Nombre de la Categoría",
      required: true,
      validate: (value, data) => {
        if (!value) {
          return "El nombre de la categoría es obligatorio.";
        }
        if (data.some((item) => item.name && item.name.toLowerCase() === value.toLowerCase())) {
          return "La categoría ya existe. Por favor, ingrese un nombre único.";
        }
        return null;
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
          endpoint="/api/category"
        />
      </div>
    </div>
  );
};

export default Category;