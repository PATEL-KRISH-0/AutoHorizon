import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styles from './css/carOverview.module.css';

const CarOverview = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id'); // URL: /carOverview?id=...
  const navigate = useNavigate();
  const [product, setProduct] = useState({ images: {}, key_features: [], tabs: {}, related_products: [] });
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState('specifications');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/car/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data.data.document);
        setMainImage(data.data.document.images.thumbnails[0].src);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const changeImage = (src) => {
    setMainImage(src);
  };

  // Redirect to Payment page on clicking "buy now"
  const handleBuyNow = () => {
    navigate(`/payment?id=${id}`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <>
      <Nav />
      <main className={styles['product-main']}>
        <div className={styles['product-container']}>
          <div className={styles['product-gallery']}>
            <div className={styles['main-image']}>
              <img src={`http://localhost:3000/images/cars/${mainImage}`} alt={product.name} id="mainImage" />
            </div>
            <div className={styles['thumbnail-container']}>
              {product.images.thumbnails.map((img, index) => (
                <img
                  key={index}
                  src={`http://localhost:3000/images/cars/${img.src}`}
                  alt={img.alt}
                  className={`${styles['thumbnail']} ${mainImage === img.src ? styles['active'] : ''}`}
                  onClick={() => changeImage(img.src)}
                />
              ))}
            </div>
          </div>

          <div className={styles['product-info']}>
            <h1>{product.fullName}</h1>
            <div className={styles['product-price']}>
              <span className={styles['price']}>{product.price}</span>
              {product.badge && <span className={styles['badge']}>{product.badge}</span>}
            </div>

            <div className={styles['product-price']}>
              <button className={`${styles.btn} ${styles['btn-primary']}`} onClick={handleBuyNow}>
                buy now
              </button>
            </div>

            <div className={styles['key-features']}>
              {product.key_features.map((feature, index) => (
                <div key={index} className={styles['feature']}>
                  <i className={feature.icon}></i>
                  <span>{feature.label}</span>
                </div>
              ))}
            </div>

            <div className={styles['product-tabs']}>
              <div className={styles['tab-buttons']}>
                {Object.keys(product.tabs).map((tab) => (
                  <button
                    key={tab}
                    className={`${styles['tab-btn']} ${activeTab === tab ? styles['active'] : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              <div className={styles['tab-content']}>
                {activeTab === 'specifications' && (
                  <div className={styles['spec-grid']}>
                    {Object.entries(product.tabs.specifications).map(([title, items], index) => (
                      <div key={index} className={styles['spec-item']}>
                        <h4>{title}</h4>
                        <ul>
                          {items.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className={styles['features-list']}>
                    {product.tabs.features.map((feature, index) => (
                      <div key={index} className={styles['feature-item']}>
                        <i className={feature.icon}></i>
                        <h4>{feature.title}</h4>
                        <p>{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'warranty' && (
                  <div className={styles['warranty-info']}>
                    <h4>{product.tabs.warranty.title}</h4>
                    <ul>
                      {product.tabs.warranty.details.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CarOverview;
