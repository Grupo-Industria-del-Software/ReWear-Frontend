import { useState, useEffect } from 'react';
import { FiArrowRight } from "react-icons/fi";

const HeroSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width <= 768;

  return (
    <section style={{ 
      ...styles.hero,
      padding: isMobile ? '6rem 5% 4rem' : '8rem 8% 6rem',
      minHeight: isMobile ? '60vh' : '45vh'
    }}>
      <div style={styles.heroContent}>
        <div style={styles.textContainer}>
          <h1 style={{ 
            ...styles.heroTitle,
            fontSize: isMobile ? '3rem' : '5rem'
          }}>
            <span style={styles.titleMain}>Revoluciona</span>
            <span style={{ 
              ...styles.titleAccent,
              marginLeft: isMobile ? '0' : '2rem'
            }}>tu estilo</span>
          </h1>

          <p style={{ 
            ...styles.heroText,
            fontSize: isMobile ? '1.2rem' : '1.5rem',
            margin: isMobile ? '1.5rem auto' : '2rem auto'
          }}>
            Descubre prendas únicas, alquila tus looks favoritos y da nueva vida a tu armario.
          </p>
        </div>

        <div style={styles.buttonContainer}>
          <a
            href="/login"
            style={{ 
              ...styles.ctaButton,
              padding: isMobile ? '1rem 2rem' : '1.5rem 3rem',
              fontSize: isMobile ? '1rem' : '1.2rem',
              backgroundColor: isHovered ? '#E1DAD3' : '#A26964',
              color: isHovered ? '#A26964' : '#E1DAD3',
              borderColor: isHovered ? '#A26964' : '#C2D2C7',
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
    fontWeight: 900,
    lineHeight: 1,
    fontFamily: "'Playfair Display', serif",
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
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
    transition: 'margin 0.3s ease',
  },
  heroText: {
    color: '#A26964',
    maxWidth: '600px',
    lineHeight: 1.6,
    fontWeight: 500,
    fontFamily: "'Poppins', sans-serif",
  },
  ctaButton: {
    borderRadius: '50px',
    border: '2px solid',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  },
  arrowIcon: {
    marginLeft: '15px',
    transition: 'color 0.3s ease',
  },
};

export default HeroSection;