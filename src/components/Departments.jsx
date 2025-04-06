import CatalogManager from "./CatalogManager";

const Departments = () => {
  const validateDepartmentName = (value, data) => {
    if (!value) return "El nombre del departamento es requerido";
    
    const exists = data.some(
      (department) =>
        department.departmentName.toLowerCase() === value.toLowerCase()
    );
    
    if (exists) {
      return "El nombre del departamento ya existe. Por favor, ingrese un nombre único.";
    }
    return null;
  };

  const fields = [
    { 
      name: "departmentName", 
      label: "Nombre del Departamento", 
      required: true,
      validate: validateDepartmentName,
    },
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