import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Get token from URL
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import styles from "./css/PasswordPage.module.css"
import { useSearchParams } from 'react-router-dom';;

export default function ResetPassword() {
    // const { token } = useParams(); // Get reset token from URL
    const [searchParams] = useSearchParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = searchParams.get('token'); 
    const handleResetPassword = async (event) => {
        event.preventDefault();
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`http://localhost:3000/api/v1/user/resetPassword/${token}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.status === "success") {
                setMessage("Password reset successfully! Redirecting to login...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setMessage("Failed to reset password. Try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred. Please try again.");
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
                        <i className="ri-lock-line" />
                        <h1>Reset Password</h1>
                        <p>Create a new password for your account</p>
                    </div>
                    <form className={styles["password-form"]} onSubmit={handleResetPassword}>
                        <div className={styles["form-group"]}>
                            <label htmlFor="password">
                                <i className="ri-lock-line" />
                                New Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter new password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="confirmPassword">
                                <i className="ri-lock-line" />
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm new password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {message && <p className={styles["error-message"]}>{message}</p>}
                        <button type="submit" className={styles["btn-submit"]} disabled={loading}>
                            <i className="ri-lock-unlock-line" />
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                </div>
                <div className={styles["password-feature"]}>
                    <img
                        src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/featured3.png"
                        alt="Security Feature"
                        className={styles["feature-image"]}
                    />
                    <div className={styles["feature-content"]}>
                        <h2>Strong Password</h2>
                        <p>Create a strong password to keep your account secure</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
