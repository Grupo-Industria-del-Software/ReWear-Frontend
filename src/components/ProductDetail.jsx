import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiStar, FiAlertCircle, FiMessageCircle } from "react-icons/fi";
import AuthNavBar from "./AuthNavBar";
import Footer from "./Footer";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return width;
};

const ProductDetail = () => {
  const { id } = useParams();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id) return;
        const res = await fetch(`https://localhost:44367/api/Product/${id}`);
        if (!res.ok) {
          console.error("Error en la petición:", res.status, res.statusText);
          throw new Error("Error al cargar el producto");
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);
  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Producto no encontrado</div>;
  const conditionName =
    product.condition && typeof product.condition === "object"
      ? product.condition.label
      : product.condition || "Condición no especificada";
  const brandName =
    product.brand && typeof product.brand === "object"
      ? product.brand.label
      : product.brand || "Marca no especificada";
  const sizeValue =
    product.size && typeof product.size === "object"
      ? product.size.label
      : product.size || "Talla no especificada";
  const pageContainer = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    backgroundColor: "#E1DAD3",
    fontFamily: "Poppins, sans-serif"
  };
  const mainContent = {
    flex: 1,
    padding: isMobile ? "8px" : "16px",
    marginTop: isMobile ? "80px" : "100px"
  };
  const container = {
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#F8F5F2",
    borderRadius: isMobile ? "8px" : "12px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: isMobile ? "12px" : "24px",
    padding: isMobile ? "8px" : "16px"
  };
  const galleryContainer = {
    order: 1,
    flex: 1,
    maxWidth: isMobile ? "100%" : "600px"
  };
  const mainImageContainer = {
    aspectRatio: "1/1",
    backgroundColor: "rgba(162,105,100,0.1)",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "8px"
  };
  const mainImage = {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  };
  const thumbnailsContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
    gap: "8px"
  };
  const thumbnail = {
    width: "100%",
    height: isMobile ? "50px" : "80px",
    borderRadius: "4px",
    objectFit: "cover",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "border-color 0.3s"
  };
  const infoContainer = {
    order: 2,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  };
  const header = {
    borderBottom: "1px solid #E4C9B6",
    paddingBottom: "8px"
  };
  const productTitle = {
    fontFamily: '"Playfair Display", serif',
    color: "#A26964",
    fontSize: isMobile ? "20px" : "28px",
    margin: "0 0 8px 0",
    lineHeight: "1.2"
  };
  const detailsContainer = {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    gap: isMobile ? "8px" : "12px",
    fontSize: isMobile ? "14px" : "16px"
  };
  const conditionText = {
    color: conditionName === "Nuevo" ? "#C2D2C7" : "#A2B0CA",
    display: "flex",
    alignItems: "center",
    fontWeight: "500"
  };
  const icon = {
    marginRight: "4px",
    minWidth: "16px"
  };
  const sizeText = {
    color: "#A26964",
    padding: "4px 8px",
    backgroundColor: "rgba(162,105,100,0.1)",
    borderRadius: "4px",
    fontWeight: "500"
  };
  const brandText = {
    color: "#A2B0CA",
    fontWeight: "500"
  };
  const priceBadges = {
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    gap: "12px"
  };
  const priceBadge = {
    backgroundColor: "rgba(194,210,199,0.2)",
    padding: "12px",
    borderRadius: "8px",
    flex: 1,
    textAlign: "center"
  };
  const priceLabel = {
    display: "block",
    color: "#A2B0CA",
    fontSize: isMobile ? "14px" : "16px",
    marginBottom: "4px"
  };
  const priceValue = {
    fontFamily: '"Playfair Display", serif',
    color: "#A26964",
    fontSize: isMobile ? "18px" : "22px",
    fontWeight: "700"
  };
  const descriptionContainer = {
    backgroundColor: "rgba(228,201,182,0.1)",
    padding: "12px",
    borderRadius: "8px"
  };
  const descriptionText = {
    color: "#6B6B6B",
    lineHeight: "1.6",
    margin: 0,
    fontSize: isMobile ? "14px" : "16px"
  };
  const chatButton = {
    backgroundColor: "#A26964",
    color: "#F8F5F2",
    border: "none",
    padding: isMobile ? "12px" : "16px",
    borderRadius: "8px",
    fontSize: isMobile ? "14px" : "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    cursor: "pointer",
    transition: "transform 0.2s",
    width: "100%"
  };
  const chatIcon = {
    width: isMobile ? "18px" : "20px",
    height: isMobile ? "18px" : "20px"
  };
  return (
    <div style={pageContainer}>
      <AuthNavBar />
      <main style={mainContent}>
        <div style={container}>
          <div style={galleryContainer}>
            <div style={mainImageContainer}>
              <img 
                src={product.images?.[0]?.imageUrl || '/placeholder-image.jpg'} 
                alt={product.name} 
                style={mainImage} 
              />
            </div>
            <div style={thumbnailsContainer}>
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img.imageUrl}
                  alt={`Vista ${i + 1}`}
                  style={thumbnail}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = "#A26964")}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = "transparent")}
                />
              ))}
            </div>
          </div>
          <div style={infoContainer}>
            <div style={header}>
              <h1 style={productTitle}>{product.name}</h1>
              <div style={detailsContainer}>
                <span style={conditionText}>
                  {conditionName === "Nuevo" ? (
                    <FiStar style={icon} />
                  ) : (
                    <FiAlertCircle style={icon} />
                  )}
                  {conditionName}
                </span>
                <span style={sizeText}>Talla {sizeValue}</span>
                <span style={brandText}>{brandName}</span>
              </div>
            </div>
            <div style={priceBadges}>
              {product.IsForSale && (
                <div style={priceBadge}>
                  <span style={priceLabel}>Venta:</span>
                  <span style={priceValue}>${product.Price}</span>
                </div>
              )}
              {product.IsForRental && (
                <div style={priceBadge}>
                  <span style={priceLabel}>Alquiler/día:</span>
                  <span style={priceValue}>${product.PricePerDay}</span>
                </div>
              )}
            </div>
            <div style={descriptionContainer}>
              <p style={descriptionText}>{product.description}</p>
            </div>
            <button style={chatButton}>
              <FiMessageCircle style={chatIcon} />
              Contactar proveedor
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default ProductDetail;