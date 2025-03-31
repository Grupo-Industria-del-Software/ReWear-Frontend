import React, { useState, useEffect } from 'react';
import { FaUserEdit, FaUserSlash, FaUserCheck, FaSearch, FaFilter } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10;
  const pageCount = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://localhost:7039/api/admin/users', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === 'all' || 
      (statusFilter === 'active' && user.isActive) || 
      (statusFilter === 'inactive' && !user.isActive);

    const matchesRole = 
      roleFilter === 'all' || 
      (roleFilter === 'admin' && user.roleId === 1) || 
      (roleFilter === 'user' && user.roleId !== 1);

    return matchesSearch && matchesStatus && matchesRole;
  });

  const paginatedUsers = filteredUsers.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

  const toggleUserStatus = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7039/api/admin/users/${userId}/toggle-active`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) throw new Error('Error al cambiar estado');

      setUsers(users.map(user => 
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      ));
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (loading) return <div style={styles.loading}>Cargando usuarios...</div>;
  if (error) return <div style={styles.error}>Error: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Gestión de Usuarios</h2>
      
      {/* Barra de búsqueda y filtros */}
      <div style={styles.filterContainer}>
        <div style={styles.searchBar}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        
        <div style={styles.filters}>
          <div style={styles.filterGroup}>
            <FaFilter style={styles.filterIcon} />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={styles.select}
            >
              <option value="all">Todos los estados</option>
              <option value="active">Activos</option>
              <option value="inactive">Inactivos</option>
            </select>
          </div>
          
          <div style={styles.filterGroup}>
            <FaFilter style={styles.filterIcon} />
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={styles.select}
            >
              <option value="all">Todos los roles</option>
              <option value="admin">Administradores</option>
              <option value="user">Usuarios</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Tabla de usuarios */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Nombre</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Teléfono</th>
              <th style={styles.th}>Rol</th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map(user => (
                <tr key={user.id} style={styles.tr}>
                  <td style={styles.td}>{user.id}</td>
                  <td style={styles.td}>{user.firstName} {user.lastName}</td>
                  <td style={styles.td}>{user.email}</td>
                  <td style={styles.td}>{user.phoneNumber || 'N/A'}</td>
                  <td style={styles.td}>{user.roleId === 1 ? 'Admin' : 'Usuario'}</td>
                  <td style={{ 
                    ...styles.td, 
                    color: user.isActive ? '#28a745' : '#dc3545',
                    fontWeight: 'bold'
                  }}>
                    {user.isActive ? 'Activo' : 'Inactivo'}
                  </td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      style={{
                        ...styles.button,
                        backgroundColor: user.isActive ? '#dc3545' : '#28a745'
                      }}
                    >
                      {user.isActive ? <FaUserSlash /> : <FaUserCheck />}
                      {user.isActive ? ' Desactivar' : ' Activar'}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                  No se encontraron usuarios
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {filteredUsers.length > usersPerPage && (
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
          style={styles.pagination}
        />
      )}
    </div>
  );
};

// Estilos 
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    margin: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  title: {
    color: '#343a40',
    fontFamily: 'Playfair Display, serif',
    marginBottom: '25px',
    fontSize: '1.8rem',
    borderBottom: '2px solid #dee2e6',
    paddingBottom: '10px'
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    flexWrap: 'wrap',
    gap: '15px'
  },
  searchBar: {
    position: 'relative',
    flex: '1',
    minWidth: '250px'
  },
  searchIcon: {
    position: 'absolute',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6c757d'
  },
  searchInput: {
    width: '100%',
    padding: '10px 10px 10px 35px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    fontSize: '1rem',
    boxSizing: 'border-box'
  },
  filters: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap'
  },
  filterGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  filterIcon: {
    color: '#6c757d'
  },
  select: {
    padding: '8px 12px',
    borderRadius: '4px',
    border: '1px solid #ced4da',
    backgroundColor: 'white',
    cursor: 'pointer'
  },
  tableContainer: {
    overflowX: 'auto',
    borderRadius: '6px',
    border: '1px solid #dee2e6',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    fontSize: '0.9rem'
  },
  th: {
    padding: '12px 15px',
    textAlign: 'left',
    backgroundColor: '#343a40',
    color: 'white',
    fontWeight: '600',
    borderBottom: '2px solid #dee2e6'
  },
  tr: {
    borderBottom: '1px solid #dee2e6',
    '&:hover': {
      backgroundColor: '#f8f9fa'
    }
  },
  td: {
    padding: '12px 15px',
    verticalAlign: 'middle'
  },
  button: {
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: 'white',
    fontSize: '0.85rem',
    transition: 'all 0.2s',
    '&:hover': {
      opacity: '0.9'
    }
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    listStyle: 'none',
    padding: '0',
    '& li': {
      margin: '0 5px',
      '& a': {
        padding: '5px 10px',
        border: '1px solid #dee2e6',
        borderRadius: '3px',
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#e9ecef'
        }
      }
    },
    '& .active a': {
      backgroundColor: '#007bff',
      color: 'white',
      borderColor: '#007bff'
    }
  },
  loading: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.2rem',
    color: '#6c757d'
  },
  error: {
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.2rem',
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    borderRadius: '4px',
    border: '1px solid #f5c6cb'
  }
};

export default AdminUsers;