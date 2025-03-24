import React from "react";
import CatalogManager from "./CatalogManager";

const OrderStatus = () => {
  const fields = [
    {
      name: "label", 
      label: "Nombre del Estado de la Orden", 
      required: true, 
      validate: (value, data) => {
        if (!value) {
          return "El nombre del estado de la orden es obligatorio.";
        }
        if (data.some((item) => item.label && item.label.toLowerCase() === value.toLowerCase())) {
          return "El estado de la orden ya existe. Por favor, ingrese un nombre único.";
        }
        return null; 
      },
    },
  ];

  return (
    <CatalogManager
      catalogName="Estados de la Orden" 
      fields={fields} 
      endpoint="/api/OrderStatus"
    />
  );
};

export default OrderStatus;