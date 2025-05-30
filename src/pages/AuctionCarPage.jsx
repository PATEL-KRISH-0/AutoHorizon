import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/CarFind.module.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function AuctionCarPage() {
  // States for cars, loading status, and no data indicator
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noDataFound, setNoDataFound] = useState(false);

  // Filter state declarations
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");
  // Updated cities to match sample data
  const [selectedCities, setSelectedCities] = useState([]);
  // Updated brands to include sample brand "Toyota"
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState([]);
  const [selectedTransmission, setSelectedTransmission] = useState("");
  const [selectedMileage, setSelectedMileage] = useState("");

  const navigate = useNavigate();

  // Navigation function for auction car detail page
  const handleCarClick = (id) => {
    navigate(`/CarAuction?carId=${id}`);
  };

  // Mapping object to convert fuel filter values to expected casing
  const fuelTypeMap = {
    electric: "Electric",
    hybrid: "Hybrid",
    petrol: "Gasoline",
    diesel: "Diesel",
  };

  // Build the query string from filter states and fetch cars
  const applyFilters = () => {
    const queryParams = new URLSearchParams();
    if (searchQuery.trim()) queryParams.append("search", searchQuery.trim());
    if (selectedCondition) queryParams.append("status", selectedCondition);
    selectedCities.forEach((city) => queryParams.append("location", city));
    selectedBrands.forEach((brand) =>
      queryParams.append("brand", brand.charAt(0).toUpperCase() + brand.slice(1))
    );
    selectedBodyTypes.forEach((type) => queryParams.append("carType", type));
    selectedFuelTypes.forEach((fuel) =>
      queryParams.append("fuelType", fuelTypeMap[fuel] || fuel)
    );
    if (selectedTransmission)
      queryParams.append(
        "transmission",
        selectedTransmission === "auto" ? "Auto" : "Manual"
      );
    if (selectedMileage) queryParams.append("mileage", selectedMileage);

    fetchCars(`?${queryParams.toString()}`);
  };

  // Fetch cars with filters, then filter for auction cars.
  // Also handles 404 errors by showing a "no data found" message.
  const fetchCars = async (query = "") => {
    setLoading(true);
    try {
      const url = `http://localhost:3000/api/v1/car/user${query}`;
      const response = await fetch(url, { credentials: "include" });
      
      if (response.status === 404) {
        setNoDataFound(true);
        setCars([]);
        return;
      }
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.data || data.data.results === 0) {
        setNoDataFound(true);
        setCars([]);
      } else {
        // Filter out non-auction cars – only auction cars have isAuction === true.
        const auctionCars = data.data.documents.filter((car) => car.isAuction);
        if (auctionCars.length === 0) {
          setNoDataFound(true);
          setCars([]);
        } else {
          setNoDataFound(false);
          setCars(auctionCars);
        }
      }
    } catch (err) {
      console.error(err);
      setNoDataFound(true);
      setCars([]);
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Filter Handlers
  const handleConditionSelect = (condition) =>
    setSelectedCondition((prev) => (prev === condition ? "" : condition));

  const handleCitySelect = (city) =>
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );

  const handleBrandSelect = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const handleBodyTypeSelect = (type) =>
    setSelectedBodyTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  const handleFuelTypeSelect = (fuel) =>
    setSelectedFuelTypes((prev) =>
      prev.includes(fuel) ? prev.filter((f) => f !== fuel) : [...prev, fuel]
    );

  const handleTransmissionSelect = (transmission) =>
    setSelectedTransmission((prev) =>
      prev === transmission ? "" : transmission
    );

  const handleMileageSelect = (mileage) =>
    setSelectedMileage((prev) => (prev === mileage ? "" : mileage));

  return (
    <>
    <div class="shape shape__big"></div>
    <div class="shape shape__small"></div>
    <div class="shape shape__smaller"></div>
      <Nav />
      <main className={styles["browse-container"]}>
        {/* Filters Section */}
        <section className={styles["filters"]}>
          <h2>Filters</h2>
          {/* Condition Filter */}
          <div className={styles["filter-group"]}>
            <div className={styles["condition-grid"]}>
              <div
                className={`${styles["condition-card"]} ${
                  selectedCondition === "New" ? styles["selected"] : ""
                }`}
                onClick={() => handleConditionSelect("New")}
                data-condition="New"
              >
                <i className="ri-shield-star-line" />
                <span>New</span>
              </div>
              <div
                className={`${styles["condition-card"]} ${
                  selectedCondition === "Used" ? styles["selected"] : ""
                }`}
                onClick={() => handleConditionSelect("Used")}
                data-condition="Used"
              >
                <i className="ri-history-line" />
                <span>Used</span>
              </div>
            </div>
          </div>
          {/* City Filter - Updated options to match sample data */}
          <div className={styles["filter-group"]}>
            <label>City</label>
            <div className={styles["city-grid"]}>
              {["Mumbai", "Delhi", "Bangalore", "Chennai"].map((city) => (
                <div
                  key={city}
                  className={`${styles["city-card"]} ${
                    selectedCities.includes(city) ? styles["selected"] : ""
                  }`}
                  onClick={() => handleCitySelect(city)}
                  data-city={city}
                >
                  <i className="ri-building-line" />
                  <span>{city}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Brand Filter - Updated to include "Toyota" */}
          <div className={styles["filter-group"]}>
            <label>Brand</label>
            <div className={styles["brand-grid"]}>
              {["Toyota", "Tesla", "Porsche", "Audi", "BMW", "Mercedes"].map(
                (brand) => (
                  <div
                    key={brand}
                    className={`${styles["brand-card"]} ${
                      selectedBrands.includes(brand.toLowerCase())
                        ? styles["selected"]
                        : ""
                    }`}
                    onClick={() => handleBrandSelect(brand.toLowerCase())}
                    data-brand={brand}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/bedimcode/responsive-car-website/main/assets/img/logo${
                        brand.toLowerCase() === "tesla"
                          ? 2
                          : brand.toLowerCase() === "porsche"
                          ? 4
                          : brand.toLowerCase() === "audi"
                          ? 3
                          : brand.toLowerCase() === "bmw"
                          ? 5
                          : brand.toLowerCase() === "mercedes"
                          ? 1
                          : 6
                      }.png`}
                      alt={brand}
                    />
                  </div>
                )
              )}
            </div>
            <button className={styles["show-more"]} id="show-more-brands">
              Show More Brands
            </button>
          </div>
          {/* Body Type Filter */}
          <div className={styles["filter-group"]}>
            <label>Body Type</label>
            <div className={styles["body-type-grid"]}>
              {["Suv", "Sedan", "Sports", "Luxury"].map((type) => (
                <div
                  key={type}
                  className={`${styles["body-type-card"]} ${
                    selectedBodyTypes.includes(type) ? styles["selected"] : ""
                  }`}
                  onClick={() => handleBodyTypeSelect(type)}
                  data-type={type}
                >
                  <i className="ri-car-line" />
                  <span>{type}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Fuel Type Filter */}
          <div className={styles["filter-group"]}>
            <label>Fuel Type</label>
            <div className={styles["fuel-type-grid"]}>
              {["electric", "hybrid", "petrol", "diesel"].map((fuel) => (
                <div
                  key={fuel}
                  className={`${styles["fuel-type-card"]} ${
                    selectedFuelTypes.includes(fuel) ? styles["selected"] : ""
                  }`}
                  onClick={() => handleFuelTypeSelect(fuel)}
                  data-fuel={fuel}
                >
                  <i className="ri-flashlight-line" />
                  <span>
                    {fuel.charAt(0).toUpperCase() + fuel.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Transmission Filter */}
          <div className={styles["filter-group"]}>
            <label>Transmission</label>
            <div className={styles["transmission-grid"]}>
              <div
                className={`${styles["transmission-card"]} ${
                  selectedTransmission === "auto" ? styles["selected"] : ""
                }`}
                onClick={() => handleTransmissionSelect("auto")}
                data-transmission="auto"
              >
                <i className="ri-steering-2-line" />
                <span>Automatic</span>
              </div>
              <div
                className={`${styles["transmission-card"]} ${
                  selectedTransmission === "manual" ? styles["selected"] : ""
                }`}
                onClick={() => handleTransmissionSelect("manual")}
                data-transmission="manual"
              >
                <i className="ri-steering-line" />
                <span>Manual</span>
              </div>
            </div>
          </div>
          {/* Mileage Filter */}
          <div className={styles["filter-group"]}>
            <label>Mileage</label>
            <div className={styles["mileage-grid"]}>
              <div
                className={`${styles["mileage-card"]} ${
                  selectedMileage === "low" ? styles["selected"] : ""
                }`}
                onClick={() => handleMileageSelect("low")}
                data-mileage="low"
              >
                <i className="ri-speed-mini-line" />
                <span>&lt; 50K</span>
              </div>
              <div
                className={`${styles["mileage-card"]} ${
                  selectedMileage === "medium" ? styles["selected"] : ""
                }`}
                onClick={() => handleMileageSelect("medium")}
                data-mileage="medium"
              >
                <i className="ri-speed-line" />
                <span>50K-100K</span>
              </div>
              <div
                className={`${styles["mileage-card"]} ${
                  selectedMileage === "high" ? styles["selected"] : ""
                }`}
                onClick={() => handleMileageSelect("high")}
                data-mileage="high"
              >
                <i className="ri-speed-up-line" />
                <span>&gt; 100K</span>
              </div>
            </div>
          </div>
          <button className={styles["apply-filters"]} onClick={applyFilters}>
            Apply Filters
          </button>
        </section>

        {/* Car Listings Section */}
        <section className={styles["car-listings"]}>
          <div className={styles["section-header"]}>
            <h2>Auction Cars</h2>
          </div>
          {loading ? (
            <p>Loading cars...</p>
          ) : noDataFound ? (
            <div className={styles["no-car-found"]}>
              <h3>No auction cars found matching your filters.</h3>
            </div>
          ) : (
            <div className={styles["car-grid"]}>
              {cars.map((car) => (
                <div key={car._id} className={styles["car-card"]}>
                  <div className={styles["car-status"]}>{car.status}</div>
                  <h3 className={styles["car-title"]}>{car.brand}</h3>
                  <span className={styles["car-subtitle"]}>{car.model}</span>
                  <img
                    src={`http://localhost:3000/images/cars/${
                      car.images?.thumbnails?.[0]?.src || "default.jpg"
                    }`}
                    alt={`${car.brand} ${car.model}`}
                    className={styles["car-img"]}
                  />
                  <div className={styles["car-details"]}>
                    <div className={styles["car-detail-group"]}>
                      <i className="ri-speed-up-line" />
                      <span>{car.details?.topSpeed || "N/A"}</span>
                    </div>
                    <div className={styles["car-detail-group"]}>
                      <i className="ri-charging-pile-2-line" />
                      <span>{car.details?.fuelType || "N/A"}</span>
                    </div>
                  </div>
                  <div className={styles["car-specs"]}>
                    <div className={styles["spec-item"]}>
                      <i className="ri-calendar-line" />
                      <span>{car.specs?.year || "N/A"}</span>
                    </div>
                    <div className={styles["spec-item"]}>
                      <i className="ri-map-pin-line" />
                      <span>{car.specs?.location || "N/A"}</span>
                    </div>
                    <div className={styles["spec-item"]}>
                      <i className="ri-steering-line" />
                      <span>{car.specs?.transmission || "N/A"}</span>
                    </div>
                    <div className={styles["spec-item"]}>
                      <i className="ri-timer-line" />
                      <span>{car.specs?.mileage || "N/A"}</span>
                    </div>
                    <div className={styles["spec-item"]}>
                      <i className="ri-user-line" />
                      <span>
                        {car.specs?.seats ? `${car.specs.seats} seats` : "N/A"}
                      </span>
                    </div>
                    <div className={styles["spec-item"]}>
                      <i className="ri-dashboard-3-line" />
                      <span>{car.specs?.driveType || "N/A"}</span>
                    </div>
                  </div>
                  <h4 className={styles["car-price"]}>{car.price}</h4>
                  <button
                    className={styles["popular__button"]}
                    onClick={() => handleCarClick(car._id)}
                  >
                    <i className="ri-shopping-bag-2-line" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
