import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import styles from './css/Otp.module.css';

export default function Otp() {
    return (
        <>
            <Nav />
            <main className={styles['otp-main']}>
                <div className={styles['otp-container']}>
                    <div className={styles['otp-welcome']}>
                        <i className="ri-shield-check-line" />
                        <h1>Verify Your Email</h1>
                        <p>We've sent a verification code to your email</p>
                        <div className={styles['email-preview']}>user****@example.com</div>
                    </div>
                    <form className={styles['otp-form']} onsubmit="handleOTPVerification(event)">
                        <div className={styles['otp-input-group']}>
                            <input
                                type="text"
                                maxLength={1}
                                pattern="[0-9]"
                                className={styles['otp-input']}
                                required=""
                            />
                            <input
                                type="text"
                                maxLength={1}
                                pattern="[0-9]"
                                className={styles['otp-input']}
                                required=""
                            />
                            <input
                                type="text"
                                maxLength={1}
                                pattern="[0-9]"
                                className={styles['otp-input']}
                                required=""
                            />
                            <input
                                type="text"
                                maxLength={1}
                                pattern="[0-9]"
                                className={styles['otp-input']}
                                required=""
                            />
                            <input
                                type="text"
                                maxLength={1}
                                pattern="[0-9]"
                                className={styles['otp-input']}
                                required=""
                            />
                            <input
                                type="text"
                                maxLength={1}
                                pattern="[0-9]"
                                className={styles['otp-input']}
                                required=""
                            />
                        </div>
                        <div className={styles['timer']}>
                            Code expires in: <span id="countdown">05:00</span>
                        </div>
                        <button type="submit" className={styles['btn-verify']}>
                            <i className="ri-check-line" />
                            Verify Code
                        </button>
                        <div className={styles['resend-code']}>
                            Didn't receive the code?
                            <button
                                type="button"
                                className={styles['btn-resend']}
                                id="resendButton"
                                disabled=""
                            >
                                Resend Code
                            </button>
                        </div>
                        <p className={styles['back-link']}>
                            <a href="login.html">Back to Login</a>
                        </p>
                    </form>
                </div>
                <div className={styles['otp-feature']}>
                    <img
                        src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/featured2.png"
                        alt="Security Verification"
                        className={styles['feature-image']}
                    />
                    <div className={styles['feature-content']}>
                        <h2>Secure Verification</h2>
                        <p>We ensure your account security through multi-factor authentication</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
