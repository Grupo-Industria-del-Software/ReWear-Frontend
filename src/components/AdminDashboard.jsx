import React from "react";

const AdminDashboard = () => {
  return (
    <div style={dashboardStyle}>
      <div style={mainContainerStyle}>
        <div style={contentContainerStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>
              <span style={welcomeTextStyle}>¡Bienvenido!</span>
              <br />
              <span style={brandTextStyle}>Panel de Administración</span>
              <br />
              <span style={subBrandTextStyle}>ReWear</span>
            </h1>
            
            <div style={dividerStyle}></div>
            
            <p style={descriptionStyle}>
              Gestiona toda la plataforma desde este panel
            </p>
          </div>

          <div style={cardsContainerStyle}>
            <div style={cardStyle}>
              <div style={cardIconStyle}>👥</div>
              <h3 style={cardTitleStyle}>Usuarios</h3>
              <p style={cardTextStyle}>Administra perfiles, roles y permisos</p>
              <div style={cardHoverEffect}></div>
            </div>
            
            <div style={cardStyle}>
              <div style={cardIconStyle}>📊</div>
              <h3 style={cardTitleStyle}>Reportes</h3>
              <p style={cardTextStyle}>Genera análisis y estadísticas</p>
              <div style={cardHoverEffect}></div>
            </div>
            
            <div style={cardStyle}>
              <div style={cardIconStyle}>🔄</div>
              <h3 style={cardTitleStyle}>Suscripciones</h3>
              <p style={cardTextStyle}>Gestiona membresías y renovaciones</p>
              <div style={cardHoverEffect}></div>
            </div>
            
            <div style={cardStyle}>
              <div style={cardIconStyle}>📋</div>
              <h3 style={cardTitleStyle}>Catálogos</h3>
              <p style={cardTextStyle}>Administra Departamentos, Categorias, Condiciones, etc...</p>
              <div style={cardHoverEffect}></div>
            </div>
          </div>
        </div>
        
        <div style={imageContainerStyle}>
          <img
            src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Moda sostenible"
            style={imageStyle}
          />
          <div style={imageOverlayStyle}></div>
        </div>
      </div>
    </div>
  );
};

// Estilos 
const dashboardStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 80px)",
  background: "linear-gradient(135deg, #f5f7fa 0%, #c2d2c7 100%)",
  padding: "40px",
};

const mainContainerStyle = {
  display: "flex",
  maxWidth: "1200px",
  width: "100%",
  borderRadius: "20px",
  overflow: "hidden",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
  background: "#ffffff",
  transition: "all 0.3s ease",
  ":hover": {
    boxShadow: "0 30px 60px -10px rgba(0, 0, 0, 0.2)"
  }
};

const contentContainerStyle = {
  flex: "1",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const headerStyle = {
  marginBottom: "50px",
  textAlign: "left"
};

const titleStyle = {
  margin: "0",
  lineHeight: "1.2",
  fontWeight: "700"
};

const welcomeTextStyle = {
  fontSize: "24px",
  color: "#A26964",
  fontWeight: "400",
  letterSpacing: "1px"
};

const brandTextStyle = {
  fontSize: "42px",
  background: "linear-gradient(90deg, #A26964 0%, #C2D2C7 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "800",
  display: "inline-block"
};

const subBrandTextStyle = {
  fontSize: "52px",
  color: "#A26964",
  fontWeight: "800",
  fontStyle: "italic"
};

const dividerStyle = {
  height: "4px",
  width: "100px",
  background: "linear-gradient(90deg, #A26964 0%, #C2D2C7 100%)",
  margin: "20px 0",
  borderRadius: "2px"
};

const descriptionStyle = {
  fontSize: "18px",
  color: "#6B7280",
  maxWidth: "500px",
  lineHeight: "1.6"
};

const cardsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
};

const cardStyle = {
  background: "#FFFFFF",
  borderRadius: "12px",
  padding: "25px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  border: "1px solid rgba(162, 105, 100, 0.1)",
  ":hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 10px 25px rgba(162, 105, 100, 0.1)"
  }
};

const cardIconStyle = {
  fontSize: "32px",
  marginBottom: "15px",
  color: "#A26964"
};

const cardTitleStyle = {
  margin: "0 0 10px 0",
  color: "#111827",
  fontSize: "18px",
  fontWeight: "600"
};

const cardTextStyle = {
  margin: "0",
  color: "#6B7280",
  fontSize: "14px",
  lineHeight: "1.5"
};

const cardHoverEffect = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, rgba(162, 105, 100, 0.1) 0%, rgba(194, 210, 199, 0.1) 100%)",
  opacity: "0",
  transition: "opacity 0.3s ease",
  ":hover": {
    opacity: "1"
  }
};

const imageContainerStyle = {
  flex: "1",
  position: "relative",
  minHeight: "500px",
  display: "flex",
  "@media (max-width: 900px)": {
    display: "none"
  }
};

const imageStyle = {
  width: "100%",
  height: "100%",
  objectFit: "cover"
};

const imageOverlayStyle = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "linear-gradient(to right, rgba(255,255,255,0.2) 0%, rgba(162, 105, 100, 0.15) 100%)"
};

export default AdminDashboard;