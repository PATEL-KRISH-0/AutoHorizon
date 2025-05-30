import styles from './css/footer.module.css';

function Footer() {
    return (
        <footer className={styles['footer']}>
            <div className={styles['footer__container']}>
                <div className={styles['footer__group']}>
                    <div className={styles['footer__logo']}>
                        <i className="ri-steering-2-line"></i>
                        <span>AutoTrader Hub</span>
                    </div>
                    <p className={styles['footer__description']}>
                        Buy and sell cars with ease. Find the best deals on new and used vehicles. Your trusted car marketplace!
                    </p>
                </div>

                <div className={styles['footer__group']}>
                    <h3 className={styles['footer__title']}>Company</h3>
                    <div className={styles['footer__links']}>
                        <a href="#" className={styles['footer__link']}>About Us</a>
                        <a href="#" className={styles['footer__link']}>How It Works</a>
                        <a href="#" className={styles['footer__link']}>Why Choose Us</a>
                        <a href="#" className={styles['footer__link']}>Contact</a>
                    </div>
                </div>

                <div className={styles['footer__group']}>
                    <h3 className={styles['footer__title']}>Quick Links</h3>
                    <div className={styles['footer__links']}>
                        <a href="#" className={styles['footer__link']}>Sell Your Car</a>
                        <a href="#" className={styles['footer__link']}>Browse Listings</a>
                        <a href="#" className={styles['footer__link']}>Financing Options</a>
                        <a href="#" className={styles['footer__link']}>FAQs</a>
                    </div>
                </div>

                <div className={styles['footer__group']}>
                    <h3 className={styles['footer__title']}>Follow Us</h3>
                    <div className={styles['footer__social']}>
                        <a href="#" className={styles['footer__social-link']}>
                            <i className='ri-facebook-fill'></i>
                        </a>
                        <a href="#" className={styles['footer__social-link']}>
                            <i className='ri-instagram-line'></i>
                        </a>
                        <a href="#" className={styles['footer__social-link']}>
                            <i className='ri-twitter-line'></i>
                        </a>
                        <a href="#" className={styles['footer__social-link']}>
                            <i className='ri-linkedin-fill'></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
