import { useState, useEffect } from 'react'
import { FiCheckCircle } from 'react-icons/fi'

const ProfileProvider = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    profilePicture: null, // Puede ser URL o archivo temporal
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      const token = sessionStorage.getItem("accessToken")
      if (!token) {
        console.error("Token de acceso no disponible")
        setLoading(false)
        return
      }
      try {
        const response = await fetch(`${process.env.REACT_APP_API_ENV}/api/Users/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) throw new Error("Error al obtener los datos del usuario")
        const user = await response.json()
        setFormData({
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          profilePicture: user.profilePicture, // URL
        })
        setImagePreview(user.profilePicture)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("accessToken")
    const userId = sessionStorage.getItem("userId")

    try {
      // Si se seleccionó una nueva imagen local (File), primero la subimos
      if (formData.profilePicture instanceof File) {
        const uploadData = new FormData()
        uploadData.append('profilePicture', formData.profilePicture)

        const uploadResponse = await fetch(`${process.env.REACT_APP_API_ENV}/api/Users/profile`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: uploadData,
        })

        if (!uploadResponse.ok) throw new Error("Error al subir imagen")
        console.log("Imagen de perfil subida correctamente")
      }

      // Luego actualizamos el resto del perfil
      const profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
      }

      const response = await fetch(`${process.env.REACT_APP_API_ENV}/api/Users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) throw new Error("Error al actualizar el usuario")
      console.log("Datos guardados correctamente")
      
      // Mostrar alerta de éxito
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (error) {
      console.error(error)
    }
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, profilePicture: file }))
      setImagePreview(URL.createObjectURL(file)) // Vista previa inmediata
    }
  }

  if (loading) return <div>Cargando...</div>

  return (
    <>
      {isSuccess && (
        <div style={styles.successMessage}>
          <FiCheckCircle style={styles.successIcon} />
          Datos actualizados con Exito!
        </div>
      )}
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.avatarContainer}>
          <div style={styles.avatarWrapper}>
            {imagePreview ? (
              <img src={imagePreview} alt="Avatar" style={styles.avatarImage} />
            ) : (
              <div style={styles.avatarPlaceholder}>
                <span style={styles.avatarText}>+</span>
              </div>
            )}
          </div>
        </div>

        <div style={styles.avatarContainer}>
          <label style={styles.avatarLabel}>
            <input
              type="file"
              style={styles.fileInput}
              onChange={handleImageUpload}
              accept="image/*"
            />
            <div style={styles.uploadButton}>Subir nueva imagen</div>
          </label>
        </div>

        <div style={styles.nameContainer}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Nombre</label>
            <input
              style={styles.input}
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Apellido</label>
            <input
              style={styles.input}
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Teléfono</label>
          <input
            style={styles.input}
            type="tel"
            value={formData.phoneNumber}
            onChange={(e) =>
              setFormData({ ...formData, phoneNumber: e.target.value })
            }
          />
        </div>

        <button style={styles.saveButton} type="submit">
          Aplicar cambios
        </button>
      </form>
    </>
  )
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '2rem' },
  avatarContainer: { display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' },
  avatarLabel: { cursor: 'pointer', position: 'relative' },
  fileInput: { display: 'none' },
  avatarWrapper: { width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', backgroundColor: '#F8F5F2', border: '3px solid #A26964' },
  avatarImage: { width: '100%', height: '100%', objectFit: 'cover' },
  avatarPlaceholder: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#E4C9B6' },
  avatarText: { fontSize: '2rem', color: '#A26964' },
  nameContainer: { display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
  label: { fontFamily: "'Playfair Display', serif", color: '#A26964', fontSize: '1rem', fontWeight: 600 },
  input: { padding: '0.8rem 1.2rem', border: '2px solid #E4C9B6', borderRadius: '8px', backgroundColor: '#F8F5F2', fontFamily: "'Poppins', sans-serif", fontSize: '1rem' },
  saveButton: { backgroundColor: '#A26964', color: '#E1DAD3', padding: '1rem 2rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Poppins', serif", fontSize: '1.1rem', fontWeight: 600, width: '100%' },
  uploadButton: { backgroundColor: '#A26964', color: '#E1DAD3', padding: '0.8rem 1.2rem', borderRadius: '8px', cursor: 'pointer', textAlign: 'center', fontFamily: "'Poppins', serif", fontSize: '1rem', fontWeight: 600 },
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
  successIcon: { fontSize: '1.2rem' },
}

export default ProfileProvider
