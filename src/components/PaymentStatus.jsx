import React from "react";
import CatalogManager from "./CatalogManager";

const PaymentStatus = () => {
  const fields = [
    {
      name: "label", 
      label: "Nombre del Estado de Pago", 
      required: true, 
      validate: (value, data) => {
        if (!value) {
          return "El nombre del estado de pago es obligatorio.";
        }
        if (data.some((item) => item.label && item.label.toLowerCase() === value.toLowerCase())) {
          return "El estado de pago ya existe. Por favor, ingrese un nombre único.";
        }
        return null; 
      },
    },
  ];

  return (
    <CatalogManager
      catalogName="Estados de Pago" 
      fields={fields} 
      endpoint="/api/PaymentStatus" 
    />
  );
};

export default PaymentStatus;