import { useState } from 'react';
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de recuperación
    console.log('Email de recuperación:', email);
    setIsSubmitted(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      <div style={styles.backgroundCircle3}></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={styles.forgotCard}
      >
        <div style={styles.header}>
          <div style={styles.logo}>
            <FiCheckCircle size={40} color="#A26964" />
            <div style={styles.logoHighlight}></div>
          </div>
          <h1 style={styles.title}>
            <span style={styles.titleMain}>Recuperar</span>
            <span style={styles.titleAccent}>Contraseña</span>
          </h1>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} style={styles.form}>
            <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
              <FiMail style={styles.inputIcon} />
              <input
                type="email"
                placeholder="Correo electrónico registrado"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={styles.button}
              type="submit"
            >
              Enviar enlace de recuperación
            </motion.button>
          </form>
        ) : (
          <div style={styles.successMessage}>
            <FiCheckCircle size={48} color="#A2B0C4" />
            <p style={styles.successText}>
              ¡Listo! Si el email existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
            </p>
          </div>
        )}

        <motion.div 
          style={styles.footer}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <a href="/login" style={styles.link}>
            <FiArrowLeft style={{ marginRight: '8px' }} />
            Volver al inicio de sesión
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

const styles = {
    container: {
      backgroundColor: '#E1DAD3',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: "'Poppins', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    },
    forgotCard: {
      backgroundColor: '#F8F5F2',
      padding: '2rem 2.5rem',
      borderRadius: '30px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
      maxWidth: '500px',
      width: '90%',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      textAlign: 'center',
      marginBottom: '2rem',
      position: 'relative',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-1px',
      margin: '0.5rem 0',
      display: 'flex',
      flexDirection: 'column',
    },
    titleMain: {
      color: '#A26964',
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.8rem',
    },
    titleAccent: {
      color: '#A2B0C4',
      fontFamily: "'Playfair Display', sans-serif",
      fontWeight: 600,
      fontSize: '1.9rem',
    },
    successMessage: {
      textAlign: 'center',
      padding: '2rem',
    },
    successText: {
      color: '#A26964',
      fontSize: '1rem',
      lineHeight: '1.6',
      marginTop: '1rem',
    },
    logo: {
        display: 'inline-block',
        padding: '1rem',
        borderRadius: '20px',
        backgroundColor: '#E4C9B6',
        marginBottom: '1rem',
        position: 'relative',
      },
      logoHighlight: {
        position: 'absolute',
        top: '-10px',
        right: '-10px',
        width: '25px',
        height: '25px',
        backgroundColor: '#A2B0C4',
        borderRadius: '50%',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
      },
      inputContainer: {
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '0.8rem 1rem',
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 5px 15px rgba(215, 164, 154, 0.1)',
      },
      inputIcon: {
        color: '#A26964',
        fontSize: '1.2rem',
        marginRight: '1rem',
      },
      input: {
        border: 'none',
        outline: 'none',
        fontSize: '1rem',
        flex: 1,
        backgroundColor: 'transparent',
        fontFamily: "'Poppins', sans-serif",
      },
      button: {
        backgroundColor: '#A26964',
        color: 'white',
        padding: '1rem',
        border: 'none',
        borderRadius: '15px',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
        fontFamily: "'Poppins', sans-serif",
      },
      footer: {
        marginTop: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
      },
      link: {
        color: '#A2B0C4',
        textDecoration: 'none',
        fontSize: '15px',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        ':hover': {
          color: '#C2D2C7',
        },
      },
      dot: {
        color: '#E4C9B6',
        fontSize: '1.2rem',
      },
      backgroundCircle1: {
        position: 'absolute',
        top: '-15%',
        left: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(194,210,199,0.2) 0%)',
        borderRadius: '50%',
        animation: 'float 25s infinite linear',
      },
      backgroundCircle2: {
        position: 'absolute',
        bottom: '-20%',
        right: '10%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(162,176,196,0.15) 0%)',
        borderRadius: '50%',
        animation: 'float 30s infinite linear',
        animationDelay: '5s'
      },
      backgroundCircle3: {
        position: 'absolute',
        top: '30%',
        left: '-8%',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(162,105,100,0.1) 0%)',
        borderRadius: '50%',
        animation: 'float 20s infinite linear',
        animationDelay: '10s'
      },
};

export default ForgotPassword;