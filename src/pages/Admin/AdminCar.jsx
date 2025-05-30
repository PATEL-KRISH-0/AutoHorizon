import React, { useState, useEffect } from 'react';
import Nav from './AdminNav';
import Footer from '../../components/Footer';
import styles from './css/AdminCar.module.css';

export default function AdminCar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({});
  // State for car data, loading, error, and pagination
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // number of cars per page

  // Modal Handling
  const [selectedCar, setSelectedCar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  // New modal for auction details
  const [showAuctionModal, setShowAuctionModal] = useState(false);
  const [auctionTime, setAuctionTime] = useState(""); // expected format "HH:MM"
  const triggerRefresh = () => setRefreshKey(prevKey => prevKey + 1);

  // Fetch car data from API with pagination and filters
  useEffect(() => {
    const fetchCars = async () => {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: limit,
        ...appliedFilters
      }).toString();

      try {
        const response = await fetch(`http://localhost:3000/api/v1/car/?${queryParams}`, {
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch car data');
        const data = await response.json();
        setCarData(data.data.documents);
        setTotalPages(data.data.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, [currentPage, refreshKey, appliedFilters]);

  // Calculate dynamic stats from carData
  const totalCarsCount = carData.length;
  const activeListingsCount = carData.filter(
    car => car.status && car.status.toLowerCase() === 'accepted'
  ).length;
  const pendingReviewCount = carData.filter(
    car => car.status && car.status.toLowerCase() === 'pending'
  ).length;
  const soldCarsCount = carData.filter(
    car => car.status && car.status.toLowerCase() === 'sold'
  ).length;

  // New filter handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setAppliedFilters({
      search: searchQuery,
      status: selectedStatus,
      dateRange: selectedDateRange,
      sort: selectedSort
    });
    setCurrentPage(1);
  };

  // Reset filters
  const handleReset = (e) => {
    e.preventDefault();
    setSearchQuery('');
    setSelectedStatus('');
    setSelectedDateRange('');
    setSelectedSort('');
    setAppliedFilters({});
    setCurrentPage(1);
  };

  // Modal Functions
  const openModal = (car) => {
    setSelectedCar(car);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCar(null);
    setShowModal(false);
  };

  // Auction Modal Functions
  const openAuctionModal = (car) => {
    setSelectedCar(car);
    setShowAuctionModal(true);
  };

  const closeAuctionModal = () => {
    setSelectedCar(null);
    setShowAuctionModal(false);
    setAuctionTime("");
  };

  // Admin Action Handlers
  const handleAccept = async (car) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/car/${car._id}/accept`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to accept car');
      alert(`Car ${car.brand} ${car.model} accepted.`);
      triggerRefresh();
    } catch (error) {
      console.error("Error accepting car:", error);
      alert("Error accepting car");
    }
  };

  const handleReject = async (car) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/car/${car._id}/reject`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to reject car');
      alert(`Car ${car.brand} ${car.model} rejected.`);
      triggerRefresh();
    } catch (error) {
      console.error("Error rejecting car:", error);
      alert("Error rejecting car");
    }
  };

  // Instead of directly starting auction, we now open a modal for auction details.
  const handleAuctionSubmit = async (event) => {
    event.preventDefault();
    // Validate auctionTime format "HH:MM" and ensure time is between 06:00 and 18:00
    const [hour] = auctionTime.split(':').map(Number);
    if (hour < 6 || hour >= 18) {
      alert("Auction start time must be between 06:00 and 18:00.");
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/v1/car/${selectedCar._id}/startauction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ auctionTime })
      });
      if (!response.ok) throw new Error('Failed to start auction');
      alert(`Auction started for car ${selectedCar.brand} ${selectedCar.model}.`);
      closeAuctionModal();
      triggerRefresh();
    } catch (error) {
      console.error("Error starting auction:", error);
      alert("Error starting auction");
    }
  };

  const handleEdit = (car) => {
    alert(`Edit car ${car.brand} ${car.model} (Not implemented)`);
  };

  const handleDelete = async (car) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/car/${car._id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to delete car');
      alert(`Car ${car.brand} ${car.model} deleted.`);
      setCarData(carData.filter(item => item._id !== car._id));
      triggerRefresh();
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Error deleting car");
    }
  };

  // Pagination Handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <Nav />
      <main className={styles['admin-main']}>
        {/* Admin Header */}
        <div className={styles['admin-header']}>
          <h1>Car Management</h1>
          <p>Manage and monitor vehicle listings</p>
          <div className={styles['admin-stats']}>
            <div className={styles['stat-card']}>
              <i className="ri-car-line" />
              <div className={styles['stat-info']}>
                <h3>Total Cars</h3>
                <p>{totalCarsCount}</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <i className="ri-checkbox-circle-line" />
              <div className={styles['stat-info']}>
                <h3>Active Listings</h3>
                <p>{activeListingsCount}</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <i className="ri-time-line" />
              <div className={styles['stat-info']}>
                <h3>Pending Review</h3>
                <p>{pendingReviewCount}</p>
              </div>
            </div>
            <div className={styles['stat-card']}>
              <i className="ri-money-dollar-circle-line" />
              <div className={styles['stat-info']}>
                <h3>Sold Cars</h3>
                <p>{soldCarsCount}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles['search-section']}>
          <form className={styles['search-form']} onSubmit={handleSearchSubmit}>
            <div className={styles['search-group']}>
              <i className="ri-search-line" />
              <input
                type="text"
                placeholder="Search brand, model, VIN"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className={styles['search-group']}>
              <i className="ri-sort-desc" />
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="-createdAt">Newest First</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="-year">Year: Newest</option>
                <option value="year">Year: Oldest</option>
              </select>
            </div>
            <div className={styles['search-buttons']}>
              <button type="submit" className={`btn btn-primary`.split(" ").map(cls => styles[cls]).join(" ")}>
                <i className="ri-search-line" />
                Search
              </button>
              <button type="reset" className={`btn btn-secondary`.split(" ").map(cls => styles[cls]).join(" ")} onClick={handleReset}>
                <i className="ri-refresh-line" />
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* Cars Table */}
        {!loading && !error && (
          <div className={styles['cars-table-container']}>
            <table className={styles['cars-table']}>
              <thead>
                <tr>
                  <th>Car Details</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Added Date</th>
                  <th>Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {carData.map((car) => (
                  <tr key={car._id}>
                    <td>
                      <div className={styles['car-info']}>
                        <img src={`http://localhost:3000/images/cars/` + car.images.thumbnails[0].src} className={styles['car-image']} />
                        <div className={styles['car-details']}>
                          <h4>{car.brand} {car.model}</h4>
                          <span>#{car._id}</span>
                        </div>
                      </div>
                    </td>
                    <td>${car.price.toLocaleString()}</td>
                    <td>
                      <span className={`${styles['status-badge']} ${styles[car.status.toLowerCase()]}`}>
                        {car.status}
                      </span>
                    </td>
                    <td>{car.createdAt || "N/A"}</td>
                    <td>{car.updatedAt || "N/A"}</td>
                    <td>
                      <div className={styles["action-buttons"]}>
                        <button className={`${styles["action-btn"]} ${styles["view"]}`} title="View Details" onClick={() => openModal(car)}>
                          <i className="ri-eye-line"></i>
                        </button>
                        <button className={`${styles["action-btn"]} ${styles["edit"]}`} title="Edit Car" onClick={() => handleEdit(car)}>
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className={`${styles["action-btn"]} ${styles["delete"]}`} title="Delete Car" onClick={() => handleDelete(car)}>
                          <i className="ri-delete-bin-line"></i>
                        </button>
                        <button className={`${styles["action-btn"]} ${styles["accept"]}`} title="Accept Car" onClick={() => handleAccept(car)}>
                          <i className="ri-checkbox-circle-line"></i>
                        </button>
                        <button className={`${styles["action-btn"]} ${styles["reject"]}`} title="Reject Car" onClick={() => handleReject(car)}>
                          <i className="ri-close-circle-line"></i>
                        </button>
                        <button className={`${styles["action-btn"]} ${styles["auction"]}`} title="Start Auction" onClick={() => openAuctionModal(car)}>
                          <i className="ri-auction-line"></i>
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
          <button className={styles["page-btn"]} onClick={goToPrevPage} disabled={currentPage === 1}>
            <i className="ri-arrow-left-s-line" />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`${styles["page-btn"]} ${currentPage === index + 1 ? styles["active"] : ""}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button className={styles["page-btn"]} onClick={goToNextPage} disabled={currentPage === totalPages}>
            <i className="ri-arrow-right-s-line" />
          </button>
        </div>

        {/* Auction Modal */}
        {showAuctionModal && selectedCar && (
          <div className={styles['modal']}>
            <div className={styles['modal-content']}>
              <div className={styles['modal-header']}>
                <h2>Start Auction for {selectedCar.brand} {selectedCar.model}</h2>
                <button className={styles['close-modal']} onClick={closeAuctionModal}>
                  <i className="ri-close-line" />
                </button>
              </div>
              <form onSubmit={handleAuctionSubmit} className={styles['auction-form']}>
                <div className={styles['form-group']}>
                  <label htmlFor="auctionTime">
                    Auction Start Time (Daytime only)
                  </label>
                  <input
                    type="time"
                    id="auctionTime"
                    value={auctionTime}
                    min="06:00"
                    max="18:00"
                    onChange={(e) => setAuctionTime(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles['btn-submit']}>
                  <i className="ri-auction-line"></i> Start Auction
                </button>
              </form>
            </div>
          </div>
        )}

        {/* View Car Modal */}
        {showModal && selectedCar && (
          <div className={styles['modal']}>
            <div className={styles['modal-content']}>
              <div className={styles['modal-header']}>
                <h2>{selectedCar.brand} {selectedCar.model}</h2>
                <button className={styles['close-modal']} onClick={closeModal}>
                  <i className="ri-close-line" />
                </button>
              </div>
              <div className={styles['car-details-content']}>
                <img src={selectedCar.images?.main} alt="Car" className={styles['car-gallery']} />
                <div className={styles['car-info-grid']}>
                  <div className={styles['info-group']}>
                    <label>Brand & Model:</label>
                    <p>{selectedCar.brand} {selectedCar.model}</p>
                  </div>
                  <div className={styles['info-group']}>
                    <label>Year:</label>
                    <p>{selectedCar.year}</p>
                  </div>
                  <div className={styles['info-group']}>
                    <label>Price:</label>
                    <p>${selectedCar.price.toLocaleString()}</p>
                  </div>
                  <div className={styles['info-group']}>
                    <label>Status:</label>
                    <p>{selectedCar.status}</p>
                  </div>
                  <div className={styles['info-group']}>
                    <label>Drivetrain:</label>
                    <p>{selectedCar.drivetrain}</p>
                  </div>
                  <div className={styles['info-group']}>
                    <label>Fuel Type:</label>
                    <p>{selectedCar.fuelType}</p>
                  </div>
                  <div className={styles['info-group']}>
                    <label>Mileage:</label>
                    <p>{selectedCar.mileage}</p>
                  </div>
                  <div className={styles['info-group']}>
                    <label>Transmission:</label>
                    <p>{selectedCar.transmission}</p>
                  </div>
                  <div className={styles['info-group']}>
                    <label>Seller:</label>
                    <p>{selectedCar.seller?.name}</p>
                  </div>
                  <div className={styles['info-group']}>
                    <label>Bid History:</label>
                    {selectedCar.bidHistory && selectedCar.bidHistory.length > 0 ? (
                      <ul>
                        {selectedCar.bidHistory.map((bid, idx) => (
                          <li key={idx}>
                            {bid.user} bid ${bid.amount} ({bid.time})
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No bids available</p>
                    )}
                  </div>
                </div>
                <div className={styles['car-description']}>
                  <h3>Description</h3>
                  <p>{selectedCar.description || "No description available."}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
