import React from "react";

const RegistrationRequests = () => {
  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Solicitudes de Registro</h1>
          <p style={subtitleStyle}>Administra las solicitudes de nuevos usuarios</p>
        </div>

        <div style={contentStyle}>
          <div style={iconContainerStyle}>
            <span style={iconStyle}>📋</span>
          </div>
          <h2 style={placeholderTitleStyle}>Módulo en Desarrollo</h2>
          <p style={placeholderTextStyle}>Pronto podrás:</p>
          <ul style={featureListStyle}>
            <li style={featureItemStyle}>Aprobar/rechazar solicitudes</li>
            <li style={featureItemStyle}>Filtrar por fecha y tipo de usuario</li>
            <li style={featureItemStyle}>Enviar notificaciones automáticas</li>
          </ul>

          <div style={statsContainerStyle}>
            <div style={statCardStyle}>
              <span style={statNumberStyle}>0</span>
              <span style={statLabelStyle}>Pendientes</span>
            </div>
            <div style={statCardStyle}>
              <span style={statNumberStyle}>0</span>
              <span style={statLabelStyle}>Aprobadas</span>
            </div>
            <div style={statCardStyle}>
              <span style={statNumberStyle}>0</span>
              <span style={statLabelStyle}>Rechazadas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const wrapperStyle = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f2f5',
  overflow: 'hidden',
  padding: '1rem',
  boxSizing: 'border-box'
};

const containerStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  padding: '3rem',
  maxWidth: '900px',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
};

const headerStyle = {
  marginBottom: '2rem',
  textAlign: 'center'
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#2c3e50',
  margin: '0'
};

const subtitleStyle = {
  fontSize: '1.1rem',
  color: '#7f8c8d',
  marginTop: '0.5rem'
};

const contentStyle = {
  textAlign: 'center'
};

const iconContainerStyle = {
  marginBottom: '1.5rem'
};

const iconStyle = {
  fontSize: '5rem',
  color: '#3498db',
  opacity: '0.9'
};

const placeholderTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: '600',
  color: '#34495e',
  marginBottom: '1rem'
};

const placeholderTextStyle = {
  fontSize: '1.1rem',
  color: '#7f8c8d',
  marginBottom: '1.5rem'
};

const featureListStyle = {
  listStyle: 'none',
  padding: '0',
  margin: '0 auto 2rem auto',
  maxWidth: '400px',
  textAlign: 'left',
  color: '#2c3e50',
  fontSize: '1rem'
};

const featureItemStyle = {
  padding: '0.5rem 0',
  paddingLeft: '1.2rem',
  position: 'relative'
};

const statsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  marginTop: '2rem',
  flexWrap: 'wrap'
};

const statCardStyle = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  padding: '1rem 2rem',
  textAlign: 'center',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  minWidth: '120px'
};

const statNumberStyle = {
  display: 'block',
  fontSize: '2rem',
  fontWeight: '700',
  color: '#2c3e50'
};

const statLabelStyle = {
  display: 'block',
  fontSize: '0.95rem',
  color: '#7f8c8d',
  marginTop: '0.3rem'
};

export default RegistrationRequests;