import React from "react";

const AdminReports = () => {
  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>Reportes Analíticos</h1>
          <p style={subtitleStyle}>Visualización de datos y métricas clave</p>
        </div>

        <div style={dashboardStyle}>
          <div style={placeholderCardStyle}>
            <div style={chartPlaceholderStyle}>
              <div style={chartIconStyle}>📈</div>
              <h3 style={chartTitleStyle}>Reportes en construcción</h3>
            </div>
          </div>

          <div style={metricsGridStyle}>
            <div style={metricCardStyle}>
              <div style={metricHeaderStyle}>
                <span style={metricIconStyle}>🛒</span>
                <h3 style={metricTitleStyle}>Ventas</h3>
              </div>
              <p style={metricDescriptionStyle}>
                Reportes de transacciones y conversiones
              </p>
            </div>

            <div style={metricCardStyle}>
              <div style={metricHeaderStyle}>
                <span style={metricIconStyle}>👥</span>
                <h3 style={metricTitleStyle}>Usuarios</h3>
              </div>
              <p style={metricDescriptionStyle}>
                Crecimiento y comportamiento de usuarios
              </p>
            </div>

            <div style={metricCardStyle}>
              <div style={metricHeaderStyle}>
                <span style={metricIconStyle}>🔄</span>
                <h3 style={metricTitleStyle}>Suscripciones</h3>
              </div>
              <p style={metricDescriptionStyle}>Renovaciones y retención</p>
            </div>

            <div style={metricCardStyle}>
              <div style={metricHeaderStyle}>
                <span style={metricIconStyle}>📦</span>
                <h3 style={metricTitleStyle}>Inventario</h3>
              </div>
              <p style={metricDescriptionStyle}>
                Movimiento y rotación de productos
              </p>
            </div>
          </div>

          <div style={upcomingFeaturesStyle}>
            <h3 style={upcomingTitleStyle}>Próximamente:</h3>
            <ul style={featuresListStyle}>
              <li style={featureItemStyle}>Exportación a Excel/PDF</li>
              <li style={featureItemStyle}>Filtros personalizados</li>
              <li style={featureItemStyle}>Dashboards interactivos</li>
              <li style={featureItemStyle}>Alertas automáticas</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos
const wrapperStyle = {
  minHeight: '100vh',
  width: '100%',
  backgroundColor: '#f8f9fa',
  display: 'flex',
  justifyContent: 'center',
  overflowY: 'auto',
};

const containerStyle = {
  width: '100%',
  maxWidth: '1200px',
  padding: '2rem',
  fontFamily: "'Poppins', sans-serif",
  boxSizing: 'border-box',
};

const headerStyle = {
  marginBottom: '2rem',
  paddingBottom: '1rem',
  borderBottom: '2px solid #e9ecef',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  color: '#343a40',
  margin: '0',
};

const subtitleStyle = {
  fontSize: '1rem',
  color: '#6c757d',
  margin: '0.5rem 0 0 0',
};

const dashboardStyle = {
  backgroundColor: 'white',
  borderRadius: '12px',
  padding: '2rem',
  boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.05)',
  boxSizing: 'border-box',
};

const placeholderCardStyle = {
  backgroundColor: '#f1f3f5',
  borderRadius: '10px',
  padding: '3rem 2rem',
  marginBottom: '2rem',
  textAlign: 'center',
};

const chartPlaceholderStyle = {
  maxWidth: '600px',
  margin: '0 auto',
};

const chartIconStyle = {
  fontSize: '4rem',
  marginBottom: '1rem',
  color: '#495057',
};

const chartTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#212529',
  margin: '0 0 1rem 0',
};

const metricsGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  marginBottom: '2rem',
};

const metricCardStyle = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  padding: '1.5rem',
  borderLeft: '4px solid #adb5bd',
};

const metricHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
};

const metricIconStyle = {
  fontSize: '1.5rem',
  marginRight: '0.75rem',
  color: '#495057',
};

const metricTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: '#212529',
  margin: '0',
};

const metricDescriptionStyle = {
  fontSize: '0.9rem',
  color: '#6c757d',
  margin: '0',
};

const upcomingFeaturesStyle = {
  backgroundColor: '#e9ecef',
  borderRadius: '8px',
  padding: '1.5rem',
};

const upcomingTitleStyle = {
  fontSize: '1.2rem',
  fontWeight: '600',
  color: '#212529',
  margin: '0 0 1rem 0',
};

const featuresListStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '0.75rem',
  listStyle: 'none',
  padding: '0',
  margin: '0',
};

const featureItemStyle = {
  padding: '0.5rem 0.5rem 0.5rem 1.5rem',
  position: 'relative',
  fontSize: '0.95rem',
  color: '#495057',
};

export default AdminReports;
