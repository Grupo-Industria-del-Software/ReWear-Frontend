import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiAlertCircle } from 'react-icons/fi';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const getMainImage = () =>
    product?.images?.[0]?.imageUrl || '/placeholder-image.jpg';

  const formatPrice = (price) =>
    price === null || price === undefined
      ? ''
      : new Intl.NumberFormat('es-HN', { style: 'currency', currency: 'HNL' }).format(price);

  if (!product || typeof product !== 'object') return null;

  const handleClick = () => {
    // Ya no usamos e.stopPropagation() aquí
    if (product.id) {
       // Mantenemos encodeURIComponent por seguridad, aunque si tus IDs son simples números/UUIDs, podrías quitarlo.
      navigate(`/product/${encodeURIComponent(product.id)}`);
    } else {
      // Considera añadir un log aquí si sigue fallando, para confirmar el ID en el momento del clic
      console.error("Intento de navegación fallido: product.id no válido en el momento del clic.", product);
    }
  };

  // Manejador específico para el corazón, para evitar la navegación
  const handleHeartClick = (e) => {
    e.stopPropagation();
    // Aquí podrías añadir la lógica para marcar/desmarcar como favorito
    console.log("Clic en corazón, navegación detenida.");
  };

  const conditionName = product?.condition?.label || product.condition || 'Condición no especificada';
  const brandName = product.brand || 'Marca no especificada';
  const sizeValue = product.size || 'Talla no especificada';

  return (
    <motion.div
      style={styles.container}
      onClick={handleClick} // El manejador principal está aquí
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div style={styles.imageContainer}>
        <img src={getMainImage()} alt={product.name || 'Producto'} style={styles.image} />
        <div style={styles.iconContainer}>
          <div style={styles.heartContainer} onClick={handleHeartClick}> {/* Asociamos el manejador del corazón */}
            <FiHeart style={styles.heartIcon} />
          </div>
          {product.productStatus !== 'Disponible' && <div style={styles.soldOutBadge}>Agotado</div>}
        </div>
      </div>
      <div style={styles.content}>
        <div style={styles.conditionContainer}>
          <span style={styles.conditionText(conditionName)}>
            {conditionName.toLowerCase().includes('nuevo') ? <FiStar style={styles.iconInline} /> : <FiAlertCircle style={styles.iconInline} />}
            {conditionName}
          </span>
          <span style={styles.sizeText}>• Talla {sizeValue}</span>
        </div>
        <h3 style={styles.productName}>{product.name || 'Nombre no disponible'}</h3>
        <p style={styles.brandText}>{brandName}</p>
        <div style={styles.badgesContainer}>
          {product.price !== null && product.price !== undefined && (
            <div style={styles.saleBadge}>
              <span style={styles.saleBadgeText}>Venta: {formatPrice(product.price)}</span>
            </div>
          )}
          {product.isForRental && product.pricePerDay !== null && product.pricePerDay !== undefined && (
            <div style={styles.rentBadge}>
              <span style={styles.rentBadgeText}>Alquiler: {formatPrice(product.pricePerDay)}/día</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const styles = {
  container: {
    backgroundColor: '#F8F5F2',
    borderRadius: '0.75rem',
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
    overflow: 'hidden',
    cursor: 'pointer',
    margin: '1rem',
    display: 'flex',
    flexDirection: 'column',
    minWidth: '200px',
    position: 'relative'
  },
  imageContainer: {
    position: 'relative',
    height: '12rem',
    backgroundColor: 'rgba(162,105,100,0.1)',
    flexShrink: 0
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    mixBlendMode: 'multiply'
  },
  iconContainer: {
    position: 'absolute',
    top: '0.5rem',
    right: '0.5rem',
    display: 'flex',
    gap: '0.5rem',
    zIndex: 1
  },
  heartContainer: {
    padding: '0.5rem',
    backgroundColor: 'rgba(248,245,242,0.9)',
    borderRadius: '50%',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // Quitamos pointerEvents: 'none' para que el onClick en este div funcione
    cursor: 'pointer' // Añadimos cursor pointer aquí también
  },
  heartIcon: {
    color: '#A26964',
    width: '1.25rem',
    height: '1.25rem'
  },
  soldOutBadge: {
    padding: '0.25rem 0.75rem',
    backgroundColor: 'rgba(162,176,202,0.9)',
    color: '#F8F5F2',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontFamily: 'Poppins, sans-serif',
    alignSelf: 'center',
    backdropFilter: 'blur(4px)'
  },
  content: {
    padding: '1rem',
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  conditionContainer: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '0.5rem'
  },
  conditionText: (condition) => ({
    fontSize: '0.875rem',
    fontFamily: 'Poppins, sans-serif',
    color: condition.toLowerCase().includes('nuevo') ? '#6A8D73' : '#A2B0CA',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center'
  }),
  iconInline: {
    verticalAlign: 'middle',
    marginRight: '0.25rem',
    flexShrink: 0
  },
  sizeText: {
    fontSize: '0.875rem',
    color: 'rgba(162,105,100,0.8)',
    fontFamily: 'Poppins, sans-serif'
  },
  productName: {
    fontFamily: '"Playfair Display", serif',
    color: '#A26964',
    fontSize: '1.25rem',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    margin: '0.25rem 0 0.5rem 0',
    lineHeight: 1.3
  },
  brandText: {
    color: '#A2B0CA',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.875rem',
    marginBottom: '0.75rem',
    flexGrow: 1
  },
  badgesContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    paddingTop: '0.5rem',
    marginTop: 'auto'
  },
  saleBadge: {
    backgroundColor: 'rgba(106, 141, 115, 0.15)',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
    display: 'inline-block'
  },
  saleBadgeText: {
    color: '#6A8D73',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500
  },
  rentBadge: {
    backgroundColor: 'rgba(162, 176, 202, 0.2)',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.375rem',
    display: 'inline-block'
  },
  rentBadgeText: {
    color: '#A2B0CA',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '0.875rem',
    fontWeight: 500
  }
};

export default ProductCard;