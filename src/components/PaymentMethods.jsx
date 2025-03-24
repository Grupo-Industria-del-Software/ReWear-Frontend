import React from "react";
import CatalogManager from "./CatalogManager";

const PaymentMethods = () => {
  const fields = [
    {
      name: "name", 
      label: "Nombre del Método de Pago", 
      required: true, 
      validate: (value, data) => {

        if (!value) {
          return "El nombre del método de pago es obligatorio.";
        }
        if (data.some((item) => item.name && item.name.toLowerCase() === value.toLowerCase())) {
          return "El método de pago ya existe. Por favor, ingrese un nombre único.";
        }
        return null; 
      },
    },
    {
      name: "isActive", 
      label: "Activo", 
      type: "checkbox", 
    },
  ];

  return (
    <CatalogManager
      catalogName="Métodos de Pago" 
      fields={fields} 
      endpoint="/api/PaymentMethod" 
    />
  );
};

export default PaymentMethods;