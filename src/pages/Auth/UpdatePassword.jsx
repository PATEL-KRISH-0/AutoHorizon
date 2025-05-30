import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";
import styles from "./css/PasswordPage.module.css";

export default function UpdatePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        setMessage("");

        if (newPassword !== confirmNewPassword) {
            setMessage("New passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/v1/user/updatemypassword", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Ensures cookies/tokens are sent
                body: JSON.stringify({
                    password: currentPassword,
                    newPassword,
                    comPassword: confirmNewPassword,
                }),
            });

            const data = await response.json();

            if (data.status === "success") {
                setMessage("Password updated successfully! Redirecting...");
                setTimeout(() => navigate("/"), 2000);
            } else {
                setMessage(data.message || "Failed to update password.");
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
                        <i className="ri-shield-keyhole-line" />
                        <h1>Update Password</h1>
                        <p>Keep your account secure by updating your password regularly</p>
                    </div>
                    <form className={styles["password-form"]} onSubmit={handleUpdatePassword}>
                        <div className={styles["form-group"]}>
                            <label htmlFor="currentPassword">
                                <i className="ri-lock-line" />
                                Current Password
                            </label>
                            <input
                                type="password"
                                id="currentPassword"
                                placeholder="Enter current password"
                                required
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="newPassword">
                                <i className="ri-lock-line" />
                                New Password
                            </label>
                            <input
                                type="password"
                                id="newPassword"
                                placeholder="Enter new password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className={styles["form-group"]}>
                            <label htmlFor="confirmNewPassword">
                                <i className="ri-lock-line" />
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                id="confirmNewPassword"
                                placeholder="Confirm new password"
                                required
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                            />
                        </div>
                        {message && <p className={styles["error-message"]}>{message}</p>}
                        <button type="submit" className={styles["btn-submit"]} disabled={loading}>
                            <i className="ri-refresh-line" />
                            {loading ? "Updating..." : "Update Password"}
                        </button>
                        <p className={styles["back-link"]}>
                            <a href="/dashboard">Back to Dashboard</a>
                        </p>
                    </form>
                </div>
                <div className={styles["password-feature"]}>
                    <img
                        src="https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/featured1.png"
                        alt="Security Feature"
                        className={styles["feature-image"]}
                    />
                    <div className={styles["feature-content"]}>
                        <h2>Account Security</h2>
                        <p>Regular password updates help keep your account secure</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
