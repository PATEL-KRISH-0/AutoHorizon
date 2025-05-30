import { useEffect, useState } from 'react'
import styles from './css/CarFind.module.css';
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useNavigate } from "react-router-dom"

export default function CarFind() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleClickGo = (id) => {
        navigate(`/carOverview?id=${id}`);
    };
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/v1/car', {
                    credentials: "include"
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCars(data.data.documents);
                console.log(data.data.documents);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (cars.length === 0) return <div>No cars found.</div>;
    return (
        <>
            <Nav />
            <main className={styles['browse-container']}>
                <section className={styles['filters']}>
                    <h2>Filters</h2>
                    <div className={styles['filter-group']}>
                        <label>Price Range</label>
                        <div className={styles['price-inputs']}>
                            <input type="number" placeholder="Min" min={0} />
                            <span>-</span>
                            <input type="number" placeholder="Max" min={0} />
                        </div>
                    </div>
                    <div className={styles['filter-group']}>
                        <label>Condition</label>

                        <div className={styles['filter-group']}>
                            <label>Search</label>
                            <input
                                type="text"
                                placeholder="Search cars..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className={styles['condition-grid']}>
                            <div className={styles['condition-card']} data-condition="new">
                                <i className="ri-shield-star-line" />
                                <span>New</span>
                            </div>
                            <div className={styles['condition-card']} data-condition="used">
                                <i className="ri-history-line" />
                                <span>Used</span>
                            </div>
                            <div className={styles['condition-card']} data-condition="certified">
                                <i className="ri-verified-badge-line" />
                                <span>Certified</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles['filter-group']}>
                        <label>City</label>
                        <div className={styles['city-grid']}>
                            <div className={styles['city-card']} data-city="mumbai">
                                <i className="ri-building-line" />
                                <span>Mumbai</span>
                            </div>
                            <div className={styles['city-card']} data-city="delhi">
                                <i className="ri-government-line" />
                                <span>Delhi</span>
                            </div>
                            <div className={styles['city-card']} data-city="bangalore">
                                <i className="ri-building-2-line" />
                                <span>Bangalore</span>
                            </div>
                            <div className={styles['city-card']} data-city="chennai">
                                <i className="ri-building-4-line" />
                                <span>Chennai</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles['filter-group']}>
                        <label>Brand</label>
                        <div className={styles['brand-grid']}>
                            <div className={styles['brand-card']} data-brand="tesla">
                                <img
                                    src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo2.png"
                                    alt="Tesla"
                                />
                            </div>
                            <div className={styles['brand-card']} data-brand="porsche">
                                <img
                                    src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo4.png"
                                    alt="Porsche"
                                />
                            </div>
                            <div className={styles['brand-card']} data-brand="audi">
                                <img
                                    src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo3.png"
                                    alt="Audi"
                                />
                            </div>
                            <div className={styles['brand-card']} data-brand="bmw">
                                <img
                                    src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo5.png"
                                    alt="BMW"
                                />
                            </div>
                            <div className={styles['brand-card']} data-brand="mercedes">
                                <img
                                    src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo1.png"
                                    alt="Mercedes"
                                />
                            </div>
                            <div className={styles['brand-card']} data-brand="mitsubishi">
                                <img
                                    src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo6.png"
                                    alt="Mitsubishi"
                                />
                            </div>
                        </div>
                        <button className={styles['show-more']} id="show-more-brands">
                            Show More Brands
                        </button>
                    </div>
                    <div className={styles['filter-group']}>
                        <label>Body Type</label>
                        <div className={styles['body-type-grid']}>
                            <div className={styles['body-type-card']} data-type="suv">
                                <i className="ri-car-line" />
                                <span>SUV</span>
                            </div>
                            <div className={styles['body-type-card']} data-type="sedan">
                                <i className="ri-taxi-line" />
                                <span>Sedan</span>
                            </div>
                            <div className={styles['body-type-card']} data-type="sports">
                                <i className="ri-roadster-line" />
                                <span>Sports</span>
                            </div>
                            <div className={styles['body-type-card']} data-type="luxury">
                                <i className="ri-car-washing-line" />
                                <span>Luxury</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles['filter-group']}>
                        <label>Fuel Type</label>
                        <div className={styles['fuel-type-grid']}>
                            <div className={styles['fuel-type-card']} data-fuel="electric">
                                <i className="ri-flashlight-line" />
                                <span>Electric</span>
                            </div>
                            <div className={styles['fuel-type-card']} data-fuel="hybrid">
                                <i className="ri-battery-2-charge-line" />
                                <span>Hybrid</span>
                            </div>
                            <div className={styles['fuel-type-card']} data-fuel="petrol">
                                <i className="ri-gas-station-line" />
                                <span>Petrol</span>
                            </div>
                            <div className={styles['fuel-type-card']} data-fuel="diesel">
                                <i className="ri-oil-line" />
                                <span>Diesel</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles['filter-group']}>
                        <label>Transmission</label>
                        <div className={styles['transmission-grid']}>
                            <div className={styles['transmission-card']} data-transmission="auto">
                                <i className="ri-steering-2-line" />
                                <span>Automatic</span>
                            </div>
                            <div className={styles['transmission-card']} data-transmission="manual">
                                <i className="ri-steering-line" />
                                <span>Manual</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles['filter-group']}>
                        <label>Mileage</label>
                        <div className={styles['mileage-grid']}>
                            <div className={styles['mileage-card']} data-mileage="low">
                                <i className="ri-speed-mini-line" />
                                <span>&lt; 50K</span>
                            </div>
                            <div className={styles['mileage-card']} data-mileage="medium">
                                <i className="ri-speed-line" />
                                <span>50K-100K</span>
                            </div>
                            <div className={styles['mileage-card']} data-mileage="high">
                                <i className="ri-speed-up-line" />
                                <span>&gt; 100K</span>
                            </div>
                        </div>
                    </div>
                    <button className={styles['apply-filters']}>Apply Filters</button>
                </section>
                <section className={styles['car-listings']}>
                    <div className={styles['section-header']}>
                        <h2>New Arrivals</h2>
                        <a href="#" className={styles['view-all']}>View All</a>
                    </div>
                    <div className={styles['car-grid']}>
                        {cars.map((car, index) => (
                            <div key={index} className={styles['car-card']}>
                                <div className={styles['car-status']}>{car.status}</div>
                                <h3 className={styles['car-title']}>{car.brand}</h3>
                                <span className={styles['car-subtitle']}>{car.model}</span>
                                <img src={car.images.main} alt={`${car.brand} ${car.model}`} className={styles['car-img']} />
                                <div className={styles['car-details']}>
                                    <div className={styles['car-detail-group']}>
                                        <i className="ri-timer-flash-line" />
                                        <span>{car.details.acceleration}</span>
                                    </div>
                                    <div className={styles['car-detail-group']}>
                                        <i className="ri-speed-up-line" />
                                        <span>{car.details.topSpeed}</span>
                                    </div>
                                    <div className={styles['car-detail-group']}>
                                        <i className="ri-charging-pile-2-line" />
                                        <span>{car.details.fuelType}</span>
                                    </div>
                                </div>
                                <div className={styles['car-specs']}>
                                    <div className={styles['spec-item']}>
                                        <i className="ri-calendar-line" />
                                        <span>{car.specs.year}</span>
                                    </div>
                                    <div className={styles['spec-item']}>
                                        <i className="ri-map-pin-line" />
                                        <span>{car.specs.location}</span>
                                    </div>
                                    <div className={styles['spec-item']}>
                                        <i className="ri-steering-line" />
                                        <span>{car.specs.transmission}</span>
                                    </div>
                                    <div className={styles['spec-item']}>
                                        <i className="ri-timer-line" />
                                        <span>{car.specs.mileage}</span>
                                    </div>
                                    <div className={styles['spec-item']}>
                                        <i className="ri-user-line" />
                                        <span>{car.specs.seats} seats</span>
                                    </div>
                                    <div className={styles['spec-item']}>
                                        <i className="ri-dashboard-3-line" />
                                        <span>{car.specs.driveType}</span>
                                    </div>
                                </div>
                                {/* <div className={styles['car-features']}>
                                    {car.tab.features.map((feature, i) => (
                                        <span key={i} className={styles['feature']}>
                                            <i className="ri-checkbox-circle-line" /> {feature}
                                        </span>
                                    ))}
                                </div> */}
                                <h4 className={styles['car-price']}>{car.price}</h4>
                                <button className={styles["popular__button"]} onClick={() => handleClickGo(car._id)}><i className="ri-shopping-bag-2-line" /></button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}
