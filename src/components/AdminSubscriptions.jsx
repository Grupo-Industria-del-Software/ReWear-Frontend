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
          {features.map((feature, index) => (
            <div key={index} style={featureCardStyle} className="feature-card">
              <div className="icon-hover" style={featureIconStyle}>{feature.icon}</div>
              <h3 style={featureTitleStyle}>{feature.title}</h3>
              <p style={featureTextStyle}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .feature-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
            cursor: pointer;
          }

          .feature-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
            background-color: #d6e5db; /* un babyGreen más clarito */
          }

          .icon-hover {
            display: inline-block;
            transition: transform 0.3s ease, filter 0.3s ease;
          }

          .feature-card:hover .icon-hover {
            transform: scale(1.2) rotate(5deg);
            filter: brightness(1.3) drop-shadow(0 0 5px rgba(255,255,255,0.6));
          }
        `}
      </style>
    </div>
  );
};

const features = [
  {
    icon: "🔄",
    title: "Renovaciones",
    description: "Gestiona las renovaciones automáticas",
  },
  {
    icon: "💰",
    title: "Pagos",
    description: "Visualiza historial de pagos",
  },
  {
    icon: "📈",
    title: "Estadísticas",
    description: "Analiza el crecimiento",
  },
];

const colors = {
  ivory: '#E1DAD3',
  nude: '#E4C9B6',
  coffee: '#A26964',
  babyBlue: '#A2B0CA',
  babyGreen: '#C2D2C7',
};

const containerStyle = {
  padding: '2rem',
  maxWidth: '1200px',
  margin: '0 auto',
  fontFamily: "'Poppins', 'Playfair Display', sans-serif",
};

const headerStyle = {
  marginBottom: '2rem',
  borderBottom: `2px solid ${colors.nude}`,
  paddingBottom: '1rem',
};

const titleStyle = {
  fontSize: '2rem',
  fontWeight: '700',
  color: colors.coffee,
  margin: '0',
  fontFamily: "'Playfair Display', serif",
};

const subtitleStyle = {
  fontSize: '1rem',
  color: colors.nude,
  margin: '0.5rem 0 0 0',
};

const placeholderStyle = {
  backgroundColor: colors.ivory,
  borderRadius: '12px',
  padding: '3rem 2rem',
  textAlign: 'center',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
};

const iconStyle = {
  fontSize: '4rem',
  marginBottom: '1rem',
  color: colors.babyBlue,
};

const placeholderTitleStyle = {
  fontSize: '1.5rem',
  fontWeight: '600',
  color: colors.coffee,
  margin: '0 0 1rem 0',
  fontFamily: "'Playfair Display', serif",
};

const featuresStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '1.5rem',
  marginTop: '2rem',
};

const featureCardStyle = {
  backgroundColor: colors.babyGreen,
  borderRadius: '8px',
  padding: '1.5rem',
};

const featureIconStyle = {
  fontSize: '2rem',
  marginBottom: '1rem',
  color: colors.coffee,
};

const featureTitleStyle = {
  fontSize: '1.1rem',
  fontWeight: '600',
  color: colors.coffee,
  margin: '0 0 0.5rem 0',
  fontFamily: "'Playfair Display', serif",
};

const featureTextStyle = {
  fontSize: '0.9rem',
  color: '#2D2D2D',
  margin: '0',
};

export default AdminSubscriptions;