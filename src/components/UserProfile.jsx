import { useState } from 'react';
import AuthNavBar from './AuthNavBar';
import Footer from './Footer';
import ProfileEditor from './ProfileEditor';
import OrderHistory from './OrderHistory';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div style={styles.pageContainer}>
      <AuthNavBar />
      
      <div style={styles.mainContent}>
        <div style={styles.backgroundDesign}>
          <div style={styles.circleTop}></div>
          <div style={styles.circleBottom}></div>
        </div>

        <div style={styles.profileCard}>
          <div style={styles.tabButtons}>
            <button
              style={activeTab === 'profile' ? {...styles.tabButton, ...styles.activeTab} : styles.tabButton}
              onClick={() => setActiveTab('profile')}
            >
              Perfil
            </button>
            <button
              style={activeTab === 'orders' ? {...styles.tabButton, ...styles.activeTab} : styles.tabButton}
              onClick={() => setActiveTab('orders')}
            >
              Ordenes
            </button>
          </div>

          <div style={styles.tabContent}>
            {activeTab === 'profile' ? <ProfileEditor /> : <OrderHistory />}
          </div>
        </div>
      </div>

      <Footer />
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
    gap: '1rem',
    marginBottom: '2rem',
    overflowX: 'auto'
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
    fontWeight: 600,
    whiteSpace: 'nowrap'
  },
  activeTab: {
    color: '#A26964',
    backgroundColor: '#F8F5F2',
    boxShadow: '0 5px 15px rgba(162, 105, 100, 0.1)'
  },
  tabContent: {
    minHeight: '400px'
  }
};

export default UserProfile;