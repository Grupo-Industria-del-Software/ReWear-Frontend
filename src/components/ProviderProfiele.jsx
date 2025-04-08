import { useState, useEffect } from 'react';
import { FiLogOut } from 'react-icons/fi';
import ProfileProvider from './ProfileProvider';
import SubscriptionInfo from './Subs';

const ProviderProfiele = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('role');
    window.location.href = '/login';
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.mainContent}>
        <div style={styles.backgroundDesign}>
          <div style={styles.circleTop}></div>
          <div style={styles.circleBottom}></div>
        </div>

        <div style={styles.profileCard}>
          <div style={styles.tabButtons}>
            <div style={styles.tabGroup}>
              <button
                style={activeTab === 'profile' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton}
                onClick={() => setActiveTab('profile')}
              >
                Perfil
              </button>
              <button
                style={activeTab === 'subs' ? { ...styles.tabButton, ...styles.activeTab } : styles.tabButton}
                onClick={() => setActiveTab('subs')}
              >
                Subscripciones
              </button>
            </div>

            {/* Botón de logout adaptado */}
            <button onClick={handleLogout} style={isMobile ? styles.logoutIcon : styles.logoutButton}>
              {isMobile ? <FiLogOut size={20} /> : <> <FiLogOut size={18} style={{ marginRight: '8px' }} /> Cerrar sesión</>}
            </button>
          </div>

          <div style={styles.tabContent}>
            {activeTab === 'profile' ? <ProfileProvider /> : <SubscriptionInfo />}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F8F5F2',
    fontFamily: "'Poppins', sans-serif"
  },
  mainContent: {
    flex: 1,
    position: 'relative',
    padding: '2rem 1rem',
    marginTop: '70px'
  },
  profileCard: {
    position: 'relative',
    zIndex: 1,
    backgroundColor: '#E1DAD3',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 15px 40px rgba(162, 105, 100, 0.1)',
    maxWidth: '800px',
    margin: '0 auto'
  },
  backgroundDesign: {
    position: 'fixed',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0
  },
  circleTop: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: '#A2B0CA',
    opacity: 0.1,
    top: '-30px',
    left: '-30px',
    filter: 'blur(20px)'
  },
  circleBottom: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    backgroundColor: '#C2D2C7',
    opacity: 0.1,
    bottom: '-30px',
    right: '-30px',
    filter: 'blur(20px)'
  },
  tabButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: '2rem'
  },
  tabGroup: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
  },
  tabButton: {
    fontFamily: "'Poppins', serif",
    fontSize: '1.1rem',
    padding: '0.6rem 1.2rem',
    border: 'none',
    background: 'none',
    color: '#A2B0CA',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    borderRadius: '8px',
    fontWeight: 600
  },
  activeTab: {
    color: '#A26964',
    backgroundColor: '#F8F5F2',
    boxShadow: '0 5px 15px rgba(162, 105, 100, 0.1)'
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#A2B0CA',
    color: '#F8F5F2',
    fontFamily: "'Poppins', sans-serif",
    border: 'none',
    borderRadius: '8px',
    padding: '0.5rem 1rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  logoutIcon: {
    background: 'none',
    border: 'none',
    color: '#A26964',
    cursor: 'pointer'
  },
  tabContent: {
    minHeight: '400px'
  }
};

export default ProviderProfiele;
