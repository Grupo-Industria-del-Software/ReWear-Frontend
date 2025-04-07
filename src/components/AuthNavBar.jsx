import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag, FiHome, FiMessageCircle, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from 'react';

const AuthNavBar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/';
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav id="navbar" style={styles.navbar}>
      <div style={styles.innerContainer}>
        <div style={styles.logo} onClick={() => handleNavigation('/home')} role="button" tabIndex={0}>
          <div style={styles.logoIcon}>
            <FiShoppingBag size={28} color="#E1DAD3" />
          </div>
          <span style={styles.logoText}>ReWear</span>
        </div>

        {!isMobile ? (
          <div style={styles.desktopNavLinks}>
            <motion.button
              onClick={() => handleNavigation("/home")}
              style={styles.navLink}
              whileHover={{ scale: 1.05, color: '#C2D2C7' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiHome style={styles.linkIcon} />
              Inicio
            </motion.button>

            <motion.button
              onClick={() => handleNavigation("/chats")}
              style={styles.navLink}
              whileHover={{ scale: 1.05, color: '#C2D2C7' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiMessageCircle style={styles.linkIcon} />
              Chats
            </motion.button>

            <motion.button
              onClick={() => handleNavigation("/profile")}
              style={styles.navLink}
              whileHover={{ scale: 1.05, color: '#C2D2C7' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUser style={styles.linkIcon} />
              Mi Perfil
            </motion.button>

            <motion.button
              onClick={handleLogout}
              style={styles.navLink}
              whileHover={{ scale: 1.05, color: '#C2D2C7' }}
              whileTap={{ scale: 0.95 }}
            >
              <FiLogOut style={styles.linkIcon} />
              Salir
            </motion.button>
          </div>
        ) : (
          <div style={styles.mobileMenu}>
            <motion.button
              style={styles.menuButton}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </motion.button>

            {isMenuOpen && (
              <motion.div
                style={styles.mobileNavLinks}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >

                <motion.button
                  onClick={() => handleNavigation("/home")}
                  style={{ ...styles.navLink, ...styles.mobileNavLink }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(162, 176, 202, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiHome style={styles.linkIcon} />
                  Inicio
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation("/chats")}
                  style={{ ...styles.navLink, ...styles.mobileNavLink }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(162, 176, 202, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiMessageCircle style={styles.linkIcon} />
                  Chats
                </motion.button>

                <motion.button
                  onClick={() => handleNavigation("/profile")}
                  style={{ ...styles.navLink, ...styles.mobileNavLink }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(162, 176, 202, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiUser style={styles.linkIcon} />
                  Mi Perfil
                </motion.button>

                <motion.button
                  onClick={handleLogout}
                  style={{ ...styles.navLink, ...styles.mobileNavLink }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(162, 176, 202, 0.1)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FiLogOut style={styles.linkIcon} />
                  Salir
                </motion.button>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'rgba(162, 105, 100, 0.9)',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    borderRadius: '0 0 20px 20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    minHeight: '70px',
    padding: '0',
  },
  innerContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0.75rem 2rem",
    width: "100%",
    display: "flex",
    justifyContent: 'space-between',
    alignItems: "center",
    boxSizing: "border-box",
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  logoIcon: {
    backgroundColor: '#A2B0CA',
    padding: '8px',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: '1.6rem',
    fontWeight: 700,
    color: '#E1DAD3',
    fontFamily: "'Playfair Display', serif",
    letterSpacing: '0.5px',
  },
  desktopNavLinks: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  navLink: {
    color: '#E1DAD3',
    backgroundColor: 'transparent',
    border: 'none',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500,
    fontFamily: "'Poppins', sans-serif",
    transition: 'color 0.3s ease, transform 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '0.5rem 0.8rem',
    borderRadius: '8px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
  linkIcon: {
    fontSize: '1.2rem',
  },
  mobileMenu: {
    display: 'flex',
    alignItems: 'center',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    color: '#E1DAD3',
    padding: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1002,
  },
  mobileNavLinks: {
    position: 'absolute',
    right: '1rem',
    top: 'calc(100% + 10px)',
    backgroundColor:'rgba(248, 245, 242, 0.98)',
    borderRadius: '15px',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    minWidth: '280px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(20px)',
    zIndex: 1001,
    border: '1px solid rgba(194, 210, 199, 0.2)',
    transformOrigin: 'top right',
  },
  mobileNavLink: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    textAlign: 'left',
    padding: '0.8rem 1rem',
    color: '#A2B0CA',
    fontSize: '1.05rem',
  }
};

export default AuthNavBar;