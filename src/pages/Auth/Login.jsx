import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserProvider"; 
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import styles from "./css/Login.module.css";

export default function Login() {
    const { setUser, setIsLoggedIn } = useContext(UserContext); 
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false,
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/v1/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include",
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Store token based on Remember Me preference
            if (formData.rememberMe) {
                localStorage.setItem("userToken", data.token);
            } else {
                sessionStorage.setItem("userToken", data.token);
            }

            // Update context to reflect the logged-in user
            setUser(data.user); // Assuming `data.user` contains user info
            setIsLoggedIn(true);

            navigate("/"); // Redirect to home page on success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />
            <main className={styles["login-main"]}>
                <div className={styles["login-container"]}>
                    <div className={styles["login-welcome"]}>
                        <h1>Welcome Back</h1>
                        <p>Enter your credentials to access your account</p>
                    </div>

                    {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

                    <form className={styles["login-form"]} onSubmit={handleSubmit}>
                        <div className={styles["form-group"]}>
                            <label htmlFor="email">
                                <i className="ri-mail-line" /> Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className={styles["form-group"]}>
                            <label htmlFor="password">
                                <i className="ri-lock-line" /> Password
                            </label>
                            <div className={styles["password-input"]}>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles["form-options"]}>
                            <label className={styles["remember-me"]}>
                                <input type="checkbox" name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />
                                <span className={styles["checkmark"]} /> Remember me
                            </label>
                            <a href="#" className={styles["forgot-password"]}>Forgot Password?</a>
                        </div>

                        <button type="submit" className={styles["btn-login"]} disabled={loading}>
                            <i className="ri-login-circle-line" /> {loading ? "Signing in..." : "Sign In"}
                        </button>

                        <div className={styles["social-login"]}>
                            <p>Or continue with</p>
                            <div className={styles["social-buttons"]}>
                                <button type="button" className={styles["social-btn"]}>
                                    <i className="ri-google-fill" />
                                </button>
                                <button type="button" className={styles["social-btn"]}>
                                    <i className="ri-facebook-fill" />
                                </button>
                                <button type="button" className={styles["social-btn"]}>
                                    <i className="ri-apple-fill" />
                                </button>
                            </div>
                        </div>

                        <p className={styles["signup-link"]}>
                            Don't have an account? <a href="#">Sign up now</a>
                        </p>
                    </form>
                </div>

                <div className={styles["login-feature"]}>
                    <img src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/home.png" alt="Porsche Mission E" className={styles["feature-image"]} />
                    <div className={styles["feature-content"]}>
                        <h2>Experience Luxury</h2>
                        <p>Join our community of luxury electric vehicle enthusiasts</p>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
}
