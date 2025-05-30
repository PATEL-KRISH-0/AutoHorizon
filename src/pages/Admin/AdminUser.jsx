import React, { useState, useEffect } from "react";
import Nav from './AdminNav';
import Footer from "../../components/Footer";
import styles from "./css/AdminUser.module.css";

export default function AdminUser() {
  // Data & filter states
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Modal state for viewing user details
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users from backend with filters
  const fetchUsers = async () => {
    setLoading(true);
    const queryParams = new URLSearchParams({
      search: searchQuery,
      status: selectedStatus,
      dateRange: selectedDateRange,
      sort: selectedSort,
      page: currentPage,
      limit,
    }).toString();
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user?${queryParams}`,
        { credentials: "include" }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const data = await response.json();
      console.log(data);
      setUsers(data.data.documents);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Compute stats based on fetched users
  useEffect(() => {
    if (users.length > 0) {
      const totalUsers = users.length;
      const activeUsers = users.filter(
        (user) => user.status && user.status.toLowerCase() === "active"
      ).length;
      const bannedUsers = users.filter(
        (user) => user.status && user.status.toLowerCase() === "banned"
      ).length;
      // Define new users as those created in the last 7 days
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const newUsers = users.filter(
        (user) => new Date(user.createdAt) > sevenDaysAgo
      ).length;
      setStats({ totalUsers, activeUsers, bannedUsers, newUsers });
    } else {
      setStats({ totalUsers: 0, activeUsers: 0, bannedUsers: 0, newUsers: 0 });
    }
  }, [users]);

  // Run fetchUsers when filters change
  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedStatus, selectedDateRange, selectedSort, currentPage]);

  // Filter form handlers
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers();
  };

  const handleReset = (e) => {
    e.preventDefault();
    setSearchQuery("");
    setSelectedStatus("");
    setSelectedDateRange("");
    setSelectedSort("");
    setCurrentPage(1);
  };

  // Modal functions
  function viewUser(user) {
    setSelectedUser(user);
  }

  function closeModal() {
    setSelectedUser(null);
  }

  // Ban user function
  async function banUser(user) {
    if (window.confirm("Ban this user?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/user/${user._id || user.id}/ban`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to ban user");
        }
        alert("User banned successfully");
        closeModal();
        fetchUsers();
      } catch (error) {
        console.error("Error banning user:", error);
        alert("Error banning user");
      }
    }
  }

  // Activate user function
  async function activateUser(user) {
    if (window.confirm("Activate this user?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/user/${user._id || user.id}/activate`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to activate user");
        }
        alert("User activated successfully");
        closeModal();
        fetchUsers();
      } catch (error) {
        console.error("Error activating user:", error);
        alert("Error activating user");
      }
    }
  }

  // Delete user function
  async function deleteUser(user) {
    if (window.confirm("Delete this user permanently?")) {
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/user/${user._id || user.id}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error("Failed to delete user");
        }
        alert("User deleted successfully");
        closeModal();
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user");
      }
    }
  }

  return (
    <>
      <Nav />
      <main className={styles["admin-main"]}>
        <div className={styles["admin-header"]}>
          <h1>User Management</h1>
          <p>Manage and monitor user accounts</p>

          {loading && <p>Loading data...</p>}
          {error && <p className={styles["error-message"]}>{error}</p>}

          {/* Stats Section computed from front end */}
          {!loading && !error && stats && (
            <div className={styles["admin-stats"]}>
              <StatCard title="Total Users" count={stats.totalUsers} icon="ri-user-3-line" />
              <StatCard title="Active Users" count={stats.activeUsers} icon="ri-user-follow-line" />
              <StatCard title="Banned Users" count={stats.bannedUsers} icon="ri-user-unfollow-line" />
              <StatCard title="New Users" count={stats.newUsers} icon="ri-user-add-line" />
            </div>
          )}
        </div>

        {/* Search and Filter Section */}
        <div className={styles["search-section"]}>
          <form className={styles["search-form"]} onSubmit={handleSearchSubmit}>
            <div className={styles["search-group"]}>
              <i className={`ri-search-line`} />
              <input
                type="text"
                placeholder="Search by name, email, or ID"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles["search-group"]}>
              <i className={`ri-filter-3-line`} />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">Account Status</option>
                <option value="active">Active</option>
                <option value="banned">Banned</option>
                <option value="pending">Pending</option>
              </select>
            </div>
            <div className={styles["search-group"]}>
              <i className={`ri-calendar-line`} />
              <select
                value={selectedDateRange}
                onChange={(e) => setSelectedDateRange(e.target.value)}
              >
                <option value="">Registration Date</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
            <div className={styles["search-group"]}>
              <i className={`ri-sort-desc`.split(" ").map((cls) => styles[cls]).join(" ")} />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="date">Date Joined</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className={styles["search-buttons"]}>
              <button
                type="submit"
                className={`btn btn-primary`.split(" ").map((cls) => styles[cls]).join(" ")}
              >
                <i className={`ri-search-line`} />
                Search
              </button>
              <button
                type="reset"
                className={`btn btn-secondary`.split(" ").map((cls) => styles[cls]).join(" ")}
                onClick={handleReset}
              >
                <i className={`ri-refresh-line`} />
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Users Table */}
        {!loading && !error && users.length > 0 && (
          <div className={styles["users-table-container"]}>
            <table className={styles["users-table"]}>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Joined Date</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id || user.id}>
                    <td>
                      <div className={styles["user-info"]}>
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className={styles["user-avatar"]}
                        />
                        <div className={styles["user-details"]}>
                          <h4>{user.name}</h4>
                          <span>#{user._id || user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`${styles["status-badge"]} ${styles[user.status?.toLowerCase()]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleString()}</td>
                    <td>{new Date(user.updatedAt).toLocaleString()}</td>
                    <td>
                      <div className={styles["action-buttons"]}>
                        <button
                          className={styles["action-btn"]}
                          title="View Details"
                          onClick={() => viewUser(user)}
                        >
                          <i className="ri-eye-line" />
                        </button>
                        <button
                          className={styles["action-btn"]}
                          title="Ban User"
                          onClick={() => banUser(user)}
                        >
                          <i className="ri-forbid-line" />
                        </button>
                        <button
                          className={styles["action-btn"]}
                          title="Activate User"
                          onClick={() => activateUser(user)}
                        >
                          <i className="ri-user-follow-line" />
                        </button>
                        <button
                          className={styles["action-btn"]}
                          title="Delete User"
                          onClick={() => deleteUser(user)}
                        >
                          <i className="ri-delete-bin-line" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className={styles["pagination"]}>
          <button
            className={styles["page-btn"]}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <i className={`ri-arrow-left-s-line`} />
          </button>
          <button className={`${styles["page-btn"]} ${styles["active"]}`}>
            {currentPage}
          </button>
          <button
            className={styles["page-btn"]}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <i className={`ri-arrow-right-s-line`} />
          </button>
        </div>
      </main>

      {/* View User Modal */}
      {selectedUser && (
        <div className={styles["modal"]}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <h2>User Details</h2>
              <button className={styles["close-modal"]} onClick={closeModal}>
                <i className="ri-close-line" />
              </button>
            </div>
            <div className={styles["user-details-modal"]}>
              <img
                src={selectedUser.avatar}
                alt={selectedUser.name}
                className={styles["user-avatar"]}
              />
              <div className={styles["user-info"]}>
                <h3>{selectedUser.name}</h3>
                <p>Email: {selectedUser.email}</p>
                <p>Status: {selectedUser.status}</p>
                <p>Joined: {new Date(selectedUser.createdAt).toLocaleString()}</p>
                <p>Last Login: {new Date(selectedUser.updatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

// Reusable StatCard Component
function StatCard({ title, count, icon }) {
  return (
    <div className={styles["stat-card"]}>
      <div className={styles["stat-icon"]}>
        <i className={icon} />
      </div>
      <div className={styles["stat-info"]}>
        <h3>{title}</h3>
        <p>{count}</p>
      </div>
    </div>
  );
}
