import React, { useEffect, useState } from "react";
import Nav from './AdminNav';
import Footer from "../../components/Footer";
import styles from "./css/AdminOverview.module.css";

export default function AdminOverview() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/v1/user/admin/overview", { credentials: "include" });
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                console.log(result);
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p className={styles.loading}>Loading...</p>;
    if (error) return <p className={styles.error}>Error: {error}</p>;

    return (
        <>
            <Nav />
            <main className={styles["overview-main"]}>
                {/* Overview Header */}
                <div className={styles["overview-header"]}>
                    <h1>Dashboard Overview</h1>
                    <p>Welcome back! Here's what's happening with your platform.</p>
                </div>

                {/* Quick Stats */}
                <div className={styles["quick-stats"]}>
                    {data.quickStats.map((stat) => (
                        <div key={stat.id} className={styles["stat-card"]}>
                            <div className={`${styles["stat-icon"]} ${styles[stat.icon]}`}>
                                <i className={stat.icon} />
                            </div>
                            <div className={styles["stat-info"]}>
                                <h3>{stat.title}</h3>
                                <div className={styles["value"]}>{stat.value}</div>
                                <div className={`${styles["stat-trend"]} ${styles[`trend-${stat.trend}`]}`}>
                                    <i className={`ri-arrow-${stat.trend === "up" ? "up" : "down"}-line`} />
                                    <span>{stat.trendValue} vs last month</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Activity */}
                <section className={styles["activity-section"]}>
                    <h2>Recent Activity</h2>
                    <div className={styles["activity-list"]}>
                        {data.recentActivity.map((activity) => (
                            <div key={activity.id} className={styles["activity-item"]}>
                                <div className={`${styles["activity-icon"]} ${styles[activity.type]}`}>
                                    <i className={activity.icon} />
                                </div>
                                <div className={styles["activity-content"]}>
                                    <h4>{activity.title}</h4>
                                    <p>{activity.description}</p>
                                </div>
                                <span className={styles["activity-time"]}>{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Top Selling Cars */}
                <section className={styles["top-sellers-section"]}>
                    <h2>Top Selling Cars</h2>
                    <div className={styles["top-sellers-grid"]}>
                        {data.topSellingCars.map((car) => (
                            <div key={car.id} className={styles["seller-card"]}>
                                <img src={car.image} alt={car.name} />
                                <div className={styles["seller-info"]}>
                                    <h3>{car.name}</h3>
                                    <p>{car.unitsSold} Units Sold</p>
                                    <div className={styles["seller-progress"]}>
                                        <div className={styles["progress-bar"]} style={{ width: car.progress }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Regional Sales Distribution */}
                <section className={styles["regional-sales-section"]}>
                    <h2>Regional Sales Distribution</h2>
                    <div className={styles["map-container"]}>
                        <div className={styles["map-placeholder"]}>
                            <i className="ri-map-pin-line" />
                            <p>Interactive sales map will be displayed here</p>
                        </div>
                        <div className={styles["region-stats"]}>
                            {data.regionalSales.map((region) => (
                                <div key={region.region} className={styles["region-stat"]}>
                                    <h4>{region.region}</h4>
                                    <p>{region.percentage} of Sales</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Support Tickets */}
                <section className={styles["support-section"]}>
                    <h2>Recent Support Tickets</h2>
                    <div className={styles["tickets-list"]}>
                        {data.supportTickets.map((ticket) => (
                            <div key={ticket.id} className={styles["ticket-item"]}>
                                <div className={`${styles["ticket-priority"]} ${styles[ticket.priority.toLowerCase()]}`}>
                                    {ticket.priority}
                                </div>
                                <div className={styles["ticket-content"]}>
                                    <h4>{ticket.title}</h4>
                                    <p>{ticket.description}</p>
                                </div>
                                <div className={styles["ticket-meta"]}>
                                    <span className={styles["ticket-time"]}>{ticket.time}</span>
                                    <button className={styles["btn-resolve"]}>Resolve</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Scheduled Maintenance */}
                <section className={styles["maintenance-section"]}>
                    <h2>Scheduled Maintenance</h2>
                    <div className={styles["maintenance-grid"]}>
                        {data.maintenanceSchedule.map((task) => (
                            <div key={task.id} className={styles["maintenance-card"]}>
                                <div className={styles["maintenance-icon"]}>
                                    <i className={task.icon} />
                                </div>
                                <div className={styles["maintenance-info"]}>
                                    <h3>{task.title}</h3>
                                    <p>{task.description}</p>
                                    <span className={styles["maintenance-time"]}>{task.time}</span>
                                </div>
                                <div className={`${styles["maintenance-status"]} ${styles[task.status.toLowerCase()]}`}>
                                    {task.status}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
