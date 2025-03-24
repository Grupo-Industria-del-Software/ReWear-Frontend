import React, { useState } from "react";
import { FaUsers, FaClipboardList, FaChartLine, FaTags, FaChevronDown, FaChevronUp, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [catalogMenuOpen, setCatalogMenuOpen] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Sesión cerrada");
    navigate("/login"); 
  };

  const toggleUserMenu = () => {
    if (catalogMenuOpen) {
      setCatalogMenuOpen(false); 
    }
    setUserMenuOpen(!userMenuOpen); 
  };

  const toggleCatalogMenu = () => {
    if (userMenuOpen) {
      setUserMenuOpen(false);
    }
    setCatalogMenuOpen(!catalogMenuOpen);
  };

  return (
    <div style={sidebarStyle}>
      {/* Logo de ReWear */}
      <div style={logoStyle}>ReWear</div>

      {/* Menú principal */}
      <ul style={menuStyle}>
        {/* Gestión de usuarios y roles */}
        <li
          style={menuItemStyle}
          onClick={toggleUserMenu}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s",
              transform: userMenuOpen ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = userMenuOpen ? "scale(1.05)" : "scale(1)")}
          >
            <FaUsers style={iconStyle} /> Gestión de usuarios y roles{" "}
            {userMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {/* Submenú de usuarios y roles */}
          {userMenuOpen && (
            <ul style={subMenuStyle}>
              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/registration-requests"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/registration-requests" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Solicitudes de registro
                </Link>
              </li>
              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/role-management"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/role-management" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Asignación y gestión de roles
                </Link>
              </li>
            </ul>
          )}
        </li>

        {/* Gestión de suscripciones */}
        <li style={menuItemStyle}>
          <Link
            to="/admin/subscriptions"
            style={{
              ...linkStyle,
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s",
              transform: location.pathname === "/admin/subscriptions" ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = location.pathname === "/admin/subscriptions" ? "scale(1.05)" : "scale(1)")}
          >
            <FaClipboardList style={iconStyle} /> Gestión de suscripciones
          </Link>
        </li>

        {/* Reportes */}
        <li style={menuItemStyle}>
          <Link
            to="/admin/reports"
            style={{
              ...linkStyle,
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s",
              transform: location.pathname === "/admin/reports" ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = location.pathname === "/admin/reports" ? "scale(1.05)" : "scale(1)")}
          >
            <FaChartLine style={iconStyle} /> Reportes
          </Link>
        </li>

        {/* Gestión de catálogos */}
        <li
          style={menuItemStyle}
          onClick={toggleCatalogMenu}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              transition: "transform 0.2s",
              transform: catalogMenuOpen ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = catalogMenuOpen ? "scale(1.05)" : "scale(1)")}
          >
            <FaTags style={iconStyle} /> Gestión de catálogos{" "}
            {catalogMenuOpen ? <FaChevronUp /> : <FaChevronDown />}
          </div>
          {/* Submenú de catálogos */}
          {catalogMenuOpen && (
            <ul style={subMenuStyle}>
              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/departments"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/departments" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Departmentos
                </Link>
              </li>

              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/municipalities"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/municipalities" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Municipios
                </Link>
              </li>

              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/roles"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/roles" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Roles de Usuario
                </Link>
              </li>
              
              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/category"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/category" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Categorias
                </Link>
              </li> 

              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/conditions"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/conditions" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Condiciones
                </Link>
              </li>
                            
              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/productstatus"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/productstatus" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Estados de Producto
                </Link>
              </li>    

              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/ordertypes"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/ordertypes" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Tipos de Orden
                </Link>
              </li>
 
              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/paymentstatus"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/paymentstatus" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Estados de Pago
                </Link>
              </li>
 
              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/orderstatus"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/orderstatus" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Estados de Orden
                </Link>
              </li>
 
              <li style={subMenuItemStyle}>
                <Link
                  to="/admin/paymentmethods"
                  style={{
                    ...linkStyle,
                    fontWeight: location.pathname === "/admin/paymentmethods" ? "bold" : "normal",
                    padding: "5px", 
                    borderRadius: "4px",
                    display: "block",
                    width: "100%",
                    marginLeft: "10px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Metodos de Pago
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>

      {/* Botón de salir */}
      <div
        style={{
          fontFamily: "'Poppins', sans-serif",
          color: "#A26964", 
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          marginTop: "0px",
        }}
        onClick={handleLogout}
      >
        <FaSignOutAlt style={iconStyle} /> Salir
      </div>
    </div>
  );
};

// Estilos
const sidebarStyle = {
  width: "250px",
  backgroundColor: "#E1DAD3", 
  height: "100vh",
  padding: "20px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
};

const logoStyle = {
  fontSize: "20px",
  fontFamily: "'Playfair Display', serif",
  color: "#A26964", 
  marginBottom: "5px",
  textAlign: "center",
};

const menuStyle = {
  listStyle: "none",
  padding: "0",
  flex: 1, 
};

const menuItemStyle = {
  fontFamily: "'Poppins', sans-serif",
  color: "#A26964", 
  margin: "15px 0",
  cursor: "pointer",
};

const iconStyle = {
  marginRight: "10px",
  color: "#A26964", 
  transition: "color 0.2s",
};

const subMenuStyle = {
  listStyle: "none",
  paddingLeft: "20px",
  borderLeft: "2px solid #A26964", 
};

const subMenuItemStyle = {
  fontFamily: "'Poppins', sans-serif",
  color: "#A26964", 
  margin: "5px 0", 
  fontSize: "14px", 
  borderRadius: "4px",
  transition: "transform 0.2s, background-color 0.2s",
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
  display: "block",
  width: "100%",
};

export default Sidebar;