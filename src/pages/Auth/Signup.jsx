import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserProvider"; // Import UserContext
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import styles from "./css/Singup.module.css";

export default function Signup() {
    const { setUser, setIsLoggedIn } = useContext(UserContext); // Access context
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        termsAccepted: true
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const [passwordVisibility, setPasswordVisibility] = useState({
        password: false,
        confirmPassword: false
    });

    const [validations, setValidations] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });

    const validatePassword = (password) => {
        setValidations({
            length: /.{8,}/.test(password),
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[!@#$%^&*]/.test(password)
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedFormData = { ...formData, [name]: type === "checkbox" ? checked : value };
        setFormData(updatedFormData);
        
        if (name === "password") {
            validatePassword(value);
        }
    };

    const togglePassword = (field) => {
        setPasswordVisibility((prev) => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!formData.termsAccepted) {
            setError("You must accept the terms to continue.");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/v1/user/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                credentials: "include"
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || "Signup failed");
            }

            // Store user info in Context after successful signup
            setUser(data.user); // Assuming `data.user` contains user info
            setIsLoggedIn(true);

            navigate("/"); // Redirect to home page
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Nav />
            <main className={styles["signup-main"]}>
                <div className={styles["signup-container"]}>
                    <div className={styles["signup-welcome"]}>
                        <h1>Create Your Account</h1>
                        <p>Join our community of electric vehicle enthusiasts</p>
                    </div>

                    {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

                    <form className={styles["signup-form"]} onSubmit={handleSubmit}>
                        <div className={styles["form-row"]}>
                            <div className={styles["form-group"]}>
                                <label htmlFor="firstName"><i className="ri-user-line" /> First Name</label>
                                <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
                            </div>
                            <div className={styles["form-group"]}>
                                <label htmlFor="lastName"><i className="ri-user-line" /> Last Name</label>
                                <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className={styles["form-group"]}>
                            <label htmlFor="email"><i className="ri-mail-line" /> Email Address</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className={styles["form-group"]}>
                            <label htmlFor="phone"><i className="ri-phone-line" /> Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
                        </div>

                        <div className={styles["form-row"]}>
                            <div className={styles["form-group"]}>
                                <label htmlFor="password"><i className="ri-lock-line" /> Password</label>
                                <div className={styles["password-container"]}>
                                    <input
                                        type={passwordVisibility.password ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        placeholder="Create password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <i className={passwordVisibility.password ? "ri-eye-off-line" : "ri-eye-line"} onClick={() => togglePassword("password")} />
                                </div>
                            </div>
                            <div className={styles["form-group"]}>
                                <label htmlFor="confirmPassword"><i className="ri-lock-line" /> Confirm Password</label>
                                <div className={styles["password-container"]}>
                                    <input
                                        type={passwordVisibility.confirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        placeholder="Confirm password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <i className={passwordVisibility.confirmPassword ? "ri-eye-off-line" : "ri-eye-line"} onClick={() => togglePassword("confirmPassword")} />
                                </div>
                            </div>
                        </div>

                        <div className={styles["password-requirements"]}>
                            <h4>Password Requirements:</h4>
                            <ul>
                                <li className={validations.length ? styles.valid : ""}>At least 8 characters</li>
                                <li className={validations.uppercase ? styles.valid : ""}>One uppercase letter</li>
                                <li className={validations.lowercase ? styles.valid : ""}>One lowercase letter</li>
                                <li className={validations.number ? styles.valid : ""}>One number</li>
                                <li className={validations.special ? styles.valid : ""}>One special character</li>
                            </ul>
                        </div>

                        <div className={styles["form-group"]}>
                            <label className={styles["checkbox-label"]}>
                                <input type="checkbox" required name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                                <span className={styles["checkmark"]} /> I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                            </label>
                        </div>

                        <button type="submit" className={styles["btn-signup"]} disabled={loading}>
                            <i className="ri-user-add-line" /> {loading ? "Signing up..." : "Create Account"}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
