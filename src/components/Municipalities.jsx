import React from "react";
import CatalogManager from "./CatalogManager";

const backendUrl = "https://localhost:44367";

const Municipalities = () => {
  const validateMunicipalityName = (value, data, currentItem) => {
    if (!value || value.trim() === "") return "El nombre del municipio es requerido";
    
    const exists = data.some(municipality => {
      const sameName = municipality.name.toLowerCase() === value.toLowerCase();
      const sameDepartment = municipality.departmentId.toString() === currentItem.departmentId.toString();
      const isDifferentItem = !currentItem.id || municipality.id !== currentItem.id;
      
      return sameName && sameDepartment && isDifferentItem;
    });
    
    if (exists) {
      return "Ya existe un municipio con este nombre en el departamento seleccionado";
    }
    return null;
  };

  const validateDepartmentId = async (value) => {
    if (!value || value.toString().trim() === "") return "Debe seleccionar un departamento";
    
    try {
      const response = await fetch(`${backendUrl}/api/department/${value}`);
      if (!response.ok) return "El departamento seleccionado no existe";
      return null;
    } catch (error) {
      console.error("Error validando departamento:", error);
      return "Error al validar el departamento";
    }
  };

  const fields = [
    { 
      name: "departmentId", 
      label: "ID del Departamento", 
      required: true, 
      type: "number",
      validate: validateDepartmentId
    },
    { 
      name: "name", 
      label: "Nombre del Municipio", 
      required: true,
      validate: validateMunicipalityName
    },
  ];

  return (
    <CatalogManager
      catalogName="Municipios"
      fields={fields}
      endpoint="/api/Municipality"
    />
  );
};

export default Municipalities;