import React from "react";
import CatalogManager from "./CatalogManager";

const Conditions = () => {
  const fields = [
    {
      name: "label", 
      label: "Nombre de la Condición", 
      required: true, 
      validate: (value, data, currentItem) => {
        if (!value || value.trim() === "") {
          return "El nombre de la condición es obligatorio.";
        }
        const exists = data.some(item => 
          item.label &&  
          item.label.toLowerCase() === value.toLowerCase() &&
          (!currentItem.id || item.id !== currentItem.id)
        );
        return exists ? "Esta condición ya existe. Ingrese un nombre único." : null;
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