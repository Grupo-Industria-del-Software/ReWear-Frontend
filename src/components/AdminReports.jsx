import React, { useState } from "react";

const AdminReports = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Reportes Analíticos</h1>
          <p style={subtitleStyle}>Visualización de datos y métricas clave</p>
        </div>

        <div style={contentStyle}>
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Reportes en construcción</h2>
            <div style={metricsGridStyle}>
              {[
                {
                  icon: "🛒",
                  title: "Ventas",
                  description: "Reportes de transacciones y conversiones",
                  color: "#A26964"
                },
                {
                  icon: "👥",
                  title: "Usuarios",
                  description: "Crecimiento y comportamiento de usuarios",
                  color: "#A2B0CA"
                },
                {
                  icon: "🔄",
                  title: "Suscripciones",
                  description: "Renovaciones y retención",
                  color: "#C2D2C7"
                },
                {
                  icon: "📦",
                  title: "Inventario",
                  description: "Movimiento y rotación de productos",
                  color: "#E4C9B6"
                }
              ].map((metric, index) => (
                <div 
                  key={index}
                  style={{
                    ...metricCardStyle,
                    backgroundColor: hoveredCard === index ? "#E4C9B6" : "#E1DAD3",
                    transform: hoveredCard === index ? "translateY(-5px)" : "none",
                    boxShadow: hoveredCard === index ? "0 10px 20px rgba(0,0,0,0.1)" : "none"
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div style={metricHeaderStyle}>
                    <span style={{...metricIconStyle, color: metric.color}}>
                      {metric.icon}
                    </span>
                    <h3 style={metricTitleStyle}>{metric.title}</h3>
                  </div>
                  <p style={metricDescriptionStyle}>{metric.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Próximamente:</h2>
            <div style={featuresGridStyle}>
              {[
                { icon: "📤", text: "Exportación a Excel/PDF" },
                { icon: "🔍", text: "Filtros personalizados" },
                { icon: "📊", text: "Dashboards interactivos" },
                { icon: "🔔", text: "Alertas automáticas" }
              ].map((feature, index) => (
                <div 
                  key={index}
                  style={{
                    ...featureItemStyle,
                    backgroundColor: hoveredCard === index + 4 ? "#C2D2C7" : "#f1f3f5",
                    color: hoveredCard === index + 4 ? "white" : "#495057",
                    transform: hoveredCard === index + 4 ? "scale(1.05)" : "none"
                  }}
                  onMouseEnter={() => handleMouseEnter(index + 4)}
                  onMouseLeave={handleMouseLeave}
                >
                  <span style={featureIconStyle}>{feature.icon}</span> {feature.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const wrapperStyle = {
  height: 'calc(100vh - 64px)',
  width: '100%',
  backgroundColor: '#f8f9fa',
  display: 'flex',
  justifyContent: 'center',
  overflow: 'hidden',
  fontFamily: "'Poppins', sans-serif",
};

const containerStyle = {
  width: '95%',
  maxWidth: '900px',
  padding: '1rem',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
};

const headerStyle = {
  marginBottom: '1rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid #e9ecef',
};

const titleStyle = {
  fontSize: '1.6rem',
  fontWeight: '700',
  color: '#A26964',
  margin: '0',
  fontFamily: "'Playfair Display', serif",
};

const subtitleStyle = {
  fontSize: '0.9rem',
  color: '#6c757d',
  margin: '0.25rem 0 0 0',
};

const contentStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  overflow: 'hidden',
};

const sectionStyle = {
  backgroundColor: 'white',
  borderRadius: '10px',
  padding: '1.25rem',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
};

const sectionTitleStyle = {
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '#212529',
  margin: '0 0 1rem 0',
  fontFamily: "'Playfair Display', serif",
};

const metricsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem',
};

const metricCardStyle = {
  borderRadius: '8px',
  padding: '1rem',
  borderLeft: '4px solid #A26964',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
};

const metricHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
};

const metricIconStyle = {
  fontSize: '1.4rem',
  marginRight: '0.75rem',
  transition: 'all 0.3s ease',
};

const metricTitleStyle = {
  fontSize: '1.05rem',
  fontWeight: '600',
  color: '#212529',
  margin: '0',
};

const metricDescriptionStyle = {
  fontSize: '0.85rem',
  color: '#6c757d',
  margin: '0',
  lineHeight: '1.4',
};

const featuresGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
  gap: '1rem',
};

const featureItemStyle = {
  fontSize: '0.9rem',
  padding: '0.75rem',
  borderRadius: '6px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',
};

const featureIconStyle = {
  marginRight: '0.5rem',
  fontSize: '1.1rem',
  transition: 'all 0.3s ease',
};

export default AdminReports;