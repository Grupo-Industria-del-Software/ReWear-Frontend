import { useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard'; 
import AuthNavBar from './AuthNavBar';   
import Footer from './Footer';           

const ProductsGrid = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [initialLoad, setInitialLoad] = useState(true); 
  const [filters, setFilters] = useState({
    category: '',
    condition: '',
    size: '',
    brand: '',
    minPrice: '',
    maxPrice: ''
  });
  const [filterOptions, setFilterOptions] = useState({
    categories: [],
    conditions: [],
    sizes: [],
    brands: []
  });

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [categoriesRes, conditionsRes, sizesRes, brandsRes] = await Promise.all([
          fetch('https://localhost:44367/api/Category').then(res => res.ok ? res.json() : []),
          fetch('https://localhost:44367/api/Condition').then(res => res.ok ? res.json() : []),
          fetch('https://localhost:44367/api/Size').then(res => res.ok ? res.json() : []),
          fetch('https://localhost:44367/api/Brand').then(res => res.ok ? res.json() : [])
        ]);

        setFilterOptions({
          categories: Array.isArray(categoriesRes) ? categoriesRes : [],
          conditions: Array.isArray(conditionsRes) ? conditionsRes : [],
          sizes: Array.isArray(sizesRes) ? sizesRes : [],
          brands: Array.isArray(brandsRes) ? brandsRes : [],
        });
      } catch (error) {
        console.error('Error loading filter options:', error);
        setFilterOptions({ categories: [], conditions: [], sizes: [], brands: [] });
      }
    };
    fetchFilterOptions();
  }, []); 

  const isMobile = windowWidth < 768;


  const fetchProducts = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
             const paramKey = key === 'category' ? 'CategoryId' :
                             key === 'condition' ? 'ConditionId' :
                             key === 'size' ? 'SizeId' :
                             key === 'brand' ? 'BrandId' : key; 
             params.append(paramKey, value);
        }
     });

      const apiUrl = `https://localhost:44367/api/Product?${params.toString()}`;
      console.log("Fetching products from:", apiUrl); 
      const res = await fetch(apiUrl);

       if (!res.ok) {
            console.error("API Error Response:", res.status, await res.text());
            throw new Error(`API request failed with status ${res.status}`);
       }

      const data = await res.json();
      console.log("Products data received:", data); 

      setProducts(Array.isArray(data) ? data : []);

    } catch (error) {
      console.error('Fetch products error:', error);
      setProducts([]); 
    } finally {
       if(initialLoad) {
            setLoading(false); 
            setInitialLoad(false); 
       }
    }
  }, [filters, initialLoad]); 


  useEffect(() => {
      if (initialLoad) {
          setLoading(true);
          fetchProducts();
      } else {
          const timer = setTimeout(() => {
              fetchProducts();
          }, 300); 
          return () => clearTimeout(timer); 
      }

  }, [fetchProducts, initialLoad]); 


  // Handler para cambios en filtros
  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const styles = {
    container: { display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#F8F5F2', paddingTop: '75px', paddingBottom: '80px', overflowX: 'hidden'},
    mainContent: {flex: '1', display: 'flex', flexDirection: isMobile ? 'column' : 'row'}, 
    filtersWrapper: isMobile ? { width: '80%', margin: '0 auto', padding: '0.5rem', backgroundColor: '#F8F5F2' } : { width: '250px', position: 'sticky', top: '75px', height: 'calc(100vh - 155px)', overflowY: 'auto', padding: '0.5rem', backgroundColor: '#F8F5F2' },
    filtersContainer: { backgroundColor: '#E1DAD3', borderRadius: '12px', padding: '0.5rem', display: 'grid', gap: '0.5rem', marginBottom: isMobile ? '0.5rem' : '0' },
    filtersTitle: { fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: '#A26964', marginBottom: '0.25rem' },
    filterGroup: { marginBottom: '0.5rem' },
    label: { fontFamily: "'Poppins', sans-serif", fontSize: '0.7rem', color: '#A26964', fontWeight: '500', marginBottom: '0.15rem', display: 'block' },
    select: { width: '100%', padding: '0.3rem', borderRadius: '4px', border: '1px solid #C2D2C7', backgroundColor: '#FFFFFF', fontFamily: "'Poppins', sans-serif", fontSize: '0.7rem', appearance: 'none', color: '#A2B0CA' },
    priceRange: { display: 'flex', alignItems: 'center', gap: '0.25rem' }, 
    priceInput: { width: '40%', padding: '0.3rem', borderRadius: '4px', border: '1px solid #C2D2C7', backgroundColor: '#FFFFFF', fontFamily: "'Poppins', sans-serif", fontSize: '0.7rem', color: '#A2B0CA' },
    separator: { color: '#A26964', fontSize: '0.7rem' },
    resultsContainer: isMobile ? { flex: '1', padding: '0 0.5rem' } : { flex: '1', padding: '1rem 1rem' },
    productsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.5rem', paddingBottom: '1rem' }, // Ajustado minmax
    loading: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem 0', minHeight: '200px' },
    spinner: { width: '2rem', height: '2rem', border: '3px solid #E4C9B6', borderTopColor: '#A26964', borderRadius: '50%', animation: 'spin 1s linear infinite' },
    emptyState: { textAlign: 'center', padding: '2rem 0', minHeight: '200px' },
    emptyText: { fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: '#A26964' }
};


  return (
    <div style={styles.container}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <AuthNavBar />
      <div style={styles.mainContent}>

        <div style={styles.filtersWrapper}>
          <div style={styles.filtersContainer}>
            <h2 style={styles.filtersTitle}>Filtros</h2>
     
            <div style={styles.filterGroup}>
              <label style={styles.label}>Categoría</label>
              <select
                style={styles.select}
                onChange={e => handleFilterChange('category', e.target.value)}
                value={filters.category}
              >
                <option value="">Todas</option>
                {filterOptions.categories.map(category => (
                  <option key={category.id} value={category.id}>{category.label}</option>
                ))}
              </select>
            </div>
             {/* Condición */}
            <div style={styles.filterGroup}>
              <label style={styles.label}>Condición</label>
              <select
                style={styles.select}
                onChange={e => handleFilterChange('condition', e.target.value)}
                value={filters.condition}
              >
                <option value="">Todas</option>
                 {filterOptions.conditions.map(condition => (
                  <option key={condition.id} value={condition.id}>{condition.label}</option>
                ))}
              </select>
            </div>
             {/* Talla */}
             <div style={styles.filterGroup}>
              <label style={styles.label}>Talla</label>
              <select
                style={styles.select}
                onChange={e => handleFilterChange('size', e.target.value)}
                value={filters.size}
              >
                <option value="">Todas</option>
                 {filterOptions.sizes.map(size => (
                  <option key={size.id} value={size.id}>{size.label}</option>
                ))}
              </select>
            </div>
            {/* Marca */}
            <div style={styles.filterGroup}>
              <label style={styles.label}>Marca</label>
              <select
                style={styles.select}
                onChange={e => handleFilterChange('brand', e.target.value)}
                value={filters.brand}
              >
                <option value="">Todas</option>
                 {filterOptions.brands.map(brand => (
                  <option key={brand.id} value={brand.id}>{brand.label}</option>
                ))}
              </select>
            </div>
             {/* Precio */}
            <div style={styles.filterGroup}>
               <label style={styles.label}>Precio (L)</label>
               <div style={styles.priceRange}>
                 <input
                   type="number"
                   placeholder="Mín"
                   style={styles.priceInput}
                   value={filters.minPrice}
                   onChange={e => handleFilterChange('minPrice', e.target.value)}
                   min="0" 
                 />
                 <span style={styles.separator}>-</span>
                 <input
                   type="number"
                   placeholder="Máx"
                   style={styles.priceInput}
                   value={filters.maxPrice}
                   onChange={e => handleFilterChange('maxPrice', e.target.value)}
                   min="0"
                 />
               </div>
             </div>
          </div>
        </div>

        <div style={styles.resultsContainer}>
          {loading ? (
            <div style={styles.loading}><div style={styles.spinner}></div></div>
          ) : (
            <>
              <div style={styles.productsGrid}>
                {products && products
                  .filter(p => p && typeof p === 'object')
                  .map(product => (
                    <ProductCard
                      key={product.id || Math.random()}
                      product={product}
                      filterOptions={filterOptions} 
                    />
                  ))
                }
              </div>
              {!loading && products.length === 0 && (
                <div style={styles.emptyState}>
                  <p style={styles.emptyText}>No se encontraron productos con estos filtros.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsGrid;