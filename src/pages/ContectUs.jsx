import React, { useState } from 'react';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function MyMap() {
  return (
    <MapContainer
      center={[21.1702, 72.8311]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[21.1702, 72.8311]}>
        <Popup>We are in Surat, India!</Popup>
      </Marker>
    </MapContainer>
  );
}
import styles from './css/ContectUs.module.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function ContectUs() {
    

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [responseMessage, setResponseMessage] = useState(null);
    const [error, setError] = useState(null);

    // Handle changes for controlled inputs
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    // Handle form submission and send data to server
    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage(null);
        setError(null);
        try {
            const res = await fetch('http://localhost:3000/api/v1/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);

            if (!res.ok) {
                setError(data.message || 'Something went wrong');
            } else {
                setResponseMessage(data.message || 'Message sent successfully!');
                // Clear form fields
                setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
            }
        } catch (err) {
            setError(err.message);
        }
    };

    // Optional: Toggle FAQ answer visibility (using simple state per FAQ)
    const [openFAQ, setOpenFAQ] = useState(null);
    const toggleFAQ = (index) => {
        console.log(index);
        
        setOpenFAQ(openFAQ === index ? null : index);
    };
    


    return (
        <>
            <Nav />
            <main className={styles['contact-main']}>
                {/* Hero Section */}
                <section className={styles['contact-hero']}>
                    <h1>Get in Touch</h1>
                    <p>
                        Have questions about our electric vehicles? We're here to help you find your
                        perfect ride.
                    </p>
                </section>
                {/* Contact Grid */}
                <div className={styles['contact-grid']}>
                    {/* Contact Info */}
                    <div className={styles['contact-info']}>
                        <div className={styles['info-section']}>
                            <h3>
                                <i className="ri-map-pin-line" />
                                Visit Us
                            </h3>
                            <div className={styles['info-item']}>
                                <div className={styles['info-icon']}>
                                    <i className="ri-building-line" />
                                </div>
                                <div className={styles['info-content']}>
                                    <h4>Headquarters</h4>
                                    <p>
                                        123 SURAT
                                        <br />
                                        SURAT CITY, pin - 395003
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles['info-section']}>
                            <h3>
                                <i className="ri-customer-service-line" />
                                Contact Info
                            </h3>
                            <div className={styles['info-item']}>
                                <div className={styles['info-icon']}>
                                    <i className="ri-phone-line" />
                                </div>
                                <div className={styles['info-content']}>
                                    <h4>Phone</h4>
                                    <p>+91 9898989898</p>
                                </div>
                            </div>
                            <div className={styles['info-item']}>
                                <div className={styles['info-icon']}>
                                    <i className="ri-mail-line" />
                                </div>
                                <div className={styles['info-content']}>
                                    <h4>Email</h4>
                                    <p>info@AutoHorizon.com</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles['info-section']}>
                            <h3>
                                <i className="ri-links-line" />
                                Follow Us
                            </h3>
                            <div className={styles['social-links']}>
                                <a href="#" className={styles['social-link']}>
                                    <i className="ri-facebook-fill" />
                                </a>
                                <a href="#" className={styles['social-link']}>
                                    <i className="ri-twitter-fill" />
                                </a>
                                <a href="#" className={styles['social-link']}>
                                    <i className="ri-instagram-fill" />
                                </a>
                                <a href="#" className={styles['social-link']}>
                                    <i className="ri-linkedin-fill" />
                                </a>
                            </div>
                        </div>
                    </div>
                    {/* Contact Form */}
                    <div className={styles['contact-form']}>
                        <div className={styles['form-header']}>
                            <h2>Send Us a Message</h2>
                            <p>
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className={styles['form-grid']}>
                                <div className={styles['form-group']}>
                                    <label htmlFor="firstName">
                                        <i className="ri-user-line" />
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles['form-group']}>
                                    <label htmlFor="lastName">
                                        <i className="ri-user-line" />
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles['form-grid']}>
                                <div className={styles['form-group']}>
                                    <label htmlFor="email">
                                        <i className="ri-mail-line" />
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className={styles['form-group']}>
                                    <label htmlFor="phone">
                                        <i className="ri-phone-line" />
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="subject">
                                    <i className="ri-question-line" />
                                    Subject
                                </label>
                                <select
                                    id="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a subject</option>
                                    <option value="sales">Sales Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="test-drive">Schedule Test Drive</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className={styles['form-group']}>
                                <label htmlFor="message">
                                    <i className="ri-message-2-line" />
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className={styles['btn-submit']}>
                                <i className="ri-send-plane-line" />
                                Send Message
                            </button>
                        </form>
                        {responseMessage && <p style={{ color: 'green' }}>{responseMessage}</p>}
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </div>
                </div>
                {/* Map Section */}
                <section className={styles['map-section']}>
                    <div className={styles['map-container']}>
                        <div className={styles['map-overlay']}>
                            <MyMap/>
                        </div>
                    </div>
                </section>
                {/* FAQ Section */}
                <section className={styles['faq-section']}>
                    <div className={styles['faq-header']}>
                        <h2>Frequently Asked Questions</h2>
                        <p>
                            Find quick answers to common questions about our electric vehicles and
                            services.
                        </p>
                    </div>
                    <div className={styles['faq-grid']}>
                        {[
                            {
                                question: 'How can I schedule a test drive?',
                                answer:
                                    "You can schedule a test drive through our website by filling out the contact form above or by calling our sales team directly. We'll work with you to find a convenient time and location."
                            },
                            {
                                question: 'What charging options are available?',
                                answer:
                                    'Our vehicles are compatible with all standard charging networks. We also offer home charging solutions and can help you set up the perfect charging system for your needs.'
                            },
                            {
                                question: 'What warranty coverage is included?',
                                answer:
                                    'All our vehicles come with a comprehensive warranty package including 4-year/50,000-mile basic coverage and 8-year/100,000-mile battery coverage.'
                            }
                        ].map((faq, index) => (
                            <div key={index} className={styles['faq-item']}>
                                <div
                                    className={styles['faq-question']}
                                    onClick={() => toggleFAQ(index)}
                                >
                                    <span>{faq.question}</span>
                                    <i className="ri-arrow-down-s-line" />
                                </div>
                                {openFAQ === index && (
                                    <div className={styles['faq-answer']}>{faq.answer}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
