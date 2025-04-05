import React, { useState, useEffect } from 'react';
import { FiLock, FiUser, FiShoppingBag, FiHeart, FiMail, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { motion } from "framer-motion";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    roleId: '' // Se guardará el id del rol seleccionado
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const [roles, setRoles] = useState([]); // Roles obtenidos desde el backend
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

  // Cargar roles desde el backend
  useEffect(() => {
    fetch('https://localhost:44367/api/userroles')
      .then(response => response.json())
      .then(data => setRoles(data))
      .catch(error => console.error('Error al cargar roles:', error));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/;
  
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Nombre es requerido';
    } else if (!nameRegex.test(formData.firstName)) {
      newErrors.firstName = 'El nombre no puede contener números';
    }
  
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Apellido es requerido';
    } else if (!nameRegex.test(formData.lastName)) {
      newErrors.lastName = 'El apellido no puede contener números';
    }
  
    if (!formData.email.trim()) {
      newErrors.email = 'Email es requerido';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
  
    if (!formData.password.trim()) {
      newErrors.password = 'Contraseña es requerida';
    } else if (!passwordRegex.test(formData.password)) {
      newErrors.password = 'Mínimo 8 caracteres, 1 mayúscula y 1 número';
    }
  
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirma tu contraseña';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }
    
    if (!formData.roleId) {
      newErrors.roleId = 'Seleccione un rol';
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitError('');

    if (validateForm()) {
      const form = new FormData();
      form.append('registerRequestDto.FirstName', formData.firstName);
      form.append('registerRequestDto.LastName', formData.lastName);
      form.append('registerRequestDto.Email', formData.email);
      form.append('registerRequestDto.Password', formData.password);
      form.append('registerRequestDto.RoleId', formData.roleId);

      if (profilePicture) {
        form.append('profilePicture', profilePicture);
      }

      fetch('https://localhost:44367/api/Auth/register', {
        method: 'POST',
        body: form
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en el registro');
        }
        return response.json();
      })
      .then(data => {
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 3000);
        // Aquí podrías redirigir al usuario o limpiar el formulario
      })
      .catch(error => {
        setSubmitError('Error al crear la cuenta. Intente nuevamente.');
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
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
        style={styles.registerCard}
      >
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={styles.successMessage}
          >
            <FiCheckCircle style={styles.successIcon} />
            ¡Cuenta creada exitosamente!
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
          <div style={styles.rowContainer}>
            <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
              <FiUser style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Nombre"
                name="firstName"
                onChange={handleChange}
                style={styles.input}
                required
              />
              {errors.firstName && <span style={styles.errorText}>{errors.firstName}</span>}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
              <FiUser style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Apellido"
                name="lastName"
                onChange={handleChange}
                style={styles.input}
                required
              />
              {errors.lastName && <span style={styles.errorText}>{errors.lastName}</span>}
            </motion.div>
          </div>

          <div style={styles.rowContainer}>
            <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
              <FiMail style={styles.inputIcon} />
              <input
                type="email"
                placeholder="Correo electrónico"
                name="email"
                onChange={handleChange}
                style={styles.input}
                required
              />
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
              <select 
                name="roleId"
                onChange={handleChange}
                style={styles.select}
                value={formData.roleId}
              >
                <option value="">Selecciona un rol</option>
                {roles.map(role => (
                  <option key={role.id} value={role.id}>
                    {role.rol}
                  </option>
                ))}
              </select>
              {errors.roleId && <span style={styles.errorText}>{errors.roleId}</span>}
            </motion.div>
          </div>

          <div style={styles.rowContainer}>
            <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
              <FiLock style={styles.inputIcon} />
              <input
                type="password"
                placeholder="Contraseña"
                name="password"
                onChange={handleChange}
                style={styles.input}
                required
              />
              {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} style={styles.inputContainer}>
              <FiLock style={styles.inputIcon} />
              <input
                type="password"
                placeholder="Confirmar contraseña"
                name="confirmPassword"
                onChange={handleChange}
                style={styles.input}
                required
              />
              {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
            </motion.div>
          </div>

          {/* Input para subir la imagen de perfil */}
          <div style={{ marginBottom: '1.5rem' }}>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

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

export const styles = {
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
  registerCard: {
    backgroundColor: '#F8F5F2',
    padding: '3rem 4rem',
    borderRadius: '30px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    width: '95%',
    position: 'relative',
    overflow: 'visible',
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
  rowContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    '@media (max-width: 768px)': {
      gridTemplateColumns: '1fr',
      gap: '1rem'
    }
  },
  select: {
    width: '100%',
    border: 'none',
    outline: 'none',
    fontSize: '1rem',
    backgroundColor: 'transparent',
    fontFamily: "'Poppins', sans-serif",
    color: '#A26964',
    cursor: 'pointer',
    padding: '0.5rem 0' 
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
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: '15px',
    padding: '1rem',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0 5px 15px rgba(215, 164, 154, 0.1)',
    position: 'relative',
    width: '90%'
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
    minWidth: '120px' 
  },
  button: {
    backgroundColor: '#A26964',
    color: 'white',
    marginTop: '15px',
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
