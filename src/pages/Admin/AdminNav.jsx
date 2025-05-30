import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminNav = () => {
    const [isDark, setIsDark] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <nav>
            <div className="logo">
                <i className="ri-steering-2-line"></i>
                <span>AutoHorizon</span>
            </div>
            <div className="nav-links">
                <Link to="/adminoverview">Overview</Link>
                <Link to="/adminuser">user</Link>
                <Link to="/admincar">car</Link>
                <Link to="/adminmessage">message</Link>
                <Link to="/carupload">upload</Link>

                <button className="theme-toggle" id="theme-toggle" onClick={() => setIsDark(!isDark)}>
                    <i className={isDark ? "ri-moon-line" : "ri-sun-line"}></i>
                </button>
            </div>
        </nav>
    );
};

export default AdminNav;
