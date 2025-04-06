import { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FiltersBar = () => {
  const categories = ["Ropa", "Accesorios", "Marcas"];
  const filtersRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const updatePosition = () => {
      const navbar = document.querySelector('#navbar');
      if (navbar && filtersRef.current) {
        const navbarHeight = navbar.offsetHeight;
        filtersRef.current.style.top = `${navbarHeight}px`;
      }
    };

    const handleResize = () => {
      updatePosition();
      setIsMobile(window.innerWidth < 600);
    };

    updatePosition();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const contentStyle = {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: isMobile ? '0.5rem' : '1.5rem',
    padding: '0 1rem'
  };

  const categoryLinkStyle = {
    color: '#E1DAD3',
    fontFamily: 'Poppins',
    textDecoration: 'none',
    fontSize: isMobile ? '0.7rem' : '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    transition: 'all 0.3s ease',
    padding: isMobile ? '0.5rem 0.75rem' : '0.6rem 1rem',
    whiteSpace: 'nowrap',
    display: 'block',
    background: 'linear-gradient(to bottom, transparent 50%, rgba(162, 105, 100, 0.1) 50%)',
    backgroundSize: '100% 200%',
    borderRadius: '8px'
  };

  return (
    <nav ref={filtersRef} style={styles.container}>
      <div style={styles.invertedBorder}></div>
      <div style={contentStyle}>
        {categories.map((category) => (
          <motion.div
            key={category}
            style={styles.categoryItem}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to={`/${category.toLowerCase()}`} style={categoryLinkStyle}>
              {category}
            </Link>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

const styles = {
  container: {
    position: 'relative',
    backgroundColor: '#A2B0CA',
    padding: '0.8rem 0 0.6rem',
    zIndex: 998,
    width: '100%',
    borderRadius: '0 0 20px 20px',
    marginTop: '-20px',
    boxShadow: 'inset 0 8px 12px -6px rgba(162, 105, 100, 0.2), 0 4px 8px -2px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    height: '25px'
  },
  content: {
    maxWidth: '1400px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1.5rem',
    overflowX: 'auto',
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
    padding: '0 1rem'
  },
  categoryItem: {
    flexShrink: 0,
    position: 'relative'
  }
};

export default FiltersBar;