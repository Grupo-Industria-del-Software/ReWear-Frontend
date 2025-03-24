import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const backendUrl = "https://localhost:7039"; 

const CatalogManager = ({ catalogName, fields, endpoint }) => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const fetchData = () => {
    fetch(`${backendUrl}${endpoint}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        return response.json();
      })
      .then((data) => {
        const formattedData = data.map((item) => ({
          ...item,
          isActive: item.isActive !== undefined ? item.isActive : false, 
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentItem((prevItem) => ({
      ...prevItem,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;
    fields.forEach((field) => {
      if (field.validate) {
        const errorMessage = field.validate(currentItem[field.name], data);
        if (errorMessage) {
          alert(errorMessage); 
          isValid = false;
        }
      }
    });

    if (!isValid) return; 

    const url = currentItem.id
      ? `${backendUrl}${endpoint}/${currentItem.id}`
      : `${backendUrl}${endpoint}`;
    const method = currentItem.id ? "PUT" : "POST";

    const requestBody = {};
    fields.forEach((field) => {
      requestBody[field.name] = currentItem[field.name];
    });

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la solicitud");
        }
        if (response.status === 204) {
          return null; 
        }
        return response.json();
      })
      .then((newItem) => {
        if (method === "POST") {
          setData([...data, newItem]);
        } else {
          const updatedItem = newItem || { ...currentItem, ...requestBody };
          setData(data.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
        }
        setIsEditing(false);
        setCurrentItem(null); 
      })
      .catch((error) => {
        console.error("Error saving data:", error);
        alert("Hubo un error al guardar los datos. Por favor, inténtalo de nuevo.");
      });
  };

  const handleDelete = (id) => {
    fetch(`${backendUrl}${endpoint}/${id}`, { method: "DELETE" })
      .then(() => fetchData()) 
      .catch((error) => console.error("Error deleting data:", error));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de {catalogName}</h2>

      {/* Formulario para agregar/editar */}
      <form onSubmit={handleSubmit} style={styles.form}>
        {fields.map((field) => (
          <div key={field.name} style={styles.formGroup}>
            <label style={styles.label}>{field.label}</label>
            {field.type === "checkbox" ? (
              <input
                type="checkbox"
                name={field.name}
                checked={currentItem ? currentItem[field.name] || false : false}
                onChange={handleInputChange}
                style={styles.input}
              />
            ) : (
              <input
                type={field.type || "text"}
                name={field.name}
                value={currentItem ? currentItem[field.name] || "" : ""}
                onChange={handleInputChange}
                style={styles.input}
                required={field.required}
              />
            )}
          </div>
        ))}
        <button type="submit" style={styles.button}>
          {isEditing ? "Actualizar" : "Agregar"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setCurrentItem(null); 
            }}
            style={styles.cancelButton}
          >
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de registros */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            {fields.map((field) => (
              <th key={field.name} style={styles.th}>
                {field.label}
              </th>
            ))}
            <th style={styles.th}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} style={styles.tr}>
              <td style={styles.td}>{item.id}</td>
              {fields.map((field) => (
                <td key={field.name} style={styles.td}>
                  {field.name === "isActive" ? (
                    <input
                      type="checkbox"
                      checked={item[field.name] || false}
                      disabled
                    />
                  ) : (
                    item[field.name]
                  )}
                </td>
              ))}
              <td style={styles.td}>
                <button
                  onClick={() => {
                    console.log("Editando:", item);
                    setCurrentItem(item);
                    setIsEditing(true);
                  }}
                  style={styles.actionButton}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={styles.actionButton}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "'Poppins', sans-serif",
  },
  title: {
    color: "#A26964",
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "10px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    color: "#A26964",
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #A26964",
  },
  button: {
    backgroundColor: "#A26964",
    color: "#E1DAD3",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    marginRight: "10px",
  },
  cancelButton: {
    backgroundColor: "#A2B0CA",
    color: "#E1DAD3",
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    backgroundColor: "#A26964",
    color: "#E1DAD3",
    padding: "10px",
    textAlign: "left",
  },
  tr: {
    borderBottom: "1px solid #A26964",
  },
  td: {
    padding: "10px",
    color: "#A26964",
  },
  actionButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#A26964",
    marginRight: "10px",
  },
};

export default CatalogManager;