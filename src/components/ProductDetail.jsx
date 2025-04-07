import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const currentUserId = sessionStorage.getItem("userId");

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        if (!id) return;
        const res = await fetch(`https://localhost:44367/api/Product/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleContactProvider = async () => {
    if (!product || !product.user || !product.user.id) return;
    if (product.user.id === currentUserId) return;
    try {
      const res = await fetch(`https://localhost:44367/api/Chat/${currentUserId}`);
      if (!res.ok) throw new Error();
      const chatsData = await res.json();
      const existingChat = chatsData.find(
        (chat) =>
          chat.product &&
          chat.product.id === product.id &&
          chat.product.user &&
          chat.product.user.id === product.user.id
      );
      let chat;
      if (existingChat) {
        chat = existingChat;
      } else {
        const createRes = await fetch(
          `https://localhost:44367/api/Chat/create?productId=${product.id}&buyerId=${currentUserId}`,
          { method: "POST" }
        );
        if (!createRes.ok) throw new Error();
        chat = await createRes.json();
      }
      navigate("/chats", { state: { chat } });
    } catch (error) {
      console.error("Error en handleContactProvider:", error);
    }
  };

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

  const styles = {
    pageContainer: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "#E1DAD3",
      fontFamily: "Poppins, sans-serif",
    },
    mainContent: {
      flex: 1,
      padding: isMobile ? "8px" : "16px",
      marginTop: isMobile ? "80px" : "100px",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      backgroundColor: "#F8F5F2",
      borderRadius: isMobile ? "8px" : "12px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "12px" : "24px",
      padding: isMobile ? "8px" : "16px",
    },
    galleryContainer: { order: 1, flex: 1, maxWidth: isMobile ? "100%" : "600px" },
    mainImageContainer: {
      aspectRatio: "1/1",
      backgroundColor: "rgba(162,105,100,0.1)",
      borderRadius: "8px",
      overflow: "hidden",
      marginBottom: "8px",
    },
    mainImage: { width: "100%", height: "100%", objectFit: "cover" },
    thumbnailsContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
      gap: "8px",
    },
    thumbnail: {
      width: "100%",
      height: isMobile ? "50px" : "80px",
      borderRadius: "4px",
      objectFit: "cover",
      cursor: "pointer",
      border: "1px solid transparent",
      transition: "border-color 0.3s",
    },
    infoContainer: { order: 2, flex: 1, display: "flex", flexDirection: "column", gap: "16px" },
    header: { borderBottom: "1px solid #E4C9B6", paddingBottom: "8px" },
    productTitle: {
      fontFamily: '"Playfair Display", serif',
      color: "#A26964",
      fontSize: isMobile ? "20px" : "28px",
      margin: "0 0 8px 0",
      lineHeight: "1.2",
    },
    detailsContainer: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: isMobile ? "8px" : "12px",
      fontSize: isMobile ? "14px" : "16px",
    },
    conditionText: {
      color: conditionName === "Nuevo" ? "#6A8D73" : "#A2B0CA",
      display: "flex",
      alignItems: "center",
      fontWeight: "500",
    },
    icon: { marginRight: "4px", minWidth: "16px" },
    sizeText: {
      color: "#A26964",
      padding: "4px 8px",
      backgroundColor: "rgba(162,105,100,0.1)",
      borderRadius: "4px",
      fontWeight: "500",
    },
    brandText: { color: "#A2B0CA", fontWeight: "500" },
    priceBadges: { display: "flex", flexDirection: isMobile ? "column" : "row", gap: "12px" },
    priceBadge: {
      backgroundColor: "rgba(194,210,199,0.2)",
      padding: "12px",
      borderRadius: "8px",
      flex: 1,
      textAlign: "center",
    },
    priceLabel: {
      display: "block",
      color: "#A2B0CA",
      fontSize: isMobile ? "14px" : "16px",
      marginBottom: "4px",
    },
    priceValue: {
      fontFamily: '"Playfair Display", serif',
      color: "#A26964",
      fontSize: isMobile ? "18px" : "22px",
      fontWeight: "700",
    },
    descriptionContainer: { backgroundColor: "rgba(228,201,182,0.1)", padding: "12px", borderRadius: "8px" },
    descriptionText: { color: "#6B6B6B", lineHeight: "1.6", margin: 0, fontSize: isMobile ? "14px" : "16px" },
    chatButton: {
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
      width: "100%",
      marginTop: "auto",
    },
    chatIcon: { width: isMobile ? "18px" : "20px", height: isMobile ? "18px" : "20px" },
  };

  return (
    <div style={styles.pageContainer}>
      <AuthNavBar />
      <main style={styles.mainContent}>
        <div style={styles.container}>
          <div style={styles.galleryContainer}>
            <div style={styles.mainImageContainer}>
              <img
                src={product.images?.[0]?.imageUrl || "/placeholder-image.jpg"}
                alt={product.name}
                style={styles.mainImage}
              />
            </div>
            <div style={styles.thumbnailsContainer}>
              {product.images?.map((img, i) => (
                <img
                  key={i}
                  src={img.imageUrl}
                  alt={`Vista ${i + 1}`}
                  style={styles.thumbnail}
                  onMouseOver={(e) => (e.currentTarget.style.borderColor = "#A26964")}
                  onMouseOut={(e) => (e.currentTarget.style.borderColor = "transparent")}
                />
              ))}
            </div>
          </div>
          <div style={styles.infoContainer}>
            <div style={styles.header}>
              <h1 style={styles.productTitle}>{product.name}</h1>
              <div style={styles.detailsContainer}>
                <span style={styles.conditionText}>
                  {conditionName === "Nuevo" ? (
                    <FiStar style={styles.icon} />
                  ) : (
                    <FiAlertCircle style={styles.icon} />
                  )}
                  {conditionName}
                </span>
                <span style={styles.sizeText}>Talla {sizeValue}</span>
                <span style={styles.brandText}>{brandName}</span>
              </div>
            </div>
            <div style={styles.priceBadges}>
              {product.price != null && (
                <div style={styles.priceBadge}>
                  <span style={styles.priceLabel}>Venta:</span>
                  <span style={styles.priceValue}>
                    {new Intl.NumberFormat("es-HN", {
                      style: "currency",
                      currency: "HNL",
                    }).format(product.price)}
                  </span>
                </div>
              )}
              {product.isForRental && product.pricePerDay != null && (
                <div style={styles.priceBadge}>
                  <span style={styles.priceLabel}>Alquiler/día:</span>
                  <span style={styles.priceValue}>
                    {new Intl.NumberFormat("es-HN", {
                      style: "currency",
                      currency: "HNL",
                    }).format(product.pricePerDay)}
                  </span>
                </div>
              )}
            </div>
            <div style={styles.descriptionContainer}>
              <p style={styles.descriptionText}>{product.description}</p>
            </div>
            {product.user.id !== currentUserId && (
              <button
                style={styles.chatButton}
                onClick={handleContactProvider}
                onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <FiMessageCircle style={styles.chatIcon} />
                Contactar proveedor
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
