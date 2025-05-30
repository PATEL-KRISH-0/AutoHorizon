import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const Payment = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch car details for display
  useEffect(() => {
    if (!id) {
      setError("No car ID provided.");
      setLoading(false);
      return;
    }
    const fetchCar = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/car/${id}`);
        if (!res.ok) throw new Error("Failed to fetch car data");
        const data = await res.json();
        setCar(data.data.document);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // On form submission, send payment data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Basic validation (more robust validation is recommended)
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/v1/car/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carId: id, buyerInfo: formData })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Payment failed");
      alert("Payment successful! Car purchased.");
      navigate(`/carOverview?id=${id}`);
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
  if (error) return <div style={{ textAlign: "center", color: "red" }}>Error: {error}</div>;
  if (!car) return <div style={{ textAlign: "center" }}>Car not found</div>;

  return (
    <>
      <Nav />
      <div
        style={{
          maxWidth: "500px",
          margin: "50px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          fontFamily: "Arial, sans-serif"
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Payment for {car.fullName}
        </h2>
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
            marginBottom: "30px"
          }}
        >
          Price: ${car.price}
        </p>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ marginBottom: "5px" }}>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            style={{
              padding: "8px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />

          <label style={{ marginBottom: "5px" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={{
              padding: "8px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />

          <label style={{ marginBottom: "5px" }}>Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            style={{
              padding: "8px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />

          <label style={{ marginBottom: "5px" }}>Expiry Date (MM/YY)</label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            style={{
              padding: "8px",
              fontSize: "16px",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />

          <label style={{ marginBottom: "5px" }}>CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleChange}
            style={{
              padding: "8px",
              fontSize: "16px",
              marginBottom: "20px",
              borderRadius: "4px",
              border: "1px solid #ccc"
            }}
          />

          <button
            type="submit"
            style={{
              padding: "10px",
              fontSize: "18px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer"
            }}
          >
            Pay Now
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Payment;
