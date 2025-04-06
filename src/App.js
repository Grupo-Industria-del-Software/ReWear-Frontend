import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import LandingPage from "./components/LandingPage";

import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import AdminUsers from "./components/AdminUsers";
import RegistrationRequests from "./components/RegistrationRequests";
import RoleManagement from "./components/RoleManagement";
import AdminSubscriptions from "./components/AdminSubscriptions";
import AdminReports from "./components/AdminReports";
import CatalogManager from "./components/CatalogManager";

import Departments from "./components/Departments";
import Municipalities from "./components/Municipalities";
import UserRoles from "./components/UserRoles";
import Category from "./components/Category"; 
import Conditions from "./components/Conditions"; 
import ProductStatus from "./components/ProductStatus"; 
import OrderStatus from "./components/OrderStatus"; 
import ProductForm from "./components/ProductFrom";
import ProviderPage from "./components/ProviderPage";


function App() {
  console.log("App se está renderizando");
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/product" element={<ProductForm/>}/> 
        <Route path="/provider" element={<ProviderPage/>}/> 



        {/* Rutas de administración */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/departments" element={<Departments />} /> 
          <Route path="/admin/municipalities" element={<Municipalities />} />
          <Route path="/admin/roles" element={<UserRoles />} />
          <Route path="/admin/category" element={<Category />} /> 
          <Route path="/admin/conditions" element={<Conditions />} />
          <Route path="/admin/productstatus" element={<ProductStatus />}/>
          <Route path="/admin/orderstatus" element={<OrderStatus />} /> 
          

          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="registration-requests" element={<RegistrationRequests />} />
          <Route path="role-management" element={<RoleManagement />} />          
          <Route path="subscriptions" element={<AdminSubscriptions />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="catalogs" element={<CatalogManager />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;