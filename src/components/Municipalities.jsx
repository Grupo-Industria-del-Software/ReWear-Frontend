import React from "react";
import CatalogManager from "./CatalogManager";

const Municipalities = () => {
  const fields = [
    { name: "departmentId", label: "ID del Departamento", required: true, type: "number" },
    { name: "name", label: "Nombre del Municipio", required: true },
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