import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { FiLock, FiUser, FiShoppingBag, FiHeart, FiCheckCircle, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

const API_BASE = 'https://localhost:44367/api/Auth';

async function refreshAccessToken() {
  const refreshToken = sessionStorage.getItem('refreshToken');
  if (!refreshToken) throw new Error('No hay refresh token disponible');
  const res = await fetch(`${API_BASE}/refresh-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  if (!res.ok || !data.accessToken) {
    sessionStorage.clear();
    throw new Error(data.message || 'No se pudo refrescar el token');
  }
  const { sub: userId } = jwtDecode(data.accessToken);
  sessionStorage.setItem('accessToken', data.accessToken);
  sessionStorage.setItem('refreshToken', data.refreshToken);
  sessionStorage.setItem('userId', userId);
  return data.accessToken;
}

async function authFetch(url, options = {}) {
  let token = sessionStorage.getItem('accessToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  let res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      const retryHeaders = { ...headers, Authorization: `Bearer ${newToken}` };
      res = await fetch(url, { ...options, headers: retryHeaders });
    } catch (err) {
      window.location.href = '/login';
      throw err;
    }
  }
  return res;
}

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email es requerido';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Email inválido';
    if (!formData.password.trim()) newErrors.password = 'Contraseña es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setErrors({});
    if (!validateForm()) return;
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};
      if (!res.ok || !data.accessToken) {
        throw new Error(data.message || 'Credenciales inválidas');
      }
      const { sub: userId, role } = jwtDecode(data.accessToken);
      sessionStorage.setItem('accessToken', data.accessToken);
      sessionStorage.setItem('refreshToken', data.refreshToken);
      sessionStorage.setItem('userId', userId);
      setIsSuccess(true);
      setTimeout(() => {
        switch (role) {
          case 'Customer':
            window.location.href = '/home';
            break;
          case 'Seller':
            window.location.href = '/provider';
            break;
          case 'Admin':
            window.location.href = '/admin';
            break;
          default:
            window.location.href = '/home';
        }
      }, 1500);
    } catch (error) {
      setIsSuccess(false);
      setSubmitError(error.message || 'Error de conexión');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  return (
    <div className="container">
      <div className="backgroundCircle1"></div>
      <div className="backgroundCircle2"></div>
      <div className="backgroundCircle3"></div>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="loginCard">
        {isSuccess && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="successMessage">
            <FiCheckCircle className="successIcon" />
            ¡Sesión iniciada exitosamente!
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
          <motion.div whileHover={{ scale: 1.02 }} className="inputContainer">
            <FiUser className="inputIcon" />
            <input type="email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} className="input" />
            {errors.email && <span className="errorText">{errors.email}</span>}
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="inputContainer">
            <FiLock className="inputIcon" />
            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" name="password" value={formData.password} onChange={handleChange} className="input" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="togglePasswordButton" aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}>
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
            {errors.password && <span className="errorText">{errors.password}</span>}
          </motion.div>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="button" type="submit">
            <FiHeart style={{ marginRight: '8px' }} />
            Iniciar sesión
          </motion.button>
        </form>
        <motion.div className="footer" initial={{ y: 20 }} animate={{ y: 0 }}>
          <a href="/forgot-password" className="link">¿Olvidaste tu contraseña?</a>
          <span className="dot">•</span>
          <a href="/register" className="link">¿No tienes una cuenta? ¡Crea una!</a>
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
        .loginCard{
          background-color:#F8F5F2;
          padding:3rem 4rem;
          border-radius:30px;
          box-shadow:0 25px 50px -12px rgba(0,0,0,0.1);
          max-width:500px;
          width:90%;
          position:relative;
          overflow:hidden;
        }
        .header{
          text-align:center;
          margin-bottom:2.5rem;
          position:relative;
        }
        .logo{
          display:inline-block;
          padding:1.5rem;
          border-radius:20px;
          background-color:#E4C9B6;
          margin-bottom:1.5rem;
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
          font-size:2.5rem;
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
          gap:2rem;
        }
        .inputContainer{
          background-color:#fff;
          border-radius:15px;
          padding:1rem 1.5rem;
          display:flex;
          align-items:center;
          box-shadow:0 5px 15px rgba(215,164,154,0.1);
          position:relative;
          margin-bottom:1.5rem;
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
          padding:1.2rem;
          border:none;
          border-radius:15px;
          font-size:1.1rem;
          font-weight:600;
          cursor:pointer;
          display:flex;
          align-items:center;
          justify-content:center;
          transition:all 0.3s ease;
          font-family:'Poppins',sans-serif;
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
          transition:all 0.3s ease;
          cursor:pointer;
        }
        .dot{
          color:#E4C9B6;
          font-size:1.2rem;
        }
        .backgroundCircle1{
          position:absolute;
          top:-10%;
          left:20%;
          width:400px;
          height:400px;
          background:radial-gradient(circle, rgba(162,176,196,0.15) 0%);
          border-radius:50%;
          animation:float 25s infinite linear;
        }
        .backgroundCircle2{
          position:absolute;
          bottom:-15%;
          right:15%;
          width:500px;
          height:500px;
          background:radial-gradient(circle, rgba(162,105,100,0.1) 0%);
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
          background:radial-gradient(circle, rgba(194,210,199,0.2) 0%);
          border-radius:50%;
          animation:float 20s infinite linear;
          animation-delay:10s;
        }
        @media (max-width:768px){
          .container{
            padding:15px;
          }
          .loginCard{
            padding:2rem;
          }
          .title{
            font-size:1.75rem;
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

export { authFetch };
export default Login;