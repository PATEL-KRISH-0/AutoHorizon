import React from 'react'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import styles from './css/PrivacyPolicy.module.css';

export default function PrivacyPolicy() {
    return (
        <>
            <Nav />
            <main className={styles['privacy-main']}>
                {/* Hero Section */}
                <section className={styles['privacy-hero']}>
                    <h1>Privacy Policy</h1>
                    <p>
                        At Elecar, we take your privacy seriously. This policy outlines how we
                        collect, use, and protect your personal information.
                    </p>
                </section>
                {/* Privacy Content */}
                <div className={styles['privacy-content']}>
                    {/* Introduction */}
                    <section className={styles['privacy-section']}>
                        <h2>
                            <i className="ri-shield-line" />
                            Introduction
                        </h2>
                        <p>
                            This Privacy Policy explains how Elecar ("we", "us", or "our") collects,
                            uses, and protects your personal information when you use our website
                            and services. By using our services, you agree to the collection and use
                            of information in accordance with this policy.
                        </p>
                    </section>
                    {/* Information Collection */}
                    <section className={styles['privacy-section']}>
                        <h2>
                            <i className="ri-file-list-3-line" />
                            Information We Collect
                        </h2>
                        <p>
                            We collect several types of information for various purposes to provide
                            and improve our service to you:
                        </p>
                        <ul>
                            <li>
                                Personal identification information (Name, email address, phone
                                number)
                            </li>
                            <li>Vehicle preferences and browsing history</li>
                            <li>Payment information for transactions</li>
                            <li>Usage data and analytics</li>
                        </ul>
                        <div className={styles['info-box']}>
                            <h4>
                                <i className="ri-information-line" />
                                Important Note
                            </h4>
                            <p>
                                We never collect more information than is necessary to provide our
                                services, and we never share your personal information with third
                                parties without your explicit consent.
                            </p>
                        </div>
                    </section>
                    {/* Data Usage */}
                    <section className={styles['privacy-section']}>
                        <h2>
                            <i className="ri-database-2-line" />
                            How We Use Your Data
                        </h2>
                        <table className={styles['privacy-table']}>
                            <thead>
                                <tr>
                                    <th>Data Type</th>
                                    <th>Purpose</th>
                                    <th>Retention Period</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Personal Information</td>
                                    <td>Account management, communication</td>
                                    <td>Until account deletion</td>
                                </tr>
                                <tr>
                                    <td>Vehicle Preferences</td>
                                    <td>Personalized recommendations</td>
                                    <td>2 years</td>
                                </tr>
                                <tr>
                                    <td>Payment Information</td>
                                    <td>Transaction processing</td>
                                    <td>As required by law</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    {/* Security */}
                    <section className={styles['privacy-section']}>
                        <h2>
                            <i className="ri-lock-line" />
                            Data Security
                        </h2>
                        <p>
                            We implement strong security measures to protect your personal
                            information:
                        </p>
                        <ul>
                            <li>End-to-end encryption for all sensitive data</li>
                            <li>Regular security audits and updates</li>
                            <li>Strict access controls and authentication</li>
                            <li>Compliance with industry security standards</li>
                        </ul>
                    </section>
                    {/* Your Rights */}
                    <section className={styles['privacy-section']}>
                        <h2>
                            <i className="ri-user-settings-line" />
                            Your Rights
                        </h2>
                        <p>You have several rights regarding your personal data:</p>
                        <ul>
                            <li>Right to access your personal data</li>
                            <li>Right to correct inaccurate data</li>
                            <li>Right to delete your data</li>
                            <li>Right to withdraw consent</li>
                            <li>Right to data portability</li>
                        </ul>
                    </section>
                    {/* Contact Information */}
                    <section className={styles['privacy-section']}>
                        <h2>
                            <i className="ri-customer-service-2-line" />
                            Contact Us
                        </h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us:
                        </p>
                        <div className={styles['contact-info']}>
                            <i className="ri-mail-line" />
                            <a href="mailto:privacy@elecar.com">privacy@elecar.com</a>
                        </div>
                        <div className={styles['contact-info']}>
                            <i className="ri-phone-line" />
                            <a href="tel:+1-555-123-4567">+1 (555) 123-4567</a>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    )
}
