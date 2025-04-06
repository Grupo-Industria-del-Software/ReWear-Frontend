import React, { useState } from "react";

const AdminDashboard = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

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
            
            <p style={descriptionStyle}>Gestiona toda la plataforma desde este panel</p></div>

          <div style={cardsContainerStyle}>
            {[
              { icon: "👥", title: "Usuarios", text: "Administra perfiles, roles y permisos" },
              { icon: "📊", title: "Reportes", text: "Genera análisis y estadísticas" },
              { icon: "🔄", title: "Suscripciones", text: "Gestiona membresías y renovaciones" },
              { icon: "📋", title: "Catálogos", text: "Administra Departamentos, Categorías, etc." }
            ].map((card, index) => (
              <div 
                key={index}
                style={{
                  ...cardStyle,
                  transform: hoveredCard === index ? "translateY(-5px)" : "none",
                  boxShadow: hoveredCard === index ? "0 10px 25px rgba(162, 105, 100, 0.1)" : "0 5px 15px rgba(0, 0, 0, 0.05)"
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={cardIconStyle}>{card.icon}</div>
                <h3 style={cardTitleStyle}>{card.title}</h3>
                <p style={cardTextStyle}>{card.text}</p>
                <div style={{
                  ...cardHoverEffect,
                  opacity: hoveredCard === index ? "1" : "0"
                }}></div>
              </div>
            ))}
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
  padding: "20px",
  overflow: "hidden"
};

const mainContainerStyle = {
  display: "flex",
  maxWidth: "1000px",
  width: "100%",
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.1)",
  background: "#ffffff",
  height: "auto",
  maxHeight: "90vh"
};

const contentContainerStyle = {
  flex: "1",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  overflowY: "auto"
};

const headerStyle = {
  marginBottom: "30px",
  textAlign: "left"
};

const titleStyle = {
  margin: "0",
  lineHeight: "1.2"
};

const welcomeTextStyle = {
  fontSize: "18px",
  color: "#A26964",
  fontWeight: "400",
  letterSpacing: "1px"
};

const brandTextStyle = {
  fontSize: "32px",
  background: "linear-gradient(90deg, #A26964 0%, #C2D2C7 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: "700",
  display: "inline-block"
};

const subBrandTextStyle = {
  fontSize: "40px",
  color: "#A26964",
  fontWeight: "700",
  fontStyle: "italic"
};

const dividerStyle = {
  height: "3px",
  width: "80px",
  background: "linear-gradient(90deg, #A26964 0%, #C2D2C7 100%)",
  margin: "15px 0",
  borderRadius: "2px"
};

const descriptionStyle = {
  fontSize: "16px",
  color: "#6B7280",
  maxWidth: "400px",
  lineHeight: "1.5",
  marginBottom: "-30px",
  marginTop: "0px" 
};

const cardsContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "15px",
  marginTop: "20px"
};

const cardStyle = {
  background: "#FFFFFF",
  borderRadius: "10px",
  padding: "15px 20px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
  transition: "all 0.3s ease",
  position: "relative",
  overflow: "hidden",
  border: "1px solid rgba(162, 105, 100, 0.1)",
  cursor: "pointer",
  minHeight: "160px"
};

const cardIconStyle = {
  fontSize: "28px",
  marginBottom: "12px",
  color: "#A26964",
  transition: "all 0.3s ease"
};

const cardTitleStyle = {
  margin: "0 0 8px 0",
  color: "#111827",
  fontSize: "16px",
  fontWeight: "600"
};

const cardTextStyle = {
  margin: "0",
  color: " #6B7280",
  fontSize: "13px",
  lineHeight: "1.2",
  marginTop: "8px",
  paddingBottom: "0"
};

const cardHoverEffect = {
  position: "absolute",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, rgba(162, 105, 100, 0.1) 0%, rgba(194, 210, 199, 0.1) 100%)",
  transition: "opacity 0.3s ease"
};

const imageContainerStyle = {
  flex: "1",
  position: "relative",
  minHeight: "400px",
  display: "flex"
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