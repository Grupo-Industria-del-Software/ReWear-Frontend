import React, { useEffect, useState } from 'react';
import Footer from "./Footer";
import AuthNavBar from './AuthNavBar';
import FiltersBar from './FiltersBar';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const ClientHome = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://localhost:44367/api/Product');
        if (!response.ok) throw new Error('Error al obtener productos');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.circleOne}></div>
      <div style={styles.circleTwo}></div>
      <AuthNavBar />
      <FiltersBar />
      <section style={styles.heroSection}>
        <div style={styles.heroInner}>
          <h1 style={styles.heroTitle}>Moda Circular</h1>
          <p style={styles.heroSubtitle}>Descubre prendas únicas y contribuye a la moda sostenible</p>
          <Link to="/products" style={styles.exploreButton}>
            <FiShoppingBag style={styles.exploreIcon} />
            <span>Explorar Colección</span>
          </Link>
        </div>
      </section>
      <section style={styles.featuredSection}>
        <div style={styles.featuredContainer}>
          <div style={styles.featuredHeader}>
            <h2 style={styles.featuredTitle}>Destacados</h2>
            <Link to="/products" style={styles.viewAllButton}>
              <span>Ver todos</span>
              <FiArrowRight />
            </Link>
          </div>
          {loading ? (
            <div style={styles.loading}>Cargando productos...</div>
          ) : error ? (
            <div style={styles.error}>Error: {error}</div>
          ) : (
            <div style={styles.productsRow}>
              {products.slice(0, 5).map((product) => (
                <div key={product.Id} style={styles.productWrapper}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    minHeight: "100vh",
    backgroundColor: "#F8F5F2",
    overflow: "hidden",
    fontFamily: "Poppins, sans-serif"
  },
  circleOne: {
    position: "absolute",
    width: "800px",
    height: "800px",
    top: "-240px",
    right: "-240px",
    backgroundColor: "#E4C9B6",
    opacity: 0.3,
    borderRadius: "50%"
  },
  circleTwo: {
    position: "absolute",
    width: "400px",
    height: "400px",
    top: "50%",
    left: "-96px",
    backgroundColor: "#A2B0CA",
    opacity: 0.2,
    borderRadius: "50%"
  },
  heroSection: {
    position: "relative",
    zIndex: 10,
    paddingTop: "128px",
    paddingLeft: "20px",
    paddingRight: "20px"
  },
  heroInner: {
    maxWidth: "768px",
    margin: "0 auto",
    textAlign: "center"
  },
  heroTitle: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: "bold",
    fontSize: "2.25rem",
    color: "#A26964",
    marginBottom: "1rem"
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    color: "#A2B0CA",
    marginBottom: "2rem"
  },
  exploreButton: {
    backgroundColor: "#A26964",
    color: "#F8F5F2",
    padding: "0.75rem 2rem",
    borderRadius: "9999px",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none"
  },
  exploreIcon: {
    fontSize: "1.25rem"
  },
  featuredSection: {
    paddingBottom: "64px",
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "40px"
  },
  featuredContainer: {
    maxWidth: "1280px",
    margin: "0 auto"
  },
  featuredHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px"
  },
  featuredTitle: {
    fontFamily: '"Playfair Display", serif',
    fontWeight: "bold",
    fontSize: "1.875rem",
    color: "#A26964"
  },
  viewAllButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    color: "#A26964",
    fontWeight: "bold",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 12px",
    position: "relative",
    zIndex: 20,
  },
  productsRow: {
    display: "flex",
    gap: "1.5rem",
    overflowX: "auto",
    paddingBottom: "16px"
  },
  productWrapper: {
    minWidth: "300px",
    flex: 1
  },
  loading: {
    textAlign: 'center',
    padding: '2rem',
    color: '#A26964'
  },
  error: {
    textAlign: 'center',
    padding: '2rem',
    color: '#ff0000'
  },
};
export default ClientHome;