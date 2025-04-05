import { useState } from 'react';
import { FiLock, FiUser, FiShoppingBag, FiHeart, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Contraseña es requerida';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setErrors({});

    const requiredFields = ['email', 'password'];
    const emptyFields = requiredFields.filter(field => !formData[field].trim());
    if (emptyFields.length > 0) {
      setSubmitError('Por favor completa todos los campos');
      const newErrors = {};
      emptyFields.forEach(field => {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} es requerido`;
      });
      setErrors(newErrors);
      return;
    }

    if (validateForm()) {
      try {
        const response = await fetch('https://localhost:44367/api/Auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const errorData = await response.text();
          setSubmitError('Credenciales no válidas');
          setErrors({ email: errorData });
          return;
        }

        const data = await response.json();
        // Se espera que la respuesta incluya { accessToken: '...', refreshToken: '...' }
        const { accessToken, refreshToken } = data;
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);

        // Decodifica el token para obtener el id y el rol del usuario
        const decoded = jwtDecode(accessToken);
        const userId = decoded.sub; // 'sub' es el id del usuario
        const userRole = decoded["role"];

        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);

        // Redirige según el rol
        if (userRole === "Vendedor") {
          navigate('/seller');
        } else if (userRole === "Cliente") {
          navigate('/product');
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error("Error en la autenticación:", error);
        setSubmitError('Ocurrió un error al iniciar sesión');
      }
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  // Función para refrescar token usando fetch y sessionStorage
  const handleRefreshToken = async () => {
    try {
      const refreshToken = sessionStorage.getItem('refreshToken');
      const response = await fetch('https://localhost:44367/api/Auth/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refreshToken })
      });
      if (!response.ok) {
        throw new Error('Error al refrescar token');
      }
      const data = await response.json();
      const { accessToken, refreshToken: newRefreshToken } = data;
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', newRefreshToken);
    } catch (error) {
      console.error("Error al refrescar token:", error);
      navigate('/login');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundCircle1}></div>
      <div style={styles.backgroundCircle2}></div>
      <div style={styles.backgroundCircle3}></div>

      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={styles.loginCard}
      >
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.successMessage}
          >
            <FiCheckCircle style={styles.successIcon} />
            ¡Sesión iniciada exitosamente!
          </motion.div>
        )}

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.errorMessage}
          >
            <FiAlertCircle style={styles.errorIcon} />
            {submitError}
          </motion.div>
        )}

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
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && <span style={styles.errorText}>{errors.email}</span>}
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
            <FiLock style={styles.inputIcon} />
            <input
              type="password"
              placeholder="Contraseña"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.password && <span style={styles.errorText}>{errors.password}</span>}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={styles.button}
            type="submit"
          >
            <FiHeart style={{ marginRight: '8px' }} />
            Iniciar sesión
          </motion.button>
        </form>

        <motion.div 
          style={styles.footer}
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <a href="/forgot-password" style={styles.link}>¿Olvidaste tu contraseña?</a>
          <span style={styles.dot}>•</span>
          <a href="/register" style={styles.link}>¿No tienes una cuenta? ¡Crea una!</a>
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
  loginCard: {
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
    marginBottom: '2.5rem',
    position: 'relative',
  },
  logo: {
    display: 'inline-block',
    padding: '1.5rem',
    borderRadius: '20px',
    backgroundColor: '#E4C9B6',
    marginBottom: '1.5rem',
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
    fontSize: '2.5rem',
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
    gap: '2rem',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 5px 15px rgba(215, 164, 154, 0.1)',
    position: 'relative',
    marginBottom: '1.5rem'
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
    padding: '1.2rem',
    border: 'none',
    borderRadius: '15px',
    fontSize: '1.1rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    fontFamily: "'Poppins', sans-serif",
  },
  successMessage: {
    backgroundColor: '#C2D2C7',
    color: '#F8F5F2',
    padding: '1rem',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
    gap: '0.5rem'
  },
  successIcon: {
    fontSize: '1.2rem'
  },
  errorMessage: {
    backgroundColor: '#A26964',
    color: '#F8F5F2',
    padding: '1rem',
    borderRadius: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '2rem',
    gap: '0.5rem'
  },
  errorIcon: {
    fontSize: '1.2rem'
  },
  errorText: {
    color: '#A26964',
    fontSize: '0.8rem',
    position: 'absolute',
    bottom: '-1.5rem',
    left: '0',
    whiteSpace: 'nowrap'
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
    background: 'radial-gradient(circle, rgba(162,176,196,0.15) 0%)',
    borderRadius: '50%',
    animation: 'float 25s infinite linear',
  },
  backgroundCircle2: {
    position: 'absolute',
    bottom: '-15%',
    right: '15%',
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(162,105,100,0.1) 0%)',
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
    background: 'radial-gradient(circle, rgba(194,210,199,0.2) 0%)',
    borderRadius: '50%',
    animation: 'float 20s infinite linear',
    animationDelay: '10s'
  },
};

export default Login;
