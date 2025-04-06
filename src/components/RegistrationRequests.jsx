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
            <span style={iconStyle} className="hover-icon">📋</span>
          </div>
          <h2 style={placeholderTitleStyle}>Módulo en Desarrollo</h2>
          <p style={placeholderTextStyle}>Pronto podrás:</p>
          <ul style={featureListStyle}>
            <li style={featureItemStyle}>Aprobar/rechazar solicitudes</li>
            <li style={featureItemStyle}>Filtrar por fecha y tipo de usuario</li>
            <li style={featureItemStyle}>Enviar notificaciones automáticas</li>
          </ul>

          <div style={statsContainerStyle}>
            {['Pendientes', 'Aprobadas', 'Rechazadas'].map((label, i) => (
              <div style={statCardStyle} className="stat-card" key={i}>
                <span style={statNumberStyle}>0</span>
                <span style={statLabelStyle}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        <style>
          {`
            .stat-card {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              cursor: pointer;
            }

            .stat-card:hover {
              transform: translateY(-6px) scale(1.05);
              box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
              background-color: #d9e6db;
            }

            .hover-icon {
              display: inline-block;
              transition: transform 0.3s ease;
            }

            .hover-icon:hover {
              transform: rotate(8deg) scale(1.2);
              filter: drop-shadow(0 0 6px rgba(162, 176, 202, 0.5));
            }
          `}
        </style>
      </div>
    </div>
  );
};

const wrapperStyle = {
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#E1DAD3',
  overflow: 'hidden',
  padding: '1rem',
  boxSizing: 'border-box',
  fontFamily: "'Poppins', 'Playfair Display', sans-serif",
};

const containerStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  padding: '3rem',
  maxWidth: '900px',
  width: '100%',
  boxSizing: 'border-box',
};

const headerStyle = {
  marginBottom: '2rem',
  textAlign: 'center',
};

const titleStyle = {
  fontSize: '2.5rem',
  fontWeight: '700',
  color: '#A26964',
  margin: '0',
  fontFamily: "'Playfair Display', serif",
};

const subtitleStyle = {
  fontSize: '1.1rem',
  color: '#926b60',
  marginTop: '0.5rem',
};

const contentStyle = {
  textAlign: 'center',
};

const iconContainerStyle = {
  marginBottom: '1.5rem',
};

const iconStyle = {
  fontSize: '5rem',
  color: '#A2B0CA',
  opacity: '0.9',
};

const placeholderTitleStyle = {
  fontSize: '1.8rem',
  fontWeight: '600',
  color: '#A26964',
  marginBottom: '1rem',
};

const placeholderTextStyle = {
  fontSize: '1.1rem',
  color: '#926b60',
  marginBottom: '1.5rem',
};

const featureListStyle = {
  listStyle: 'none',
  padding: '0',
  margin: '0 auto 2rem auto',
  maxWidth: '400px',
  textAlign: 'left',
  color: '#5a5a5a',
  fontSize: '1rem',
};

const featureItemStyle = {
  padding: '0.5rem 0',
  paddingLeft: '1.2rem',
  position: 'relative',
};

const statsContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '2rem',
  marginTop: '2rem',
  flexWrap: 'wrap',
};

const statCardStyle = {
  backgroundColor: '#C2D2C7',
  borderRadius: '8px',
  padding: '1rem 2rem',
  textAlign: 'center',
  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)',
  minWidth: '120px',
};

const statNumberStyle = {
  display: 'block',
  fontSize: '2rem',
  fontWeight: '700',
  color: '#2D2D2D',
};

const statLabelStyle = {
  display: 'block',
  fontSize: '0.95rem',
  color: '#5a5a5a',
  marginTop: '0.3rem',
};

export default RegistrationRequests;