const OrderHistory = () => {
    const orders = [
      { 
        id: 1, 
        created: '2024-03-15T14:30:00',
        provider: { name: 'Proveedor Premium S.A.' },
        status: 'Completado',
        products: [
          { name: 'Café Especial 250gr', price: 12.99 },
          { name: 'Taza Cerámica', price: 8.50 },
          { name: 'Pack Café + Taza', price: 19.99 }
        ],
        total: 45.99 
      },
      { 
        id: 2,
        created: '2024-02-28T10:15:00',
        provider: { name: 'Distribuidora Café Express' },
        status: 'En proceso',
        products: [
          { name: 'Café Orgánico 500gr', price: 15.75 },
          { name: 'Filtros Papel x100', price: 4.25 }
        ],
        total: 29.99 
      }
    ];

    return (
      <div style={styles.container}>
        {orders.map((order) => (
          <div key={order.id} style={styles.orderCard}>
            <div style={styles.orderHeader}>
              <div style={styles.orderMeta}>
                <span style={styles.orderNumber}>Orden #{order.id}</span>
                <span style={styles.provider}>{order.provider.name}</span>
              </div>
              <div style={styles.statusBadge(order.status)}>
                {order.status}
              </div>
            </div>
            
            <div style={styles.detailSection}>
              <div style={styles.detailColumn}>
                <span style={styles.detailLabel}>Fecha:</span>
                <span style={styles.detailValue}>
                  {new Date(order.created).toLocaleString('es-CL')}
                </span>
              </div>
            </div>
  
            <div style={styles.productsSection}>
              <span style={styles.sectionTitle}>Productos:</span>
              {order.products.map((product, index) => (
                <div key={index} style={styles.productItem}>
                  <span style={styles.productName}>{product.name}</span>
                  <span style={styles.productPrice}>${product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
  
            <div style={styles.totalSection}>
              <span style={styles.totalLabel}>Total:</span>
              <span style={styles.totalAmount}>${order.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      padding: '0.5rem'
    },
    orderCard: {
      backgroundColor: '#F8F5F2',
      borderRadius: '12px',
      padding: '1.5rem',
      border: '2px solid #E4C9B6',
      transition: 'all 0.3s ease',
      '&:hover': {
        transform: 'translateY(-3px)',
        boxShadow: '0 5px 15px rgba(162, 105, 100, 0.1)'
      }
    },
    orderHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.2rem',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    orderMeta: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem'
    },
    orderNumber: {
      color: '#A26964',
      fontSize: '1.4rem',
      fontFamily: "'Playfair Display', serif",
      fontWeight: 600
    },
    provider: {
      color: '#A2B0CA',
      fontSize: '0.95rem',
      fontFamily: "'Poppins', sans-serif"
    },
    statusBadge: (status) => ({
      backgroundColor: '#C2D2C7',
      color: '#F8F5F2',
      padding: '0.4rem 1.2rem',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 600,
      fontFamily: "'Poppins', sans-serif",
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    }),
    detailSection: {
      display: 'flex',
      gap: '2rem',
      marginBottom: '1.5rem',
      flexWrap: 'wrap'
    },
    detailColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.3rem'
    },
    detailLabel: {
      color: '#A26964',
      fontSize: '0.9rem',
      fontFamily: "'Playfair Display', serif"
    },
    detailValue: {
      color: '#666',
      fontSize: '0.95rem',
      fontFamily: "'Poppins', sans-serif"
    },
    productsSection: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      marginBottom: '1.5rem'
    },
    sectionTitle: {
      color: '#A26964',
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.1rem',
      borderBottom: '2px solid #E4C9B6',
      paddingBottom: '0.5rem'
    },
    productItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.5rem 0',
      borderBottom: '1px solid #E4C9B6'
    },
    productName: {
      color: '#666',
      fontSize: '0.95rem',
      fontFamily: "'Poppins', sans-serif"
    },
    productPrice: {
      color: '#A26964',
      fontWeight: 600,
      fontFamily: "'Poppins', sans-serif"
    },
    totalSection: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem',
      paddingTop: '1rem',
      borderTop: '2px solid #E4C9B6'
    },
    totalLabel: {
      color: '#A26964',
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.2rem'
    },
    totalAmount: {
      color: '#A26964',
      fontFamily: "'Playfair Display', serif",
      fontSize: '1.4rem',
      fontWeight: 700
    }
  };
  
  export default OrderHistory;