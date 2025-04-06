import React from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <Sidebar />
      </div>
      <div style={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  sidebar: {
    width: '250px',
    position: 'fixed',
    height: '100vh',
    overflowY: 'auto',
    zIndex: 100,
  },
  content: {
    flex: 1,
    marginLeft: '250px',
    padding: '20px',
    overflowY: 'auto',
    height: '100vh',
  },
};

export default AdminLayout;