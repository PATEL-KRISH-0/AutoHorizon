import React from 'react'
import styles from './css/About.module.css';
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { Link } from "react-router-dom";
export default function About() {
    return (
        <>
            <div class="shape shape__big"></div>
            <div class="shape shape__small"></div>
            <div class="shape shape__smaller"></div>
            <Nav />
            <main className={styles['about-main']}>
                {/* Hero Section */}
                <section className={styles['about-hero']}>
                    <h1>Driving the Future of Electric Mobility</h1>
                    <p>
                        At Elecar, we're revolutionizing the automotive industry by making premium
                        electric vehicles accessible to everyone. Our mission is to accelerate the
                        world's transition to sustainable energy.
                    </p>
                </section>
                {/* Mission Section */}
                <section className={styles['mission-section']}>
                    <div className={styles['mission-content']}>
                        <h2>Our Mission</h2>
                        <p>
                            We believe in a future where every vehicle on the road is electric,
                            reducing our carbon footprint and creating a sustainable future for
                            generations to come.
                        </p>
                        <p>
                            Through innovative technology and exceptional design, we're making
                            electric vehicles that are not just environmentally friendly, but also
                            thrilling to drive.
                        </p>
                        <div className={styles['mission-stats']}>
                            <div className={styles['stat-card']}>
                                <i className='ri-car-line' />
                                <div className={styles['number']}>50K+</div>
                                <div className={styles['label']}>Cars Delivered</div>
                            </div>
                            <div className={styles['stat-card']}>
                                <i className='ri-earth-line' />
                                <div className={styles['number']}>30+</div>
                                <div className={styles['label']}>Countries</div>
                            </div>
                            <div className={styles['stat-card']}>
                                <i className='ri-charging-pile-2-line' />
                                <div className={styles['number']}>5K+</div>
                                <div className={styles['label']}>Charging Stations</div>
                            </div>
                            <div className={styles['stat-card']}>
                                <i className='ri-user-smile-line' />
                                <div className={styles['number']}>100K+</div>
                                <div className={styles['label']}>Happy Customers</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['mission-image']}>
                        <img
                            src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/home.png"
                            alt="Electric Vehicle"
                        />
                    </div>
                </section>
                {/* Team Section */}
                <section className={styles['team-section']}>
                    <h2>Meet Our Leadership</h2>
                    <div className={styles['team-grid']}>
                        <div className={styles['team-card']}>
                            <div className={styles['team-avatar']}>
                                <img src="./edo (1).jpg" alt="" />
                            </div>
                            <h3>John Smith</h3>
                            <div className={styles['position']}>CEO &amp; Founder</div>
                            <div className={styles['social-links']}>
                                <a href="#" className={styles['social-link']}>
                                    <i className='ri-linkedin-fill' />
                                </a>
                                <a href="#" className={styles['social-link']}>
                                    <i className='ri-twitter-fill' />
                                </a>
                            </div>
                        </div>
                        <div className={styles['team-card']}>
                            <div className={styles['team-avatar']}>
                                <img src="./edo (3).jpg" alt="" />
                            </div>
                            <h3>Sarah Johnson</h3>
                            <div className={styles['position']}>Chief Technology Officer</div>
                            <div className={styles['social-links']}>
                                <a href="#" className={styles['social-link']}>
                                    <i className='ri-linkedin-fill' />
                                </a>
                                <a href="#" className={styles['social-link']}>
                                    <i className='ri-twitter-fill' />
                                </a>
                            </div>
                        </div>
                        <div className={styles['team-card']}>
                            <div className={styles['team-avatar']}>
                                <img src="./edo (4).jpg" alt="" />
                            </div>
                            <h3>Michael Chen</h3>
                            <div className={styles['position']}>Head of Design</div>
                            <div className={styles['social-links']}>
                                <a href="#" className={styles['social-link']}>
                                    <i className='ri-linkedin-fill' />
                                </a>
                                <a href="#" className={styles['social-link']}>
                                    <i className='ri-twitter-fill' />
                                </a>
                            </div>
                        </div>
                        <div className={styles['team-card']}>
                            <div className={styles['team-avatar']}>
                                <img src="./edo (2).jpg" alt="" />
                            </div>
                            <h3>Emily Brown</h3>
                            <div className={styles['position']}>Head of Operations</div>
                            <div className={styles['social-links']}>
                                <a href="#" className={styles['social-link']}>
                                    <i className='ri-linkedin-fill' />
                                </a>
                                <a href="#" className={styles['social-link']}>
                                    <i className='ri-twitter-fill' />
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Values Section */}
                <section className={styles['values-section']}>
                    <div className={styles['value-card']}>
                        <div className={styles['value-icon']}>
                            <i className='ri-leaf-line' />
                        </div>
                        <h3>Sustainability</h3>
                        <p>
                            We're committed to reducing carbon emissions and creating a cleaner
                            future through innovative electric vehicle technology.
                        </p>
                    </div>
                    <div className={styles['value-card']}>
                        <div className={styles['value-icon']}>
                            <i className='ri-rocket-line' />
                        </div>
                        <h3>Innovation</h3>
                        <p>
                            Our cutting-edge technology and continuous research push the boundaries
                            of what's possible in electric mobility.
                        </p>
                    </div>
                    <div className={styles['value-card']}>
                        <div className={styles['value-icon']}>
                            <i className='ri-heart-line' />
                        </div>
                        <h3>Customer First</h3>
                        <p>
                            We prioritize our customers' needs and satisfaction, providing
                            exceptional service and support at every step.
                        </p>
                    </div>
                </section>
                {/* Contact Section */}
                <section className={styles['contact-section']}>
                    <h2>Let's Build the Future Together</h2>
                    <p>
                        Have questions or want to learn more about our electric vehicles? We'd
                        love to hear from you.
                    </p>
                    <Link to="/ContectUs">
                        <button className={styles['contact-button']}>
                            <i className='ri-mail-line' />
                            About
                        </button>
                    </Link>
                </section>
            </main>
            <Footer />
        </>
    )
}
