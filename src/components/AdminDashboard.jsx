import React from "react";

const AdminDashboard = () => {
  return (
    <div style={dashboardStyle}>
      {/* Contenedor del contenido */}
      <div style={contentStyle}>
        {/* Título de bienvenida */}
        <h1 style={titleStyle}>¡Bienvenido al Panel de Administración de ReWear!</h1>
        <br></br>

        {/* Descripción */}
        <p style={descriptionStyle}>
          Elige un módulo del menú lateral y comienza a gestionar usuarios, suscripciones, reportes y catálogos.
        </p>

        {/* Información adicional */}
        <div style={infoStyle}>
          <p>
            Desde aquí podrás:
          </p>
          <ul style={listStyle}>
            <li>❥ Gestionar usuarios y roles.</li>
            <li>❥ Administrar suscripciones.</li>
            <li>❥ Generar reportes.</li>
            <li>❥ Gestionar todos los catálogos.</li>
          </ul>
        </div>
      </div>

      <img
        src="https://www.cambio16.com/wp-content/uploads/2024/08/ropa-4.jpg" 
        alt="Imagen de bienvenida"
        style={imageStyle}
      />
      <br></br>
    </div>
  );
};

const dashboardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#C2D2C7", 
  //minHeight: "100vh",
  //padding: "40px",
  textAlign: "center",
};

const contentStyle = {
  maxWidth: "800px",
  marginBottom: "23px",
};

const titleStyle = {
  fontFamily: "'Playfair Display', serif",
  color: "#A26964", 
  fontSize: "32px",
  marginBottom: "20px",
};

const descriptionStyle = {
  fontFamily: "'Poppins', sans-serif",
  color: "#A26964", 
  fontSize: "18px",
  marginBottom: "30px",
};

const infoStyle = {
  fontFamily: "'Poppins', sans-serif",
  color: "#A26964", 
  fontSize: "16px",
  textAlign: "left",
  margin: "0 auto",
  maxWidth: "600px",
};

const listStyle = {
  listStyleType: "none",
  padding: "0",
};

const imageStyle = {
  width: "100%",
  maxWidth: "600px",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
};

export default AdminDashboard;