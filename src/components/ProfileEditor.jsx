import { useState } from 'react';

const ProfileEditor = () => {
  const [formData, setFormData] = useState({
    firstName: 'María',
    lastName: 'González',
    phone: '+569 1234 5678',
    profilePicture: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos guardados:', formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({...formData, profilePicture: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form style={styles.form} onSubmit={handleSubmit}>
      <div style={styles.avatarContainer}>
        <label style={styles.avatarLabel}>
          <input 
            type="file" 
            style={styles.fileInput} 
            onChange={handleImageUpload} 
            accept="image/*"
          />
          <div style={styles.avatarWrapper}>
            {formData.profilePicture ? (
              <img 
                src={formData.profilePicture} 
                alt="Avatar" 
                style={styles.avatarImage} 
              />
            ) : (
              <div style={styles.avatarPlaceholder}>
                <span style={styles.avatarText}>+</span>
              </div>
            )}
          </div>
        </label>
      </div>

      <div style={styles.nameContainer}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Nombre</label>
          <input
            style={styles.input}
            value={formData.firstName}
            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Apellido</label>
          <input
            style={styles.input}
            value={formData.lastName}
            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
          />
        </div>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>Teléfono</label>
        <input
          style={styles.input}
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>

      <button style={styles.saveButton} type="submit">Guardar cambios</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem'
  },
  avatarLabel: {
    cursor: 'pointer',
    position: 'relative'
  },
  fileInput: {
    display: 'none'
  },
  avatarWrapper: {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    overflow: 'hidden',
    backgroundColor: '#F8F5F2',
    border: '3px solid #A26964'
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E4C9B6'
  },
  avatarText: {
    fontSize: '2rem',
    color: '#A26964'
  },
  nameContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1.5rem'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontFamily: "'Playfair Display', serif",
    color: '#A26964',
    fontSize: '1rem',
    fontWeight: 600
  },
  input: {
    padding: '0.8rem 1.2rem',
    border: '2px solid #E4C9B6',
    borderRadius: '8px',
    backgroundColor: '#F8F5F2',
    fontFamily: "'Poppins', sans-serif",
    fontSize: '1rem'
  },
  saveButton: {
    backgroundColor: '#A26964',
    color: '#E1DAD3',
    padding: '1rem 2rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Poppins', serif",
    fontSize: '1.1rem',
    fontWeight: 600,
    width: '100%',
}
};

export default ProfileEditor;