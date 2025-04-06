import { useState, useEffect } from 'react';
import { FiLock, FiUser, FiShoppingBag, FiHeart, FiMail, FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

const Register = () => {
  const [roles, setRoles] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userRole: ''
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('https://localhost:7039/api/userroles');
        if (response.ok) {
          const data = await response.json();
          setRoles(data);
          if(data.length > 0) {
            setFormData(prev => ({ ...prev, userRole: data[0].id }));
          }
        }
      } catch (error) {
        console.error('Error al obtener roles:', error);
      }
    };
    fetchRoles();
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
    if (!formData.userRole) {
      newErrors.userRole = 'Debes seleccionar un rol';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) {
      setSubmitError('Por favor completa todos los campos correctamente');
      return;
    }
    try {
      const response = await fetch('https://localhost:7039/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          roleId: formData.userRole
        })
      });
      const contentType = response.headers.get('Content-Type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text);
      }
      if (!response.ok) {
        throw new Error(data.message || `Error ${response.status}: ${response.statusText}`);
      }
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 3000);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        userRole: roles.length > 0 ? roles[0].id : ''
      });
    } catch (error) {
      console.error('Error en registro:', error);
      setSubmitError(error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "userRole" ? Number(value) : value
    });
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="container">
      <div className="backgroundCircle1"></div>
      <div className="backgroundCircle2"></div>
      <div className="backgroundCircle3"></div>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="registerCard">
        {isSuccess && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="successMessage">
            <FiCheckCircle className="successIcon" />
            ¡Cuenta creada exitosamente!
          </motion.div>
        )}
        {submitError && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="errorMessage">
            <FiAlertCircle className="errorIcon" />
            {submitError}
          </motion.div>
        )}
        <div className="header">
          <div className="logo">
            <FiShoppingBag size={48} color="#A26964" />
            <div className="logoHighlight"></div>
          </div>
          <h1 className="title">
            <span className="titleMain">Re</span>
            <span className="titleAccent">Wear</span>
          </h1>
        </div>
        <form onSubmit={handleSubmit} className="form">
          <div className="rowContainer">
            <motion.div whileHover={{ scale: 1.02 }} className="inputContainer">
              <FiUser className="inputIcon" />
              <input type="text" placeholder="Nombre" name="firstName" onChange={handleChange} className="input" required />
              {errors.firstName && <span className="errorText">{errors.firstName}</span>}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="inputContainer">
              <FiUser className="inputIcon" />
              <input type="text" placeholder="Apellido" name="lastName" onChange={handleChange} className="input" required />
              {errors.lastName && <span className="errorText">{errors.lastName}</span>}
            </motion.div>
          </div>
          <div className="rowContainer">
            <motion.div whileHover={{ scale: 1.02 }} className="inputContainer">
              <FiMail className="inputIcon" />
              <input type="email" placeholder="Correo electrónico" name="email" onChange={handleChange} className="input" required />
              {errors.email && <span className="errorText">{errors.email}</span>}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="inputContainer">
              <select name="userRole" onChange={handleChange} className="select" value={formData.userRole}>
                {roles.map(role => <option key={role.id} value={role.id}>{role.rol}</option>)}
              </select>
              {errors.userRole && <span className="errorText">{errors.userRole}</span>}
            </motion.div>
          </div>
          <div className="rowContainer">
            <motion.div whileHover={{ scale: 1.02 }} className="inputContainer">
              <FiLock className="inputIcon" />
              <input type={showPassword ? "text" : "password"} placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} className="input" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="togglePasswordButton" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              {errors.password && <span className="errorText">{errors.password}</span>}
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} className="inputContainer">
              <FiLock className="inputIcon" />
              <input type={showConfirmPassword ? "text" : "password"} placeholder="Confirmar contraseña" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="input" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="togglePasswordButton" aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
                {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              {errors.confirmPassword && <span className="errorText">{errors.confirmPassword}</span>}
            </motion.div>
          </div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="button" type="submit">
            <FiHeart style={{ marginRight: '8px' }} />
            Crear cuenta
          </motion.button>
        </form>
        <motion.div className="footer" initial={{ y: 20 }} animate={{ y: 0 }}>
          <a href="/login" className="link">¿Ya tienes una cuenta? ¡Inicia sesión!</a>
        </motion.div>
      </motion.div>
      <style>{`
        .container{
          background-color:#E1DAD3;
          min-height:100vh;
          display:flex;
          justify-content:center;
          align-items:center;
          font-family:'Poppins',sans-serif;
          position:relative;
          overflow:hidden;
        }
        .registerCard{
          background-color:#F8F5F2;
          padding:3rem 4rem;
          border-radius:30px;
          box-shadow:0 25px 50px -12px rgba(0,0,0,0.1);
          max-width:800px;
          width:95%;
          position:relative;
          overflow:visible;
        }
        .header{
          text-align:center;
          margin-bottom:2rem;
          position:relative;
        }
        .logo{
          display:inline-block;
          padding:1rem;
          border-radius:20px;
          background-color:#E4C9B6;
          margin-bottom:1rem;
          position:relative;
        }
        .logoHighlight{
          position:absolute;
          top:-10px;
          right:-10px;
          width:25px;
          height:25px;
          background-color:#A2B0C4;
          border-radius:50%;
        }
        .title{
          font-size:2rem;
          font-weight:700;
          letter-spacing:-1px;
          margin:0.5rem 0;
        }
        .titleMain{
          color:#A26964;
          font-family:'Playfair Display',serif;
        }
        .titleAccent{
          color:#A2B0C4;
          font-family:'Playfair Display',sans-serif;
          font-weight:600;
        }
        .form{
          display:flex;
          flex-direction:column;
          gap:1.5rem;
        }
        .rowContainer{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:1.5rem;
        }
        .select{
          width:100%;
          border:none;
          outline:none;
          font-size:1rem;
          background-color:transparent;
          font-family:'Poppins',sans-serif;
          color:#A26964;
          cursor:pointer;
          padding:0.5rem 0;
        }
        .successMessage{
          background-color:#C2D2C7;
          color:#F8F5F2;
          padding:1rem;
          border-radius:15px;
          display:flex;
          align-items:center;
          justify-content:center;
          margin-bottom:2rem;
          gap:0.5rem;
        }
        .successIcon{
          font-size:1.2rem;
        }
        .errorMessage{
          background-color:#A26964;
          color:#F8F5F2;
          padding:1rem;
          border-radius:15px;
          display:flex;
          align-items:center;
          justify-content:center;
          margin-bottom:2rem;
          gap:0.5rem;
        }
        .errorIcon{
          font-size:1.2rem;
        }
        .errorText{
          color:#A26964;
          font-size:0.8rem;
          position:absolute;
          bottom:-1.5rem;
          left:0;
          white-space:nowrap;
        }
        .inputContainer{
          background-color:#fff;
          border-radius:15px;
          padding:1rem;
          display:flex;
          align-items:center;
          box-shadow:0 5px 15px rgba(215,164,154,0.1);
          position:relative;
          width:90%;
        }
        .inputIcon{
          color:#A26964;
          font-size:1.2rem;
          margin-right:1rem;
        }
        .input{
          border:none;
          outline:none;
          font-size:1rem;
          flex:1;
          background-color:transparent;
          font-family:'Poppins',sans-serif;
          min-width:120px;
        }
        .togglePasswordButton{
          background:none;
          border:none;
          cursor:pointer;
          padding:8px;
          color:#A26964;
          position:absolute;
          right:10px;
          top:50%;
          transform:translateY(-50%);
        }
        .button{
          background-color:#A26964;
          color:#fff;
          margin-top:15px;
          padding:1rem;
          border:none;
          border-radius:15px;
          font-size:1rem;
          font-weight:600;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          font-family:'Poppins',sans-serif;
        }
        .footer{
          margin-top:2rem;
          display:flex;
          justify-content:center;
          align-items:center;
          gap:1rem;
        }
        .link{
          color:#A2B0C4;
          text-decoration:none;
          font-size:15px;
          font-weight:500;
        }
        .backgroundCircle1{
          position:absolute;
          top:-10%;
          left:20%;
          width:400px;
          height:400px;
          background:radial-gradient(circle, rgba(194,210,199,0.2) 0%);
          border-radius:50%;
          animation:float 25s infinite linear;
        }
        .backgroundCircle2{
          position:absolute;
          bottom:-15%;
          right:15%;
          width:500px;
          height:500px;
          background:radial-gradient(circle, rgba(162,176,196,0.15) 0%);
          border-radius:50%;
          animation:float 30s infinite linear;
          animation-delay:5s;
        }
        .backgroundCircle3{
          position:absolute;
          top:30%;
          left:-5%;
          width:300px;
          height:300px;
          background:radial-gradient(circle, rgba(162,105,100,0.1) 0%);
          border-radius:50%;
          animation:float 20s infinite linear;
          animation-delay:10s;
        }
        @media (max-width:768px){
          .container{
            padding:15px;
          }
          .registerCard{
            padding:2rem;
          }
          .title{
            font-size:1.75rem;
          }
          .rowContainer{
            grid-template-columns:1fr;
            gap:1rem;
          }
          .input{
            font-size:0.9rem;
          }
          .errorText{
            position:static;
            margin-top:4px;
            display:block;
          }
          .link{
            font-size:0.8rem;
          }
          .backgroundCircle1{
            width:200px;
            height:200px;
            top:-5%;
            left:10%;
          }
          .backgroundCircle2{
            width:250px;
            height:250px;
            bottom:-10%;
            right:5%;
          }
          .backgroundCircle3{
            width:150px;
            height:150px;
            left:-10%;
          }
        }
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Register;

