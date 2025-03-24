import React from "react";
import CatalogManager from "./CatalogManager";

const ProductStatus = () => {
  const fields = [
    {
      name: "label",
      label: "Nombre del Estado", 
      required: true, 
      validate: (value, data) => {
        if (!value) {
          return "El nombre del estado es obligatorio.";
        }
        if (data.some((item) => item.label && item.label.toLowerCase() === value.toLowerCase())) {
          return "El estado ya existe. Por favor, ingrese un nombre único.";
        }
        return null; 
      },
    },
  ];

  return (
    <CatalogManager
      catalogName="Estados de Producto" 
      fields={fields} 
      endpoint="/api/ProductStatus" 
    />
  );
};

export default ProductStatus;