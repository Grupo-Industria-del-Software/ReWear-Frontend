import { useState } from 'react';
import { FiTag, FiWatch, FiHeart } from "react-icons/fi";

const Categories = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section style={styles.categories}>
      <div style={styles.backgroundCircles}>
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>
        <div style={styles.circle3}></div>
      </div>
      
      <h2 style={styles.sectionTitle}>
        Explora por <span style={styles.titleHighlight}>categoría</span>
      </h2>
      
      <div style={styles.categoryGrid}>
        {categories.map((category, index) => (
          <div 
            key={index} 
            style={{
              ...styles.categoryCard,
              transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
              zIndex: hoveredCard === index ? 1 : 0
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={styles.categoryIcon}>
              <category.icon size={40} color="#A26964" />
            </div>
            <h3 style={styles.categoryTitle}>{category.title}</h3>
            <p style={styles.categoryText}>{category.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const categories = [
    { icon: FiTag, title: "Ropa", text: "Descubre prendas exclusivas" },
    { icon: FiWatch, title: "Accesorios", text: "Complementos únicos" },
    { icon: FiHeart, title: "Marcas", text: "Encuentra tus marcas preferidas" },
];

const styles = {
    categories: {
        padding: '8rem 8%',
        backgroundColor: '#F8F5F2',
        position: 'relative',
        overflow: 'hidden',
    },
    backgroundCircles: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
    },
    circle1: {
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'rgba(194, 210, 199, 0.1)',
        top: '-20%',
        left: '-10%',
    },
    circle2: {
        position: 'absolute',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'rgba(162, 176, 202, 0.1)',
        bottom: '-15%',
        right: '-8%',
    },
    circle3: {
        position: 'absolute',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'rgba(228, 201, 182, 0.1)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
    },
    sectionTitle: {
        textAlign: 'center',
        fontSize: '3rem',
        marginBottom: '4rem',
        color: '#A26964',
        fontFamily: "'Playfair Display', serif",
        position: 'relative',
        zIndex: 1,
      },
      titleHighlight: {
        color: '#C2D2C7'
      },
    categoryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '3rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
    },
    categoryCard: {
        backgroundColor: '#E4C9B6',
        padding: '3rem 2rem',
        borderRadius: '30px',
        textAlign: 'center',
        transition: 'all 0.3s ease',
        boxShadow: '0 15px 40px rgba(162, 105, 100, 0.1)',
        border: '2px solid #E4C9B6',
        transformOrigin: 'center',
        cursor: 'pointer',
        position: 'relative',
      },
    categoryIcon: {
        backgroundColor: '#F8F5F2',
        width: '90px',
        height: '90px',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 2rem',
        transition: 'background-color 0.3s ease',
    },
    categoryTitle: {
        margin: '1.5rem 0',
        fontSize: '1.8rem',
        fontWeight: 600,
        fontFamily: "'Playfair Display', serif",
        color: '#A26964'
      },
    categoryText: {
        color: '#F8F5F2',
        lineHeight: 1.6,
        fontSize: '1.1rem',
        opacity: 0.9,
        maxWidth: '240px',
        margin: '0 auto',
    },
    '@media (max-width: 768px)': {
        categories: {
            padding: '6rem 5%',
        },
        sectionTitle: {
            fontSize: '2.5rem',
            marginBottom: '3rem',
        },
        categoryGrid: {
            gap: '2rem',
        },
        categoryCard: {
            padding: '2rem 1.5rem',
        },
    },
};

export default Categories;