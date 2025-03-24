import React from "react";
import CatalogManager from "./CatalogManager";

const OrderTypes = () => {
  const fields = [
    {
      name: "type", 
      label: "Tipo de Orden", 
      required: true,
      validate: (value, data) => {
        if (!value) {
          return "El tipo de orden es obligatorio.";
        }
        if (data.some((item) => item.type && item.type.toLowerCase() === value.toLowerCase())) {
          return "El tipo de orden ya existe. Por favor, ingrese un nombre único.";
        }
        return null; 
      },
    },
  ];

  return (
    <CatalogManager
      catalogName="Tipos de Orden" 
      fields={fields} 
      endpoint="/api/OrderType" 
    />
  );
};

export default OrderTypes;