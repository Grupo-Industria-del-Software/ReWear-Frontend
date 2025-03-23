import { useState } from 'react';
import { FiLock, FiUser, FiShoppingBag, FiHeart, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de registro
    console.log('Datos de registro:', formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      <div style={styles.backgroundCircle3}></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={styles.registerCard}
      >
        <div style={styles.header}>
          <div style={styles.logo}>
            <FiShoppingBag size={48} color="#A26964" />
            <div style={styles.logoHighlight}></div>
          </div>
          <h1 style={styles.title}>
            <span style={styles.titleMain}>Re</span>
            <span style={styles.titleAccent}>Wear</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
            <FiUser style={styles.inputIcon} />
            <input
              type="text"
              placeholder="Nombre completo"
              name="name"
              onChange={handleChange}
              style={styles.input}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
            <FiMail style={styles.inputIcon} />
            <input
              type="email"
              placeholder="Correo electrónico"
              name="email"
              onChange={handleChange}
              style={styles.input}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
            <FiLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={handleChange}
              style={styles.input}
            />
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
            <FiLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              name="confirmPassword"
              onChange={handleChange}
              style={styles.input}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.button}
            type="submit"
          >
            <FiHeart style={{ marginRight: '8px' }} />
            Crear cuenta
          </motion.button>
        </form>

        <motion.div 
          style={styles.footer}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <a href="/login" style={styles.link}>¿Ya tienes una cuenta? ¡Inicia sesión!</a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export const styles = {container: {
    backgroundColor: '#E1DAD3',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',  // Añadir esto
    overflow: 'hidden',     // Añadir esto
  },
  registerCard: {
    backgroundColor: '#F8F5F2',
    padding: '3rem 4rem',
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
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    letterSpacing: '-1px',
    margin: '0.5rem 0',
  },
  titleMain: {
    color: '#A26964',
    fontFamily: "'Playfair Display', serif",
  },
  titleAccent: {
    color: '#A2B0C4',
    fontFamily: "'Playfair Display', sans-serif",
    fontWeight: 600,
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
    top: '-10%',
    left: '20%',
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(194,210,199,0.2) 0%)',
    borderRadius: '50%',
    animation: 'float 25s infinite linear',
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: '-15%',
    right: '15%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(162,176,196,0.15) 0%)',
    borderRadius: '50%',
    animation: 'float 30s infinite linear',
    animationDelay: '5s'
  },
  backgroundCircle3: {
    position: 'absolute',
    top: '30%',
    left: '-5%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(162,105,100,0.1) 0%)',
    borderRadius: '50%',
    animation: 'float 20s infinite linear',
    animationDelay: '10s'
  },
};

export default Register;