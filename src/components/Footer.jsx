import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import { useState, useEffect } from 'react';

const Footer = () => {
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

  return(
    <footer id="contact" style={{...styles.footer, padding: isMobile ? '0.5rem 0.5% 0.5rem' : '2rem 5% 1rem'}}>
      <div style={{...styles.footerContent, gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: isMobile ? '1rem' : '3rem'}}>
        <div style={styles.footerSection}>
          <h3 style={{...styles.footerTitle, fontSize: isMobile ? '1.5rem' : '1.8rem', marginBottom: isMobile ? '0.5rem' : '1.5rem'}}>ReWear</h3>
          <p style={{...styles.footerText, fontSize: isMobile ? '0.9rem' : '1.1rem', maxWidth: isMobile ? '250px' : '300px'}}>Moda sostenible y accesible para todos</p>
        </div>
        
        <div style={styles.footerSection}>
          <h3 style={{...styles.footerTitle, fontSize: isMobile ? '1.5rem' : '1.8rem', marginBottom: isMobile ? '0.5rem' : '1.5rem'}}>Contacto</h3>
          <div style={styles.contactItem}>
            <FiMapPin color="#E4C9B6" size={isMobile ? 18 : 20}/>
            <span style={{...styles.contactText, fontSize: isMobile ? '0.8rem' : '1rem'}}>Honduras</span>
          </div>
          <div style={styles.contactItem}>
            <FiMail color="#E4C9B6" size={isMobile ? 18 : 20}/>
            <span style={{...styles.contactText, fontSize: isMobile ? '0.8rem' : '1rem'}}>info@rewear.com</span>
          </div>
          <div style={styles.contactItem}>
            <FiPhone color="#E4C9B6" size={isMobile ? 18 : 20}/>
            <span style={{...styles.contactText, fontSize: isMobile ? '0.8rem' : '1rem'}}>+504 2717-2229</span>
          </div>
        </div>

        <div style={styles.footerSection}>
          <h3 style={{...styles.footerTitle, fontSize: isMobile ? '1.5rem' : '1.8rem', marginBottom: isMobile ? '0.5rem' : '1.5rem'}}>Síguenos</h3>
          <div style={styles.socialIcons}>
            <motion.a whileHover={{ scale: 1.1 }}><FiInstagram color="#E4C9B6" size={isMobile ? 20 : 24}/></motion.a>
            <motion.a whileHover={{ scale: 1.1 }}><FiFacebook color="#E4C9B6" size={isMobile ? 20 : 24}/></motion.a>
            <motion.a whileHover={{ scale: 1.1 }}><FiTwitter color="#E4C9B6" size={isMobile ? 20 : 24}/></motion.a>
          </div>
        </div>
      </div>
      
      <div style={styles.footerBottom}>
        <p style={{...styles.footerCopy, fontSize: isMobile ? '0.8rem' : '0.9rem'}}>© 2025 ReWear. Todos los derechos reservados</p>
      </div>
    </footer>
  )
};

const styles = {
  footer: {
    backgroundColor: '#A26964',
    color: '#E1DAD3',
    position: 'relative',
    scrollMarginTop: '100px'
  },
  footerContent: {
    display: 'grid',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  footerSection: {
    marginBottom: '2rem',
    textAlign: 'center'
  },
  footerTitle: {
    fontFamily: "'Playfair Display', serif",
    color: '#E4C9B6'
  },
  footerText: {
    lineHeight: 1.6,
    margin: '0 auto'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    margin: '1rem 0',
    justifyContent: 'center'
  },
  contactText: {},
  socialIcons: {
    display: 'flex',
    gap: '1.5rem',
    marginTop: '1rem',
    justifyContent: 'center'
  },
  footerBottom: {
    borderTop: '1px solid rgba(228, 201, 182, 0.3)',
    marginTop: '3rem',
    paddingTop: '2rem',
    textAlign: 'center'
  },
  footerCopy: {
    opacity: 0.8
  },  
}

export default Footer;