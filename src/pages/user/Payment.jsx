import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaCar,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUniversity,
  FaCreditCard,
  FaMobileAlt
} from "react-icons/fa";
import "./Payment.css";

const bookings = [
  {
    id: 1,
    carName: "BMW X5",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200",
    pickup: "Pune",
    drop: "Mumbai",
    pickupDate: "05 Aug 2026",
    returnDate: "07 Aug 2026",
    rent: 8000,
    insurance: 500,
    gst: 500,
    total: 9000
  }
];

const Payment = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const booking = bookings.find(
    b => b.id === Number(id)
  );

  const [paymentMethod, setPaymentMethod] = useState("upi");

  const [upiId, setUpiId] = useState("");

  const [cardNumber, setCardNumber] = useState("");

  const [cardName, setCardName] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvv, setCvv] = useState("");

  if (!booking) {
    return <h2>Booking Not Found</h2>;
  }

  const handlePayment = () => {

    if (paymentMethod === "upi" && upiId === "") {
      alert("Please Enter UPI ID");
      return;
    }

    if (
      paymentMethod !== "upi" &&
      (
        cardNumber === "" ||
        cardName === "" ||
        expiry === "" ||
        cvv === ""
      )
    ) {
      alert("Please Fill Card Details");
      return;
    }

    navigate("/payment-success");

  };

  return (

    <div className="payment-page">

      <div className="payment-container">

        <button
          className="payment-back"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft />
          Back
        </button>

        <h1>Payment</h1>

        {/* Booking Summary */}

        <div className="booking-summary">

          <img
            src={booking.image}
            alt={booking.carName}
          />

          <div className="booking-details">

            <h2>{booking.carName}</h2>

            <p>
              <FaCar />
              Luxury SUV
            </p>

            <p>
              <FaCalendarAlt />
              {booking.pickupDate} - {booking.returnDate}
            </p>

            <p>
              <FaMapMarkerAlt />
              {booking.pickup} → {booking.drop}
            </p>

          </div>

        </div>

        {/* Price */}

        <div className="payment-price">

          <h2>Price Details</h2>

          <div>
            <span>Car Rent</span>
            <span>₹ {booking.rent}</span>
          </div>

          <div>
            <span>Insurance</span>
            <span>₹ {booking.insurance}</span>
          </div>

          <div>
            <span>GST</span>
            <span>₹ {booking.gst}</span>
          </div>

          <div className="payment-total">
            <span>Total</span>
            <span>₹ {booking.total}</span>
          </div>

        </div>

        {/* Payment Method */}

        <div className="payment-method">

          <h2>Select Payment Method</h2>

          <label>

            <input
              type="radio"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />

            <FaMobileAlt />

            UPI

          </label>

          <label>

            <input
              type="radio"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />

            <FaCreditCard />

            Credit / Debit Card

          </label>

          <label>

            <input
              type="radio"
              checked={paymentMethod === "netbanking"}
              onChange={() => setPaymentMethod("netbanking")}
            />

            <FaUniversity />

            Net Banking

          </label>

        </div>

        {/* Form */}

        {paymentMethod === "upi" ? (

          <div className="payment-form">

            <input
              type="text"
              placeholder="Enter UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />

          </div>

        ) : (

          <div className="payment-form">

            <input
              type="text"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="Card Holder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <div className="card-row">

              <input
                type="text"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />

              <input
                type="password"
                placeholder="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />

            </div>

          </div>

        )}

        {/* Buttons */}

        <div className="payment-buttons">

          <button
            className="cancel-btn"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button
            className="pay-btn"
            onClick={handlePayment}
          >
            <FaMoneyBillWave />
            Pay ₹ {booking.total}
          </button>

        </div>

      </div>

    </div>

  );

};

export default Payment;