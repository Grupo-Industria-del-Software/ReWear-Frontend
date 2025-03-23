import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";

const Footer = () => {
    return(
    <footer id="contact" style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>ReWear</h3>
            <p style={styles.footerText}>Moda sostenible y accesible para todos</p>
          </div>
          
          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Contacto</h3>
            <div style={styles.contactItem}>
              <FiMapPin color="#E4C9B6" />
              <span style={styles.contactText}>Honduras</span>
            </div>
            <div style={styles.contactItem}>
              <FiMail color="#E4C9B6" />
              <span style={styles.contactText}>info@rewear.com</span>
            </div>
            <div style={styles.contactItem}>
              <FiPhone color="#E4C9B6" />
              <span style={styles.contactText}>+504 2717-2229</span>
            </div>
          </div>

          <div style={styles.footerSection}>
            <h3 style={styles.footerTitle}>Síguenos</h3>
            <div style={styles.socialIcons}>
              <motion.a whileHover={{ scale: 1.1 }}><FiInstagram color="#E4C9B6" size={24} /></motion.a>
              <motion.a whileHover={{ scale: 1.1 }}><FiFacebook color="#E4C9B6" size={24} /></motion.a>
              <motion.a whileHover={{ scale: 1.1 }}><FiTwitter color="#E4C9B6" size={24} /></motion.a>
            </div>
          </div>
        </div>
        
        <div style={styles.footerBottom}>
          <p style={styles.footerCopy}>© 2025 ReWear. Todos los derechos reservados</p>
        </div>
    </footer>
    )
};

const styles = {
    footer: {
        backgroundColor: '#A26964',
        padding: '4rem 8% 2rem',
        color: '#E1DAD3',
        position: 'relative',
        scrollMarginTop: '100px'
      },
      footerContent: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '3rem',
        maxWidth: '1200px',
        margin: '0 auto',
        '@media (max-width: 768px)': {
          gridTemplateColumns: '1fr',
          textAlign: 'center'
        }
      },
      footerSection: {
        marginBottom: '2rem',
        ':nth-child(1)': { 
            textAlign: 'left',
            '@media (max-width: 768px)': {
                textAlign: 'center'
            }
        },
        ':nth-child(2)': { 
            textAlign: 'center'
        },
        ':nth-child(3)': { 
            textAlign: 'right',
            display: 'flex',
            flexDirection: 'flex-end',
            alignItems: 'flex-end', 
            '@media (max-width: 768px)': {
                textAlign: 'center',
                alignItems: 'center'
            }
        }
    },
    footerTitle: {
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.8rem',
        marginBottom: '1.5rem',
        color: '#E4C9B6',
        textAlign: 'center',
        '@media (max-width: 768px)': {
            textAlign: 'center'
        }
    },
      footerText: {
        lineHeight: 1.6,
        fontSize: '1.1rem'
      },
      contactItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        margin: '1rem 0',
        justifyContent: 'center'
      },
      contactText: {
        fontSize: '1rem'
      },
      socialIcons: {
        display: 'flex',
        gap: '1.5rem',
        marginTop: '1rem',
        justifyContent: 'flex-end', 
        width: '100%', 
        '@media (max-width: 768px)': {
            justifyContent: 'center'
        }
      },
      footerBottom: {
        borderTop: '1px solid #E4C9B6',
        marginTop: '3rem',
        paddingTop: '2rem',
        textAlign: 'center'
      },
      footerCopy: {
        fontSize: '0.9rem',
        opacity: 0.8
      },  
}

export default Footer;