import { useState } from 'react';
import { FiArrowRight } from "react-icons/fi";

const HeroSection = () => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <section style={styles.hero}>
      <div style={styles.heroOverlay}></div>
      
      <div style={styles.heroContent}>
        <div style={styles.textContainer}>
          <h1 style={styles.heroTitle}>
            <span style={styles.titleMain}>
              Revoluciona
            </span>
            <span style={styles.titleAccent}>
              tu estilo
            </span>
          </h1>

          <p style={styles.heroText}>
            Descubre prendas únicas, alquila tus looks favoritos y da nueva vida a tu armario.
          </p>
        </div>

        <div style={styles.buttonContainer}>
          <a
            href="/login"
            style={{ 
              ...styles.ctaButton,
              backgroundColor: isHovered ? '#E1DAD3' : '#A26964',
              color: isHovered ? '#A26964' : '#E1DAD3',
              borderColor: isHovered ? '#A26964' : '#C2D2C7',
              scale: 1.05
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Explora la colección
            <FiArrowRight style={{ 
              ...styles.arrowIcon,
              color: isHovered ? '#A26964' : '#E1DAD3'
            }} />
          </a>
        </div>
      </div>
    </section>  
  );
};

const styles = {
  hero: {
    padding: '8rem 8% 6rem',
    minHeight: '45vh',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `
      linear-gradient(
        135deg, 
        rgba(228, 201, 182, 0.9) 0%, 
        rgba(225, 218, 211, 0.7) 100%
      ),
      url('/heroimg.jpg')
    `,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    textAlign: 'center', 
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    maxWidth: '1200px',
    margin: '0 auto',
    width: '100%',
  },
  textContainer: {
    marginBottom: '4rem',
  },
  heroTitle: {
    fontSize: '5rem',
    fontWeight: 900,
    marginBottom: '1.5rem',
    lineHeight: 1,
    fontFamily: "'Playfair Display', serif",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
    textAlign: 'center', 
  },
  titleMain: {
    color: '#A26964',
    display: 'block',
    letterSpacing: '-2px',
  },
  titleAccent: {
    color: '#A2B0CA',
    fontStyle: 'italic',
    display: 'block',
    marginLeft: '0', 
  },
  heroText: {
    color: '#A26964',
    fontSize: '1.5rem',
    maxWidth: '600px',
    margin: '2rem auto',
    lineHeight: 1.6,
    fontWeight: 500,
    fontFamily: "'Poppins', sans-serif",
  },
  ctaButton: {
    backgroundColor: '#A26964',
    color: '#E1DAD3',
    padding: '1.5rem 3rem',
    borderRadius: '50px',
    border: '2px solid #E1DAD3',
    fontSize: '1.2rem',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    boxShadow: 'none',
  },
  arrowIcon: {
    marginLeft: '15px',
    transition: 'color 0.3s ease', 
  },
  '@media (max-width: 768px)': {
    heroTitle: {
      fontSize: '3.5rem',
    },
    heroText: {
      fontSize: '1.2rem',
      padding: '0 1rem',
    },
    ctaButton: {
      padding: '1rem 2rem',
      fontSize: '1rem',
    },
  },
};

export default HeroSection;