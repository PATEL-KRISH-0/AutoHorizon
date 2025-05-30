import { useState, useEffect, useContext } from "react"; 
import { useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";
import styles from "./css/carAuction.module.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { UserContext } from "../UserProvider"; // Adjust the import path as needed

const CarAuction = () => {
  const [searchParams] = useSearchParams();
  const carId = searchParams.get("carId");

  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Use error state to show messages without blocking entire page
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Image gallery state
  const [mainImage, setMainImage] = useState("");
  const [activeThumbnail, setActiveThumbnail] = useState("");

  // Auction countdown state
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  // Bidding state
  const [bidAmount, setBidAmount] = useState("");

  // Bid History state added for dynamic bid history updates
  const [bidHistory, setBidHistory] = useState([
  ]);

  // Get user data from context (firstName, email, etc.)
  const { user, isLoggedIn } = useContext(UserContext);

  // --- Socket Setup ---
  useEffect(() => {
    const newSocket = io("http://localhost:3000"); // Adjust URL as needed
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server", newSocket.id);
    });

    newSocket.on("bidUpdated", (updatedBidData) => {
      if (updatedBidData.carId === carId) {
        setCarData((prev) => ({
          ...prev,
          highestBid: updatedBidData.highestBid,
          bids: updatedBidData.bidHistory || updatedBidData.bids,
        }));
        if (updatedBidData.bidHistory) {
          setBidHistory(updatedBidData.bidHistory);
        }
      }
    });

    return () => {
      newSocket.disconnect();
    };
  }, [carId]);

  // --- Fetch Car Data ---
  useEffect(() => {
    const fetchCarData = async () => {
      try {
        if (!carId) {
          setError("Car ID is missing from the URL");
          setLoading(false);
          return;
        }

        const response = await fetch(`http://localhost:3000/api/v1/car/${carId}`, {
          credentials: "include",
        });
        const data = await response.json();
        console.log(data.data.document.bidHistory);
        if (data.data.document.bidHistory) {
          setBidHistory(data.data.document.bidHistory);
        }
        if (!response.ok) {
          setError(data.message || "Car not found");
          setCarData(null);
        } else {
          setCarData(data.data.document);
          setMainImage(data.data.document.imagesthumbnails[0].src);
          if (data.data.document.images?.thumbnails) {
            if (typeof data.data.document.images.thumbnails[0] === "object") {
              setActiveThumbnail(data.data.document.images.thumbnails[0].src || "");
            } else {
              setActiveThumbnail(data.data.document.images.thumbnails[0] || "");
            }
          }
        }
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchCarData();
  }, [carId]);

  // --- Auction Countdown Timer ---
  useEffect(() => {
    if (!carData || !carData.auctionEndTime) return;
    const endTime = new Date(carData.auctionEndTime).getTime();

    const timerInterval = setInterval(() => {
      const now = Date.now();
      const distance = endTime - now;

      if (distance <= 0) {
        clearInterval(timerInterval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({ hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [carData]);

  // --- Place Bid Function ---
  const placeBid = () => {
    const bidValue = parseFloat(bidAmount);
    const currentHighestBid = carData?.highestBid || 0;

    if (bidValue && bidValue >= currentHighestBid + 100) {
      if (socket && isLoggedIn && user) {
        socket.emit("placeBid", {
          carId,
          bidAmount: bidValue,
          firstName: user.firstName,
          email: user.email,
        });
        setBidAmount("");
      } else {
        alert("Please log in to place a bid.");
      }
    } else {
      alert(`Please enter a valid bid amount (minimum $${currentHighestBid + 100})`);
    }
  };

  // Determine if auction has ended
  const auctionEnded =
    carData && carData.auctionEndTime && new Date(carData.auctionEndTime) <= new Date();

  return (
    <>
    <div class="shape shape__big"></div>
    <div class="shape shape__small"></div>
    <div class="shape shape__smaller"></div>
      <Nav />
      <main className={styles["auction-main"]}>
        <div className={styles["auction-container"]}>
          {/* Car Details Section */}
          <div className={styles["car-details"]}>
            {carData ? (
              <>
                <div className={styles["car-gallery"]}>
                  <div className={styles["main-image"]}>
                    <img
                      src={`http://localhost:3000/images/cars/${mainImage || carData.images.thumbnails[0].src}`}
                      alt={carData.fullName || "Car Image"}
                    />
                  </div>
                  <div className={styles["thumbnail-container"]}>
                    {carData.images?.thumbnails &&
                      carData.images.thumbnails.map((thumb, index) => {
                        const src = typeof thumb === "object" ? thumb.src : thumb;
                        const thumbUrl = `http://localhost:3000/images/cars/${src}`;
                        const alt =
                          typeof thumb === "object"
                            ? thumb.alt
                            : `${carData.fullName} view ${index + 1}`;
                        return (
                          <img
                            key={index}
                            src={thumbUrl}
                            alt={alt}
                            className={`${styles["thumbnail"]} ${
                              activeThumbnail === src ? styles["active"] : ""
                            }`}
                            onClick={() => {
                              setMainImage(src);
                              setActiveThumbnail(src);
                            }}
                          />
                        );
                      })}
                  </div>
                </div>

                <div className={styles["car-info"]}>
                  <div className={styles["car-header"]}>
                    <h1>{carData.fullName}</h1>
                    <div className={styles["auction-status"]}>
                      <i className="ri-auction-line"></i>
                      {carData.auctionStatus ? "Live" : "Ended"}
                    </div>
                  </div>

                  <div className={styles["car-specs"]}>
                    <p>
                      <strong>Brand:</strong> {carData.brand}
                    </p>
                    <p>
                      <strong>Model:</strong> {carData.model}
                    </p>
                    <p>
                      <strong>Year:</strong> {carData.year}
                    </p>
                    <p>
                      <strong>Location:</strong> {carData.location || carData.specs?.location}
                    </p>
                    <p>
                      <strong>Transmission:</strong> {carData.specs?.transmission}
                    </p>
                    <p>
                      <strong>Mileage:</strong> {carData.specs?.mileage}
                    </p>
                    <p>
                      <strong>Fuel Type:</strong> {carData.details?.fuelType}
                    </p>
                  </div>

                  <div className={styles["car-description"]}>
                    <h3>About This Car</h3>
                    <p>{carData.description || "No description available."}</p>
                    <div className={styles["features-grid"]}>
                      {carData.key_features?.map((spec, index) => (
                        <div key={index} className={styles["feature"]}>
                          <i className={spec.icon}></i>
                          <span>{spec.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles["seller-info"]}>
                    <h3>Seller Information</h3>
                    <div className={styles["seller-profile"]}>
                      <img src={carData.seller?.avatar} alt="Seller Avatar" />
                      <div className={styles["seller-details"]}>
                        <h4>{carData.seller?.name}</h4>
                        <div className={styles["seller-rating"]}>
                          {[...Array(Math.floor(carData.seller?.rating || 0))].map((_, i) => (
                            <i key={i} className="ri-star-fill"></i>
                          ))}
                          {carData.seller?.rating % 1 !== 0 && <i className="ri-star-half-fill"></i>}
                          <span>({carData.seller?.rating})</span>
                        </div>
                      </div>
                      <button className={styles["btn-contact"]}>
                        <i className="ri-message-3-line"></i>
                        Contact Seller
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles["car-not-found"]}>
                <p>Car not found.</p>
              </div>
            )}
          </div>

          {/* Bidding Section */}
          <div className={styles["bidding-section"]}>
            {carData ? (
              <>
                <div className={styles["auction-timer"]}>
                  <h3>Auction Ends In</h3>
                  <div className={styles["timer"]}>
                    <div className={styles["time-unit"]}>
                      <span>{String(timeLeft.hours).padStart(2, "0")}</span>
                      <label>Hours</label>
                    </div>
                    <div className={styles["time-unit"]}>
                      <span>{String(timeLeft.minutes).padStart(2, "0")}</span>
                      <label>Minutes</label>
                    </div>
                    <div className={styles["time-unit"]}>
                      <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
                      <label>Seconds</label>
                    </div>
                  </div>
                </div>

                <div className={styles["current-bid"]}>
                  <div className={styles["bid-info"]}>
                    <h3>Current Bid</h3>
                    <div className={styles["bid-amount"]}>
                      ${carData.highestBid.toLocaleString()}
                    </div>
                  </div>
                  {auctionEnded ? (
                    <div className={styles["auction-ended-message"]}>
                      <p>Auction Ended</p>
                    </div>
                  ) : (
                    <div className={styles["bid-actions"]}>
                      <div className={styles["bid-input"]}>
                        <span className={styles["currency"]}>$</span>
                        <input
                          type="number"
                          placeholder="Enter bid amount"
                          min={carData.highestBid + 100}
                          step={100}
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                        />
                      </div>
                      <button className={styles["btn-bid"]} onClick={placeBid}>
                        <i className="ri-auction-line" /> Place Bid
                      </button>
                    </div>
                  )}
                </div>

                {/* Bid History Section (Always Displayed) */}
                <div className={styles["bid-history"]}>
                  <h3>Bid History</h3>
                  <div className={styles["history-list"]}>
                    {bidHistory.length > 0 ? (
                      bidHistory.map((bid, index) => (
                        <div key={index} className={styles["history-item"]}>
                          <div className={styles["bidder-info"]}>
                            <img src={bid.avatar} alt="Bidder Avatar" />
                            <div className={styles["bidder-details"]}>
                              <h4>{bid.firstName}</h4>
                              <span className={styles["bid-time"]}>
                                {bid.time
                                  ? new Date(bid.time).toLocaleTimeString()
                                  : bid.time || "Just now"}
                              </span>
                            </div>
                          </div>
                          <div className={styles["bid-value"]}>
                            ${bid.amount ? bid.amount.toLocaleString() : bid.bidAmount || bid.bidValue}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className={styles["no-bids"]}>No bids placed yet.</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className={styles["bidding-message"]}>
                <p>No auction available for this car.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CarAuction;
