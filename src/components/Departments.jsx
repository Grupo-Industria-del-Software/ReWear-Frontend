import CatalogManager from "./CatalogManager";

const Departments = () => {
  const fields = [
    { name: "departmentName", label: "Nombre del Departamento", required: true },
  ];

  return (
    <CatalogManager
      catalogName="Departamentos"
      fields={fields}
      endpoint="/api/department"
    />
  );
};

export default Departments;