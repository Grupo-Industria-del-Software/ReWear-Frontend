import React, { useState, useEffect, useCallback } from "react";
import { FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const backendUrl = `${process.env.REACT_APP_API_ENV}`;

const CatalogManager = ({ catalogName, fields, endpoint }) => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const initializeItem = useCallback(() => {
    const newItem = { id: null };
    fields.forEach(field => {
      newItem[field.name] = field.type === "checkbox" ? false : "";
    });
    return newItem;
  }, [fields]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}${endpoint}`);
      if (!response.ok) throw new Error("Error al cargar datos");
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cargar los datos");
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
    setCurrentItem(initializeItem());
  }, [fetchData, initializeItem, endpoint]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let isValid = true;
      for (const field of fields) {
        if (field.validate) {
          let errorMessage;
          
          if (field.validate.constructor.name === "AsyncFunction") {
            errorMessage = await field.validate(currentItem[field.name], data, currentItem);
          } else {
            errorMessage = field.validate(currentItem[field.name], data, currentItem);
          }

          if (errorMessage) {
            toast.error(errorMessage);
            isValid = false;
            break;
          }
        }
      }

      if (!isValid) return;

      const requestBody = {};
      fields.forEach(field => {
        requestBody[field.name] = field.type === "number" && currentItem[field.name] !== "" 
          ? Number(currentItem[field.name]) 
          : currentItem[field.name];
      });

      const url = currentItem.id 
        ? `${backendUrl}${endpoint}/${currentItem.id}` 
        : `${backendUrl}${endpoint}`;
      
      const method = currentItem.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Error en la solicitud");
      }

      const result = await response.json();

      if (method === "POST") {
        setData(prev => [...prev, result]);
        toast.success("Registro creado exitosamente!");
      } else {
        setData(prev => prev.map(item => item.id === result.id ? result : item));
        toast.success("Registro actualizado exitosamente!");
      }

      setIsEditing(false);
      setCurrentItem(initializeItem());

    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message || "Error al guardar los datos");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm(`¿Estás seguro de eliminar este registro?`)) {
      setIsLoading(true);
      try {
        const response = await fetch(`${backendUrl}${endpoint}/${id}`, {
          method: "DELETE"
        });

        if (!response.ok) throw new Error("Error al eliminar");

        setData(prev => prev.filter(item => item.id !== id));
        toast.success("Registro eliminado exitosamente!");
      } catch (error) {
        console.error("Error:", error);
        toast.error(error.message || "Error al eliminar");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const styles = {
    container: { padding: "20px", fontFamily: "'Poppins', sans-serif" },
    title: { color: "#A26964", fontSize: "24px", marginBottom: "20px" },
    form: { marginBottom: "20px" },
    formGroup: { marginBottom: "10px" },
    label: { display: "block", marginBottom: "5px", color: "#A26964" },
    input: { width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #A26964" },
    button: { backgroundColor: "#A26964", color: "#E1DAD3", padding: "10px 20px", 
             borderRadius: "4px", border: "none", cursor: "pointer", marginRight: "10px" },
    cancelButton: { backgroundColor: "#A2B0CA", color: "#E1DAD3", padding: "10px 20px", 
                   borderRadius: "4px", border: "none", cursor: "pointer" },
    table: { width: "100%", borderCollapse: "collapse" },
    th: { backgroundColor: "#A26964", color: "#E1DAD3", padding: "10px", textAlign: "left" },
    tr: { borderBottom: "1px solid #A26964" },
    td: { padding: "10px", color: "#A26964" },
    actionButton: { backgroundColor: "transparent", border: "none", cursor: "pointer", 
                   color: "#A26964", marginRight: "10px" }
  };

  return (
    <div style={styles.container}>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <h2 style={styles.title}>Gestión de {catalogName}</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        {fields.map(field => (
          <div key={field.name} style={styles.formGroup}>
            <label style={styles.label}>{field.label}</label>
            {field.type === "checkbox" ? (
              <input
                type="checkbox"
                name={field.name}
                checked={currentItem?.[field.name] || false}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                value={currentItem?.[field.name] ?? ""}
                onChange={handleInputChange}
                required={field.required}
                disabled={isLoading}
                style={styles.input}
              />
            )}
          </div>
        ))}

        <div>
          <button type="submit" style={styles.button} disabled={isLoading}>
            {isLoading ? (
              <FaSpinner style={{ animation: "spin 1s linear infinite" }} />
            ) : isEditing ? (
              "Actualizar"
            ) : (
              "Agregar"
            )}
            {isLoading && " Procesando..."}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setCurrentItem(initializeItem());
              }}
              style={styles.cancelButton}
              disabled={isLoading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {isLoading && data.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <FaSpinner style={{ animation: "spin 1s linear infinite", marginRight: "8px" }} />
          Cargando datos...
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              {fields.map(field => (
                <th key={field.name} style={styles.th}>{field.label}</th>
              ))}
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => (
              <tr key={item.id} style={styles.tr}>
                <td style={styles.td}>{item.id}</td>
                {fields.map(field => (
                  <td key={field.name} style={styles.td}>
                    {field.type === "checkbox" ? (
                      <input type="checkbox" checked={item[field.name] || false} readOnly />
                    ) : (
                      item[field.name]
                    )}
                  </td>
                ))}
                <td style={styles.td}>
                  <button onClick={() => handleEdit(item)} style={styles.actionButton} title="Editar">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={styles.actionButton} title="Eliminar">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CatalogManager;