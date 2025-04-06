import React from "react";

const AdminSubscriptions = () => {
  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>Gestión de Suscripciones</h1>
        <p style={subtitleStyle}>Administra las membresías y suscripciones de los usuarios</p>
      </div>
      
      <div style={placeholderStyle}>
        <div style={iconStyle}>📊</div>
        <h2 style={placeholderTitleStyle}>Sección en desarrollo</h2>
        <div style={featuresStyle}>
          <div style={featureCardStyle}>
            <div style={featureIconStyle}>🔄</div>
            <h3 style={featureTitleStyle}>Renovaciones</h3>
            <p style={featureTextStyle}>Gestiona las renovaciones automáticas</p>
          </div>
          <div style={featureCardStyle}>
            <div style={featureIconStyle}>💰</div>
            <h3 style={featureTitleStyle}>Pagos</h3>
            <p style={featureTextStyle}>Visualiza historial de pagos</p>
          </div>
          <div style={featureCardStyle}>
            <div style={featureIconStyle}>📈</div>
            <h3 style={featureTitleStyle}>Estadísticas</h3>
            <p style={featureTextStyle}>Analiza el crecimiento</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const containerStyle = {
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
  fontFamily: "'Poppins', sans-serif",
};

const headerStyle = {
  marginBottom: '2rem',
  borderBottom: '2px solid #e2e8f0',
  paddingBottom: '1rem',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  color: '#2d3748',
  margin: '0',
};

const subtitleStyle = {
  fontSize: '1rem',
  color: '#718096',
  margin: '0.5rem 0 0 0',
};

const placeholderStyle = {
  backgroundColor: '#f7fafc',
  borderRadius: '12px',
  padding: '3rem 2rem',
  textAlign: 'center',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const iconStyle = {
  fontSize: '4rem',
  marginBottom: '1rem',
};

const placeholderTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#2d3748',
  margin: '0 0 1rem 0',
};

const placeholderTextStyle = {
  fontSize: '1rem',
  color: '#4a5568',
  maxWidth: '600px',
  margin: '0 auto 2rem auto',
  lineHeight: '1.6',
};

const featuresStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  marginTop: '2rem',
};

const featureCardStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  padding: '1.5rem',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  ':hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  },
};

const featureIconStyle = {
  fontSize: '2rem',
  marginBottom: '1rem',
};

const featureTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#2d3748',
  margin: '0 0 0.5rem 0',
};

const featureTextStyle = {
  fontSize: '0.9rem',
  color: '#718096',
  margin: '0',
};

export default AdminSubscriptions;