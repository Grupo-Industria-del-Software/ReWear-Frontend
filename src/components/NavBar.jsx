import { motion } from "framer-motion";
import { FiShoppingBag, FiUser } from "react-icons/fi";

const NavBar = ( {isLoggedIn} ) => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.innerContainer}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>
          <FiShoppingBag size={32} color="#E1DAD3" />
        </div>
        <span style={styles.logoText}>ReWear</span>
      </div>
      <div style={styles.navLinks}>
        <motion.a 
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={styles.navLink}
          whileHover={{ 
            scale: 1.05,
            color: '#C2D2C7'
          }}
        >
          Inicio
        </motion.a>
        <motion.a 
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={styles.navLink}
          whileHover={{ 
            scale: 1.05,
            color: '#C2D2C7'
          }}
        >
          Contacto
        </motion.a>
        {isLoggedIn ? (
            <motion.a
              href="/profile"
              style={styles.navButton}
              whileHover={{ scale: 1.05, backgroundColor: "#C2D2C7" }}
            >
              <FiUser size={20} />
            </motion.a>
          ) : (
            <motion.a
              href="/login"
              style={styles.navButton}
              whileHover={{ scale: 1.05, backgroundColor: "#C2D2C7" }}
            >
              Comenzar
            </motion.a>
          )}
      </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(162, 105, 100, 0.9)',
    position: 'fixed',
    width: '100%',
    zIndex: 1000,
    borderRadius: '0 0 20px 20px',
    overflow: 'hidden',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  innerContainer: {
    maxWidth: "1400px",
    margin: "0 auto",       
    padding: "1rem 2rem",       
    width: "100%",
    display: "flex",
    justifyContent: 'space-between',  
    alignItems: "center",
    boxSizing: "border-box",  
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flex: 1
  },
  logoIcon: {
    backgroundColor: '#A2B0CA',
    padding: '10px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center'
  },
  logoText: {
    fontSize: '1.8rem',
    fontWeight: 700,
    color: '#E1DAD3',
    fontFamily: "'Playfair Display', serif",
    letterSpacing: '1px'
  },
  navLinks: {
    display: 'flex',
    gap: '2.5rem',
    alignItems: 'center'
  },
  navLink: {
    color: '#E1DAD3',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    '&:hover': {
      color: '#C2D2C7'
    }
  },
  navButton: {
    backgroundColor: '#A2B0CA',
    color: '#E1DAD3',
    padding: '1rem 2rem',
    borderRadius: '15px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: 600,
    transition: 'all 0.3s ease',
    textDecoration: 'none'
  }
};

export default NavBar;