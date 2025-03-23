import { motion } from "framer-motion";
import { useState } from "react";

const HowItWorks = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const steps = [
    { title: "Explora", text: "Encuentra piezas que ames" },
    { title: "Selecciona", text: "Elige tu período de alquiler" },
    { title: "Disfruta", text: "Recibe y luce tu estilo" },
    { title: "Devuelve", text: "O compra si no quieres separarte" },
  ];

  return (
    <section style={styles.howItWorks}>
      <div style={styles.backgroundCircles}>
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>
        <div style={styles.circle3}></div>
      </div>
      
      <motion.h2 
        style={styles.sectionTitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        ¿Cómo <span style={styles.titleHighlight}>funciona</span>?
      </motion.h2>
      
      <div style={styles.stepsContainer}>
        {steps.map((step, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              ...styles.stepCard,
              backgroundColor: hoveredCard === index ? '#C2D2C7' : '#F8F5F2',
            }}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{
              ...styles.stepNumber,
              backgroundColor: hoveredCard === index ? '#E1DAD3' : '#A26964',
              color: hoveredCard === index ? '#F8F5F2' : '#E1DAD3'
            }}>
              {index + 1}
            </div>
            <h3 style={{
              ...styles.stepTitle,
              color: hoveredCard === index ? '#F8F5F2' : '#A26964'
            }}>
              {step.title}
            </h3>
            <p style={{
              ...styles.stepText,
              color: hoveredCard === index ? '#F8F5F2' : '#A26964'
            }}>
              {step.text}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const styles = {
  howItWorks: {
    padding: '8rem 8%',
    backgroundColor: '#E1DAD3',
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
    width: '500px',
    height: '500px',
    borderRadius: '50%',
    background: '#C2D2C7',
    top: '-25%',
    left: '-15%',
    opacity: '25%'
  },
  circle2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    borderRadius: '50%',
    background: '#A2B0CA',
    bottom: '-25%',
    right: '-12%',
    opacity: '25%'
  },
  circle3: {
    position: 'absolute',
    width: '650px',
    height: '650px',
    borderRadius: '50%',
    background: '#E4C9B6',
    top: '40%',
    left: '60%',
    transform: 'translate(-50%, -50%)',
    opacity: '25%'
  },
  sectionTitle: {
    textAlign: 'center',
    fontSize: '3.2rem',
    marginBottom: '4rem',
    color: '#A26964',
    fontFamily: "'Playfair Display', serif",
    position: 'relative',
    zIndex: 1,
    letterSpacing: '-1px'
  },
  titleHighlight: {
    color: '#C2D2C7',
    fontStyle: 'italic'
  },
  stepsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '4rem',
    maxWidth: '1300px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },
  stepCard: {
    padding: '3rem 2rem',
    borderRadius: '30px',
    textAlign: 'center',
    position: 'relative',
    boxShadow: '0 15px 40px rgba(162, 105, 100, 0.08)',
    transition: 'all 0.3s ease',
    border: '2px solid #C2D2C7',
    cursor: 'pointer',
    margin: '10px'
  },
  stepNumber: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 2rem',
    fontWeight: 700,
    fontSize: '1.4rem',
    fontFamily: "'Playfair Display', serif",
    boxShadow: '0 5px 15px rgba(162, 105, 100, 0.2)',
    transition: 'all 0.3s ease'
  },
  stepTitle: {
    color: '#A26964',
    fontSize: '1.7rem',
    marginBottom: '1.5rem',
    fontFamily: "'Playfair Display', serif",
    letterSpacing: '-0.5px',
    transition: 'color 0.3s ease'
  },
  stepText: {
    color: '#A26964',
    lineHeight: 1.6,
    fontSize: '1.1rem',
    opacity: 0.9,
    maxWidth: '220px',
    margin: '0 auto',
    fontFamily: "'Poppins', sans-serif",
    transition: 'color 0.3s ease'
  },
  '@media (max-width: 768px)': {
    howItWorks: {
      padding: '6rem 5%',
    },
    sectionTitle: {
      fontSize: '2.5rem',
    },
    stepsContainer: {
      gap: '2.5rem',
    },
    stepCard: {
      padding: '2rem 1.5rem',
    },
    stepNumber: {
      width: '50px',
      height: '50px',
      fontSize: '1.2rem'
    },
  },
};

export default HowItWorks;