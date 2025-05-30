import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after success
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import styles from "./css/PasswordPage.module.css";

export default function ForgetPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Hook to redirect user

    const handleForgotPassword = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/api/v1/user/forgetpassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.status === "success") {
                setMessage(data.message);
                setTimeout(() => {
                    navigate(`/ResetPssword/?token=${data.resetToken}`); // Redirect to reset password page
                }, 2000);
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Failed to send reset link. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />
            <main className={styles["password-main"]}>
                <div className={styles["password-container"]}>
                    <div className={styles["password-welcome"]}>
                        <i className="ri-lock-unlock-line" />
                        <h1>Forgot Password?</h1>
                        <p>
                            Enter your email address and we'll send you instructions to reset your
                            password.
                        </p>
                    </div>
                    <form className={styles["password-form"]} onSubmit={handleForgotPassword}>
                        <div className={styles["form-group"]}>
                            <label htmlFor="email">
                                <i className="ri-mail-line" />
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type="submit" className={styles["btn-submit"]} disabled={loading}>
                            <i className="ri-mail-send-line" />
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                        {message && <p className={styles["success-message"]}>{message}</p>}
                        <p className={styles["back-link"]}>
                            Remember your password? <a href="/login">Back to Login</a>
                        </p>
                    </form>
                </div>
                <div className={styles["password-feature"]}>
                    <img
                        src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/featured2.png"
                        alt="Security Feature"
                        className={styles["feature-image"]}
                    />
                    <div className={styles["feature-content"]}>
                        <h2>Account Security</h2>
                        <p>
                            We take your account security seriously. Follow the steps to safely
                            reset your password.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
