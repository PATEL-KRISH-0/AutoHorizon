import { useState, useEffect } from 'react';
import styles from './css/Home.module.css';
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useNavigate } from "react-router-dom"
const Home = () => {
    const navigate = useNavigate();
    const [popularCars, setPopularCars] = useState([]);
    const [featuredCars, setFeaturedCars] = useState([]);
    const [loading, setLoading] = useState({ popular: true, featured: true });
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const [popularRes, featuredRes] = await Promise.all([
                    fetch("http://localhost:3000/api/v1/car?limit=6&sort=price", {
                        credentials: "include",
                    }).then(res => res.json()),
                    fetch("http://localhost:3000/api/v1/car?limit=6&sort=-price", {
                        credentials: "include",
                    }).then(res => res.json())
                ]);
                console.log(popularRes.data.documents);

                setPopularCars(popularRes.data.documents);
                setFeaturedCars(featuredRes.data.documents);
            } catch (error) {
                console.error("Error fetching car data:", error);
            } finally {
                setLoading({ popular: false, featured: false });
            }
        };

        fetchCars();
    }, []);
    const handleClickGo = (id) => {
        navigate(`/carOverview?id=${id}`);
    };

    return (
        <>
    <div class="shape shape__big"></div>
    <div class="shape shape__small"></div>
    <div class="shape shape__smaller"></div>
            <Nav />
            <main>
                <h1 className={styles['hero-h1']}>Choose The Best Car</h1>
                <h2 className={styles['hero-h2']}></h2>
                <div className={styles['car-type']}>
                    <i className='ri-flashlight-line' />
                    Electric Car
                </div>
                <img
                    src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/home.png"
                    alt="Porsche Mission E"
                    className={styles['car-image']}
                />
                <div className={styles['stats']}>
                    <div className={styles['stat']}>
                        <i className='ri-temp-hot-line' />
                        <span className={styles['stat-value']}>24°</span>
                        <span className={styles['stat-label']}>Temperature</span>
                    </div>
                    <div className={styles['stat']}>
                        <i className='ri-dashboard-3-line' />
                        <span className={styles['stat-value']}>873</span>
                        <span className={styles['stat-label']}>Mileage</span>
                    </div>
                    <div className={styles['stat']}>
                        <i className='ri-flashlight-line' />
                        <span className={styles['stat-value']}>94%</span>
                        <span className={styles['stat-label']}>Battery</span>
                    </div>
                </div>
                <section className={styles["popular__section"]}>
                    <h2 className={styles["popular__title"]}>Popular Cars</h2>
                    {loading.popular ? (
                        <p>Loading popular cars...</p>
                    ) : (
                        <div className={styles["popular__container"]}>
                            {popularCars.map((car) => (
                                <div key={car.id} className={styles["popular__card"]}>
                                    <h3 className={styles["popular__card_title"]}>{car.fullName}</h3>
                                    <span className={styles["popular__card_subtitle"]}>{car.model}</span>
                                    <img src={`http://localhost:3000/images/cars/` + car.images.thumbnails[0].src} alt={`${car.name} ${car.model}`} className={styles["popular__img"]} />
                                    <div className={styles["popular__data"]}>
                                        <div className={styles["popular__data_group"]}><i className="ri-timer-flash-line" /> {car.year}</div>
                                        <div className={styles["popular__data_group"]}><i className="ri-speed-up-line" /> {car.brand}</div>
                                        <div className={styles["popular__data_group"]}><i className="ri-charging-pile-2-line" /> {car.fuelType}</div>
                                    </div>
                                    <h4 className={styles["popular__price"]}>{car.price}</h4>
                                    <button className={styles["popular__button"]} onClick={() => handleClickGo(car._id)}><i className="ri-shopping-bag-2-line" /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>


                <section className={styles['logos']}>
                    <div className={styles['logos__container']}>
                        <div className={styles['logos__content']}>
                            <img
                                src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo1.png"
                                alt="Porsche"
                                className={styles['logos__img']}
                            />
                        </div>
                        <div className={styles['logos__content']}>
                            <img
                                src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo2.png"
                                alt="Tesla"
                                className={styles['logos__img']}
                            />
                        </div>
                        <div className={styles['logos__content']}>
                            <img
                                src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo3.png"
                                alt="Audi"
                                className={styles['logos__img']}
                            />
                        </div>
                        <div className={styles['logos__content']}>
                            <img
                                src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo4.png"
                                alt="Porsche"
                                className={styles['logos__img']}
                            />
                        </div>
                        <div className={styles['logos__content']}>
                            <img
                                src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo5.png"
                                alt="BMW"
                                className={styles['logos__img']}
                            />
                        </div>
                        <div className={styles['logos__content']}>
                            <img
                                src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo6.png"
                                alt="Mitsubishi"
                                className={styles['logos__img']}
                            />
                        </div>
                    </div>
                </section>

                <section className={styles['states__section']}>
                    <h2 className={styles['states__title']}>Where Our Car Selling Services Are Available</h2>
                    <p className={styles['states__description']}>
                        Our platform helps you buy and sell cars in major cities across India, offering trusted services and a seamless experience.
                    </p>
                    <div className={styles['states__grid']}>
                        <div className={styles['state__card']}>
                            <svg className={styles['state__icon']} viewBox="0 0 24 24">
                                <path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 4v14M9 9h1M9 13h1M9 17h1M15 9h1M15 13h1M15 17h1" />
                            </svg>
                            <h3 className={styles['state__name']}>MUMBAI</h3>
                            <p className={styles['state__capital']}>Maharashtra</p>
                            <div className={styles['state__info']}>
                                <span className={styles['state__population']}>
                                    <i className='ri-user-3-line' />
                                    20.4M Population
                                </span>
                            </div>
                            <p className={styles['state__description']}>
                                Leading marketplace for luxury and used cars.
                            </p>
                        </div>
                        <div className={styles['state__card']}>
                            <svg className={styles['state__icon']} viewBox="0 0 24 24">
                                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V11h6v10M12 3v4" />
                            </svg>
                            <h3 className={styles['state__name']}>DELHI</h3>
                            <p className={styles['state__capital']}>National Capital</p>
                            <div className={styles['state__info']}>
                                <span className={styles['state__population']}>
                                    <i className='ri-user-3-line' />
                                    19.8M Population
                                </span>
                            </div>
                            <p className={styles['state__description']}>
                                One of the largest used car markets in India.
                            </p>
                        </div>
                        <div className={styles['state__card']}>
                            <svg className={styles['state__icon']} viewBox="0 0 24 24">
                                <path d="M3 21h18M6 21V8l6-4 6 4v13M12 9v12M9 9h6M9 12h6M9 15h6" />
                            </svg>
                            <h3 className={styles['state__name']}>BANGALORE</h3>
                            <p className={styles['state__capital']}>Karnataka</p>
                            <div className={styles['state__info']}>
                                <span className={styles['state__population']}>
                                    <i className='ri-user-3-line' />
                                    12.3M Population
                                </span>
                            </div>
                            <p className={styles['state__description']}>Top hub for electric and high-tech cars.</p>
                        </div>
                        <div className={styles['state__card']}>
                            <svg className={styles['state__icon']} viewBox="0 0 24 24">
                                <path d="M3 21h18M5 21V8l7-5 7 5v13M12 3v18M9 10h6M9 14h6" />
                            </svg>
                            <h3 className={styles['state__name']}>CHENNAI</h3>
                            <p className={styles['state__capital']}>Tamil Nadu</p>
                            <div className={styles['state__info']}>
                                <span className={styles['state__population']}>
                                    <i className='ri-user-3-line' />
                                    10.9M Population
                                </span>
                            </div>
                            <p className={styles['state__description']}>Home to India's top automobile industry.</p>
                        </div>
                        <div className={styles['state__card']}>
                            <svg className={styles['state__icon']} viewBox="0 0 24 24">
                                <path d="M3 21h18M6 21V8l6-4 6 4v13M8 12h8M8 15h8M12 12v9" />
                            </svg>
                            <h3 className={styles['state__name']}>HYDERABAD</h3>
                            <p className={styles['state__capital']}>Telangana</p>
                            <div className={styles['state__info']}>
                                <span className={styles['state__population']}>
                                    <i className='ri-user-3-line' />
                                    9.7M Population
                                </span>
                            </div>
                            <p className={styles['state__description']}>Fast-growing city for car resale.</p>
                        </div>
                        <div className={styles['state__card']}>
                            <svg className={styles['state__icon']} viewBox="0 0 24 24">
                                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V11h6v10M12 3v4" />
                            </svg>
                            <h3 className={styles['state__name']}>KOLKATA</h3>
                            <p className={styles['state__capital']}>West Bengal</p>
                            <div className={styles['state__info']}>
                                <span className={styles['state__population']}>
                                    <i className='ri-user-3-line' />
                                    14.8M Population
                                </span>
                            </div>
                            <p className={styles['state__description']}>Emerging market for used cars.</p>
                        </div>
                    </div>
                </section>
                {/* <section className={styles['sell-section']}>
                    <h2 className={styles['sell-section__title']}>Want to Sell Your Car?</h2>
                    <p className={styles['sell-section__subtitle']}>
                        Join over 3.5 million satisfied sellers who have trusted us with their
                        vehicles. Get the best value for your car with our premium selling
                        experience.
                    </p>
                    <div className={styles['sell-features']}>
                        <div className={styles['sell-feature']}>
                            <div className={styles['sell-feature__icon']}>
                                <i className='ri-timer-flash-line' />
                            </div>
                            <div className={styles['sell-feature__content']}>
                                <h3 className={styles['sell-feature__title']}>Quick Selling Process</h3>
                                <p className={styles['sell-feature__description']}>
                                    List your car in minutes and get instant offers from verified buyers
                                </p>
                            </div>
                        </div>
                        <div className={styles['sell-feature']}>
                            <div className={styles['sell-feature__icon']}>
                                <i className='ri-shield-check-line' />
                            </div>
                            <div className={styles['sell-feature__content']}>
                                <h3 className={styles['sell-feature__title']}>Secure Transactions</h3>
                                <p className={styles['sell-feature__description']}>
                                    Protected payment system and verified buyer profiles for your safety
                                </p>
                            </div>
                        </div>
                        <div className={styles['sell-feature']}>
                            <div className={styles['sell-feature__icon']}>
                                <i className='ri-money-dollar-circle-line' />
                            </div>
                            <div className={styles['sell-feature__content']}>
                                <h3 className={styles['sell-feature__title']}>Best Market Value</h3>
                                <p className={styles['sell-feature__description']}>
                                    Get competitive offers and maximize your car's selling price
                                </p>
                            </div>
                        </div>
                        <div className={styles['sell-feature']}>
                            <div className={styles['sell-feature__icon']}>
                                <i className='ri-customer-service-2-line' />
                            </div>
                            <div className={styles['sell-feature__content']}>
                                <h3 className={styles['sell-feature__title']}>Expert Support</h3>
                                <p className={styles['sell-feature__description']}>
                                    Dedicated team to guide you through the entire selling process
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles['sell-stats']}>
                        <div className={styles['sell-stat']}>
                            <div className={styles['sell-stat__number']}>3.5M+</div>
                            <div className={styles['sell-stat__label']}>Monthly Visitors</div>
                        </div>
                        <div className={styles['sell-stat']}>
                            <div className={styles['sell-stat__number']}>98%</div>
                            <div className={styles['sell-stat__label']}>Satisfaction Rate</div>
                        </div>
                        <div className={styles['sell-stat']}>
                            <div className={styles['sell-stat__number']}>24/7</div>
                            <div className={styles['sell-stat__label']}>Customer Support</div>
                        </div>
                        <div className={styles['sell-stat']}>
                            <div className={styles['sell-stat__number']}>90 Days</div>
                            <div className={styles['sell-stat__label']}>Ad Validity</div>
                        </div>
                    </div>
                    <div className={styles['sell-cta']}>
                        <a href="#" className={styles['sell-button']}>
                            Sell Your Car Now
                        </a>
                    </div>
                </section> */}

                <section className={styles['achievements']}>
                    <h2 className={styles['achievements__title']}>Our Achievements</h2>
                    <p className={styles['achievements__subtitle']}>
                        Leading the automotive industry with exceptional results and trusted by
                        millions worldwide
                    </p>
                    <div className={styles['achievements__grid']}>
                        <div className={styles['achievement__card']}>
                            <div className={styles['achievement__icon']}>
                                <i className='ri-auction-line' />
                            </div>
                            <div className={styles['achievement__number']}>3,50,000+</div>
                            <div className={styles['achievement__label']}>Bidding Events</div>
                            <p className={styles['achievement__description']}>
                                Successfully conducted auctions with high engagement and competitive
                                bidding
                            </p>
                        </div>
                        <div className={styles['achievement__card']}>
                            <div className={styles['achievement__icon']}>
                                <i className='ri-exchange-dollar-line' />
                            </div>
                            <div className={styles['achievement__number']}>20,00,000+</div>
                            <div className={styles['achievement__label']}>Transactions</div>
                            <p className={styles['achievement__description']}>
                                Seamless transactions completed with secure payment processing
                            </p>
                        </div>
                        <div className={styles['achievement__card']}>
                            <div className={styles['achievement__icon']}>
                                <i className='ri-money-dollar-circle-line' />
                            </div>
                            <div className={styles['achievement__number']}>38,000+</div>
                            <div className={styles['achievement__label']}>Cr Transactions</div>
                            <p className={styles['achievement__description']}>
                                Total value of successful transactions in crores
                            </p>
                        </div>
                        <div className={styles['achievement__card']}>
                            <div className={styles['achievement__icon']}>
                                <i className='ri-team-line' />
                            </div>
                            <div className={styles['achievement__number']}>25,00,000+</div>
                            <div className={styles['achievement__label']}>Registered Customers</div>
                            <p className={styles['achievement__description']}>
                                Growing community of satisfied customers across the country
                            </p>
                        </div>
                        <div className={styles['achievement__card']}>
                            <div className={styles['achievement__icon']}>
                                <i className='ri-file-list-3-line' />
                            </div>
                            <div className={styles['achievement__number']}>1,00,00,000+</div>
                            <div className={styles['achievement__label']}>Inspections &amp; Valuations</div>
                            <p className={styles['achievement__description']}>
                                Professional inspections ensuring quality and fair pricing
                            </p>
                        </div>
                        <div className={styles['achievement__card']}>
                            <div className={styles['achievement__icon']}>
                                <i className='ri-car-line' />
                            </div>
                            <div className={styles['achievement__number']}>80,00,000+</div>
                            <div className={styles['achievement__label']}>Listing Per Annum</div>
                            <p className={styles['achievement__description']}>
                                Active vehicle listings from trusted sellers nationwide
                            </p>
                        </div>
                    </div>
                </section>
                <section className={styles['testimonials']}>
                    <div className={styles['testimonials__header']}>
                        <h2 className={styles['testimonials__title']}>What Our Customers Say</h2>
                        <p className={styles['testimonials__description']}>
                            Discover why our customers love their electric vehicles and the
                            exceptional experience of driving with Elecar
                        </p>
                    </div>
                    <div className={styles['testimonials__grid']}>
                        <div className={styles['testimonial__card']}>
                            <div className={styles['testimonial__header']}>
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
                                    alt="Sarah Mitchell"
                                    className={styles['testimonial__image']}
                                />
                                <div className={styles['testimonial__info']}>
                                    <h3 className={styles['testimonial__name']}>Sarah Mitchell</h3>
                                    <p className={styles['testimonial__role']}>Tesla Model S Owner</p>
                                </div>
                            </div>
                            <div className={styles['testimonial__stars']}>
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                            </div>
                            <p className={styles['testimonial__content']}>
                                "The transition to electric was seamless. The performance and
                                technology exceeded all my expectations. Best decision I've made for
                                both luxury and sustainability."
                            </p>
                            <i className={`ri-double-quotes-r testimonial__quote`.split(" ").map(cls => styles[cls]).join(" ")} />
                        </div>
                        <div className={styles['testimonial__card']}>
                            <div className={styles['testimonial__header']}>
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
                                    alt="Michael Chen"
                                    className={styles['testimonial__image']}
                                />
                                <div className={styles['testimonial__info']}>
                                    <h3 className={styles['testimonial__name']}>Michael Chen</h3>
                                    <p className={styles['testimonial__role']}>Porsche Taycan Owner</p>
                                </div>
                            </div>
                            <div className={styles['testimonial__stars']}>
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                            </div>
                            <p className={styles['testimonial__content']}>
                                "Incredible driving experience! The instant torque and smooth
                                acceleration make every journey exciting. The tech features and build
                                quality are simply outstanding."
                            </p>
                            <i className={`ri-double-quotes-r testimonial__quote`.split(" ").map(cls => styles[cls]).join(" ")} />
                        </div>
                        <div className={styles['testimonial__card']}>
                            <div className={styles['testimonial__header']}>
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
                                    alt="Emma Rodriguez"
                                    className={styles['testimonial__image']}
                                />
                                <div className={styles['testimonial__info']}>
                                    <h3 className={styles['testimonial__name']}>Emma Rodriguez</h3>
                                    <p className={styles['testimonial__role']}>Audi e-tron Owner</p>
                                </div>
                            </div>
                            <div className={styles['testimonial__stars']}>
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                                <i className='ri-star-fill' />
                            </div>
                            <p className={styles['testimonial__content']}>
                                "From the moment I first test drove it, I knew this was the future.
                                The quietness, the comfort, and the environmental impact make me proud
                                to be an EV owner."
                            </p>
                            <i className={`ri-double-quotes-r testimonial__quote`.split(" ").map(cls => styles[cls]).join(" ")} />
                        </div>
                    </div>
                </section>
            </main >
            <Footer />
        </>

    );
};

export default Home;