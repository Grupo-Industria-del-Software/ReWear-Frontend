import React from "react";
import CatalogManager from "./CatalogManager";

const Conditions = () => {
  const fields = [
    {
      name: "name", 
      label: "Nombre de la Condición", 
      required: true, 
      validate: (value, data) => {
        if (!value) {
          return "El nombre de la condición es obligatorio.";
        }
        if (data.some((item) => item.name && item.name.toLowerCase() === value.toLowerCase())) {
          return "La condición ya existe. Por favor, ingrese un nombre único.";
        }
        return null; 
      },
    },
  ];

  return (
    <CatalogManager
      catalogName="Condiciones" 
      fields={fields} 
      endpoint="/api/condition" 
    />
  );
};

export default Conditions;