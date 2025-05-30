import { useState } from 'react';
import styles from './css/Home.module.css';
// import { popularCars, featuredCars, states } from '../data/mockData';

const Home = () => {
    //   const [selectedFilter, setSelectedFilter] = useState('all');
    //   const [loading] = useState({
    //     cars: false,
    //     states: false
    //   });

    //   const handleFilterChange = (filter) => {
    //     setSelectedFilter(filter);
    //   };

    return (
        <main>
            <h1 className="hero-h1">Choose The Best Car</h1>
            <h2 className="hero-h2">Porsche Mission E</h2>
            <div className="car-type">
                <i className="ri-flashlight-line" />
                Electric Car
            </div>
            <img
                src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/home.png"
                alt="Porsche Mission E"
                className="car-image"
            />
            <div className="stats">
                <div className="stat">
                    <i className="ri-temp-hot-line" />
                    <span className="stat-value">24°</span>
                    <span className="stat-label">Temperature</span>
                </div>
                <div className="stat">
                    <i className="ri-dashboard-3-line" />
                    <span className="stat-value">873</span>
                    <span className="stat-label">Mileage</span>
                </div>
                <div className="stat">
                    <i className="ri-flashlight-line" />
                    <span className="stat-value">94%</span>
                    <span className="stat-label">Battery</span>
                </div>
            </div>
            <section className="popular__section">
                <h2 className="popular__title">Popular Cars</h2>
                <div className="popular__container">
                    <div className="popular__card">
                        <h3 className="popular__card-title">Porsche</h3>
                        <span className="popular__card-subtitle">Turbo S</span>
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/popular1.png"
                            alt="Porsche Turbo S"
                            className="popular__img"
                        />
                        <div className="popular__data">
                            <div className="popular__data-group">
                                <i className="ri-timer-flash-line" />
                                3.7 sec
                            </div>
                            <div className="popular__data-group">
                                <i className="ri-speed-up-line" />
                                356 Km/h
                            </div>
                            <div className="popular__data-group">
                                <i className="ri-charging-pile-2-line" />
                                Electric
                            </div>
                        </div>
                        <h4 className="popular__price">$175,900</h4>
                        <button className="popular__button">
                            <i className="ri-shopping-bag-2-line" />
                        </button>
                    </div>
                    <div className="popular__card">
                        <h3 className="popular__card-title">Porsche</h3>
                        <span className="popular__card-subtitle">Turbo S</span>
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/popular1.png"
                            alt="Porsche Turbo S"
                            className="popular__img"
                        />
                        <div className="popular__data">
                            <div className="popular__data-group">
                                <i className="ri-timer-flash-line" />
                                3.7 sec
                            </div>
                            <div className="popular__data-group">
                                <i className="ri-speed-up-line" />
                                356 Km/h
                            </div>
                            <div className="popular__data-group">
                                <i className="ri-charging-pile-2-line" />
                                Electric
                            </div>
                        </div>
                        <h4 className="popular__price">$175,900</h4>
                        <button className="popular__button">
                            <i className="ri-shopping-bag-2-line" />
                        </button>
                    </div>
                    <div className="popular__card">
                        <h3 className="popular__card-title">Porsche</h3>
                        <span className="popular__card-subtitle">Turbo S</span>
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/popular1.png"
                            alt="Porsche Turbo S"
                            className="popular__img"
                        />
                        <div className="popular__data">
                            <div className="popular__data-group">
                                <i className="ri-timer-flash-line" />
                                3.7 sec
                            </div>
                            <div className="popular__data-group">
                                <i className="ri-speed-up-line" />
                                356 Km/h
                            </div>
                            <div className="popular__data-group">
                                <i className="ri-charging-pile-2-line" />
                                Electric
                            </div>
                        </div>
                        <h4 className="popular__price">$175,900</h4>
                        <button className="popular__button">
                            <i className="ri-shopping-bag-2-line" />
                        </button>
                    </div>
                </div>
            </section>
            <section className="featured__section">
                <div className="featured__header">
                    <h2 className="featured__title">More Models</h2>
                    <p className="featured__subtitle">Explore our latest electric vehicles</p>
                </div>
                <div className="luxury__filters">
                    <button className="luxury__filter active">
                        <span>All</span>
                    </button>
                    <button className="luxury__filter">
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo2.png"
                            alt="Tesla"
                        />
                    </button>
                    <button className="luxury__filter">
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo3.png"
                            alt="Audi"
                        />
                    </button>
                    <button className="luxury__filter">
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo4.png"
                            alt="Porsche"
                        />
                    </button>
                </div>
                <div className="featured__grid">
                    <div className="featured__card">
                        <h3 className="featured__card-title">Tesla</h3>
                        <span className="featured__card-subtitle">Model X</span>
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/offer.png"
                            alt="Tesla Model X"
                            className="featured__card-img"
                        />
                        <h4 className="featured__card-price">$98,900</h4>
                        <button className="featured__card-button">
                            <i className="ri-shopping-bag-2-line" />
                        </button>
                    </div>
                    <div className="featured__card">
                        <h3 className="featured__card-title">Tesla</h3>
                        <span className="featured__card-subtitle">Model 3</span>
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/offer.png"
                            alt="Tesla Model 3"
                            className="featured__card-img"
                        />
                        <h4 className="featured__card-price">$45,900</h4>
                        <button className="featured__card-button">
                            <i className="ri-shopping-bag-2-line" />
                        </button>
                    </div>
                    <div className="featured__card">
                        <h3 className="featured__card-title">Audi</h3>
                        <span className="featured__card-subtitle">E-tron</span>
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/offer.png"
                            alt="Audi E-tron"
                            className="featured__card-img"
                        />
                        <h4 className="featured__card-price">$65,900</h4>
                        <button className="featured__card-button">
                            <i className="ri-shopping-bag-2-line" />
                        </button>
                    </div>
                    <div className="featured__card">
                        <h3 className="featured__card-title">Porsche</h3>
                        <span className="featured__card-subtitle">Boxter 987</span>
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/offer.png"
                            alt="Porsche Boxter"
                            className="featured__card-img"
                        />
                        <h4 className="featured__card-price">$126,900</h4>
                        <button className="featured__card-button">
                            <i className="ri-shopping-bag-2-line" />
                        </button>
                    </div>
                    <div className="featured__card">
                        <h3 className="featured__card-title">Porsche</h3>
                        <span className="featured__card-subtitle">Panamera</span>
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/offer.png"
                            alt="Porsche Panamera"
                            className="featured__card-img"
                        />
                        <h4 className="featured__card-price">$126,900</h4>
                        <button className="featured__card-button">
                            <i className="ri-shopping-bag-2-line" />
                        </button>
                    </div>
                </div>
            </section>
            <section className="logos">
                <div className="logos__container">
                    <div className="logos__content">
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo1.png"
                            alt="Porsche"
                            className="logos__img"
                        />
                    </div>
                    <div className="logos__content">
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo2.png"
                            alt="Tesla"
                            className="logos__img"
                        />
                    </div>
                    <div className="logos__content">
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo3.png"
                            alt="Audi"
                            className="logos__img"
                        />
                    </div>
                    <div className="logos__content">
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo4.png"
                            alt="Porsche"
                            className="logos__img"
                        />
                    </div>
                    <div className="logos__content">
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo5.png"
                            alt="BMW"
                            className="logos__img"
                        />
                    </div>
                    <div className="logos__content">
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo6.png"
                            alt="Mitsubishi"
                            className="logos__img"
                        />
                    </div>
                </div>
            </section>
            <section className="states__section">
                <h2 className="states__title">Discover India's Capitals</h2>
                <p className="states__description">
                    Explore the unique characteristics of India's most remarkable capital
                    cities, each offering its own cultural heritage and architectural marvels
                </p>
                <div className="states__grid">
                    <div className="state__card">
                        <svg className="state__icon" viewBox="0 0 24 24">
                            <path d="M3 21h18M5 21V7l8-4v18M13 21V3l6 4v14M9 9h1M9 13h1M9 17h1M15 9h1M15 13h1M15 17h1" />
                        </svg>
                        <h3 className="state__name">MUMBAI</h3>
                        <p className="state__capital">Maharashtra</p>
                        <div className="state__info">
                            <span className="state__population">
                                <i className="ri-user-3-line" />
                                20.4M Population
                            </span>
                        </div>
                        <p className="state__description">
                            Gateway of India &amp; Financial Hub
                        </p>
                    </div>
                    <div className="state__card">
                        <svg className="state__icon" viewBox="0 0 24 24">
                            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V11h6v10M12 3v4" />
                        </svg>
                        <h3 className="state__name">DELHI</h3>
                        <p className="state__capital">National Capital</p>
                        <div className="state__info">
                            <span className="state__population">
                                <i className="ri-user-3-line" />
                                19.8M Population
                            </span>
                        </div>
                        <p className="state__description">
                            Historic Capital &amp; Power Center
                        </p>
                    </div>
                    <div className="state__card">
                        <svg className="state__icon" viewBox="0 0 24 24">
                            <path d="M3 21h18M6 21V8l6-4 6 4v13M12 9v12M9 9h6M9 12h6M9 15h6" />
                        </svg>
                        <h3 className="state__name">BANGALORE</h3>
                        <p className="state__capital">Karnataka</p>
                        <div className="state__info">
                            <span className="state__population">
                                <i className="ri-user-3-line" />
                                12.3M Population
                            </span>
                        </div>
                        <p className="state__description">Silicon Valley of India</p>
                    </div>
                    <div className="state__card">
                        <svg className="state__icon" viewBox="0 0 24 24">
                            <path d="M3 21h18M5 21V8l7-5 7 5v13M12 3v18M9 10h6M9 14h6" />
                        </svg>
                        <h3 className="state__name">CHENNAI</h3>
                        <p className="state__capital">Tamil Nadu</p>
                        <div className="state__info">
                            <span className="state__population">
                                <i className="ri-user-3-line" />
                                10.9M Population
                            </span>
                        </div>
                        <p className="state__description">Cultural Capital of South</p>
                    </div>
                    <div className="state__card">
                        <svg className="state__icon" viewBox="0 0 24 24">
                            <path d="M3 21h18M6 21V8l6-4 6 4v13M8 12h8M8 15h8M12 12v9" />
                        </svg>
                        <h3 className="state__name">HYDERABAD</h3>
                        <p className="state__capital">Telangana</p>
                        <div className="state__info">
                            <span className="state__population">
                                <i className="ri-user-3-line" />
                                9.7M Population
                            </span>
                        </div>
                        <p className="state__description">City of Pearls &amp; Tech Hub</p>
                    </div>
                    <div className="state__card">
                        <svg className="state__icon" viewBox="0 0 24 24">
                            <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21V11h6v10M12 3v4" />
                        </svg>
                        <h3 className="state__name">KOLKATA</h3>
                        <p className="state__capital">West Bengal</p>
                        <div className="state__info">
                            <span className="state__population">
                                <i className="ri-user-3-line" />
                                14.8M Population
                            </span>
                        </div>
                        <p className="state__description">Cultural Capital of East</p>
                    </div>
                </div>
            </section>
            <section className="sell-section">
                <h2 className="sell-section__title">Want to Sell Your Car?</h2>
                <p className="sell-section__subtitle">
                    Join over 3.5 million satisfied sellers who have trusted us with their
                    vehicles. Get the best value for your car with our premium selling
                    experience.
                </p>
                <div className="sell-features">
                    <div className="sell-feature">
                        <div className="sell-feature__icon">
                            <i className="ri-timer-flash-line" />
                        </div>
                        <div className="sell-feature__content">
                            <h3 className="sell-feature__title">Quick Selling Process</h3>
                            <p className="sell-feature__description">
                                List your car in minutes and get instant offers from verified buyers
                            </p>
                        </div>
                    </div>
                    <div className="sell-feature">
                        <div className="sell-feature__icon">
                            <i className="ri-shield-check-line" />
                        </div>
                        <div className="sell-feature__content">
                            <h3 className="sell-feature__title">Secure Transactions</h3>
                            <p className="sell-feature__description">
                                Protected payment system and verified buyer profiles for your safety
                            </p>
                        </div>
                    </div>
                    <div className="sell-feature">
                        <div className="sell-feature__icon">
                            <i className="ri-money-dollar-circle-line" />
                        </div>
                        <div className="sell-feature__content">
                            <h3 className="sell-feature__title">Best Market Value</h3>
                            <p className="sell-feature__description">
                                Get competitive offers and maximize your car's selling price
                            </p>
                        </div>
                    </div>
                    <div className="sell-feature">
                        <div className="sell-feature__icon">
                            <i className="ri-customer-service-2-line" />
                        </div>
                        <div className="sell-feature__content">
                            <h3 className="sell-feature__title">Expert Support</h3>
                            <p className="sell-feature__description">
                                Dedicated team to guide you through the entire selling process
                            </p>
                        </div>
                    </div>
                </div>
                <div className="sell-stats">
                    <div className="sell-stat">
                        <div className="sell-stat__number">3.5M+</div>
                        <div className="sell-stat__label">Monthly Visitors</div>
                    </div>
                    <div className="sell-stat">
                        <div className="sell-stat__number">98%</div>
                        <div className="sell-stat__label">Satisfaction Rate</div>
                    </div>
                    <div className="sell-stat">
                        <div className="sell-stat__number">24/7</div>
                        <div className="sell-stat__label">Customer Support</div>
                    </div>
                    <div className="sell-stat">
                        <div className="sell-stat__number">90 Days</div>
                        <div className="sell-stat__label">Ad Validity</div>
                    </div>
                </div>
                <div className="sell-cta">
                    <a href="#" className="sell-button">
                        Sell Your Car Now
                    </a>
                </div>
            </section>
            <section className="achievements">
                <h2 className="achievements__title">Our Achievements</h2>
                <p className="achievements__subtitle">
                    Leading the automotive industry with exceptional results and trusted by
                    millions worldwide
                </p>
                <div className="achievements__grid">
                    <div className="achievement__card">
                        <div className="achievement__icon">
                            <i className="ri-auction-line" />
                        </div>
                        <div className="achievement__number">3,50,000+</div>
                        <div className="achievement__label">Bidding Events</div>
                        <p className="achievement__description">
                            Successfully conducted auctions with high engagement and competitive
                            bidding
                        </p>
                    </div>
                    <div className="achievement__card">
                        <div className="achievement__icon">
                            <i className="ri-exchange-dollar-line" />
                        </div>
                        <div className="achievement__number">20,00,000+</div>
                        <div className="achievement__label">Transactions</div>
                        <p className="achievement__description">
                            Seamless transactions completed with secure payment processing
                        </p>
                    </div>
                    <div className="achievement__card">
                        <div className="achievement__icon">
                            <i className="ri-money-dollar-circle-line" />
                        </div>
                        <div className="achievement__number">38,000+</div>
                        <div className="achievement__label">Cr Transactions</div>
                        <p className="achievement__description">
                            Total value of successful transactions in crores
                        </p>
                    </div>
                    <div className="achievement__card">
                        <div className="achievement__icon">
                            <i className="ri-team-line" />
                        </div>
                        <div className="achievement__number">25,00,000+</div>
                        <div className="achievement__label">Registered Customers</div>
                        <p className="achievement__description">
                            Growing community of satisfied customers across the country
                        </p>
                    </div>
                    <div className="achievement__card">
                        <div className="achievement__icon">
                            <i className="ri-file-list-3-line" />
                        </div>
                        <div className="achievement__number">1,00,00,000+</div>
                        <div className="achievement__label">Inspections &amp; Valuations</div>
                        <p className="achievement__description">
                            Professional inspections ensuring quality and fair pricing
                        </p>
                    </div>
                    <div className="achievement__card">
                        <div className="achievement__icon">
                            <i className="ri-car-line" />
                        </div>
                        <div className="achievement__number">80,00,000+</div>
                        <div className="achievement__label">Listing Per Annum</div>
                        <p className="achievement__description">
                            Active vehicle listings from trusted sellers nationwide
                        </p>
                    </div>
                </div>
            </section>
            <section className="testimonials">
                <div className="testimonials__header">
                    <h2 className="testimonials__title">What Our Customers Say</h2>
                    <p className="testimonials__description">
                        Discover why our customers love their electric vehicles and the
                        exceptional experience of driving with Elecar
                    </p>
                </div>
                <div className="testimonials__grid">
                    <div className="testimonial__card">
                        <div className="testimonial__header">
                            <img
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
                                alt="Sarah Mitchell"
                                className="testimonial__image"
                            />
                            <div className="testimonial__info">
                                <h3 className="testimonial__name">Sarah Mitchell</h3>
                                <p className="testimonial__role">Tesla Model S Owner</p>
                            </div>
                        </div>
                        <div className="testimonial__stars">
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                        </div>
                        <p className="testimonial__content">
                            "The transition to electric was seamless. The performance and
                            technology exceeded all my expectations. Best decision I've made for
                            both luxury and sustainability."
                        </p>
                        <i className="ri-double-quotes-r testimonial__quote" />
                    </div>
                    <div className="testimonial__card">
                        <div className="testimonial__header">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
                                alt="Michael Chen"
                                className="testimonial__image"
                            />
                            <div className="testimonial__info">
                                <h3 className="testimonial__name">Michael Chen</h3>
                                <p className="testimonial__role">Porsche Taycan Owner</p>
                            </div>
                        </div>
                        <div className="testimonial__stars">
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                        </div>
                        <p className="testimonial__content">
                            "Incredible driving experience! The instant torque and smooth
                            acceleration make every journey exciting. The tech features and build
                            quality are simply outstanding."
                        </p>
                        <i className="ri-double-quotes-r testimonial__quote" />
                    </div>
                    <div className="testimonial__card">
                        <div className="testimonial__header">
                            <img
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
                                alt="Emma Rodriguez"
                                className="testimonial__image"
                            />
                            <div className="testimonial__info">
                                <h3 className="testimonial__name">Emma Rodriguez</h3>
                                <p className="testimonial__role">Audi e-tron Owner</p>
                            </div>
                        </div>
                        <div className="testimonial__stars">
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                            <i className="ri-star-fill" />
                        </div>
                        <p className="testimonial__content">
                            "From the moment I first test drove it, I knew this was the future.
                            The quietness, the comfort, and the environmental impact make me proud
                            to be an EV owner."
                        </p>
                        <i className="ri-double-quotes-r testimonial__quote" />
                    </div>
                </div>
            </section>
        </main>

    );
};

export default Home;