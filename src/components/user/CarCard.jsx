import React, { useEffect, useState } from "react";
import "./CarCard.css";
import BookingModal from "./BookingModal/BookingModal";

import {
  FaUsers,
  FaGasPump,
  FaCalendarAlt,
  FaCheckCircle,
  FaCarSide,
  FaSignInAlt,
  FaTimes,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import dummyCar1 from "../../assets/car-placeholder/front.png";
import dummyCar2 from "../../assets/car-placeholder/back.png";
import dummyCar3 from "../../assets/car-placeholder/side.png";
import dummyCar4 from "../../assets/car-placeholder/interier.png";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const [showBooking, setShowBooking] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const [currentImage, setCurrentImage] = useState(0);

  /*
   * ----------------------------------------------------
   * DEFAULT IMAGES
   * ----------------------------------------------------
   */
  const dummyImages = [
    dummyCar1,
    dummyCar2,
    dummyCar3,
    dummyCar4,
  ];

  /*
   * ----------------------------------------------------
   * CAR IMAGES
   * ----------------------------------------------------
   */
  const carImages =
    car?.images && car.images.length > 0
      ? car.images
      : dummyImages;

  /*
   * ----------------------------------------------------
   * IMAGE AUTO SLIDER
   * ----------------------------------------------------
   */
  useEffect(() => {
    if (!carImages || carImages.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentImage((prev) => {
        return (prev + 1) % carImages.length;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [carImages.length]);

  /*
   * ----------------------------------------------------
   * IMAGE ERROR HANDLER
   * ----------------------------------------------------
   */
  const handleImageError = (event) => {
    event.target.onerror = null;

    const fallbackIndex =
      currentImage < dummyImages.length
        ? currentImage
        : 0;

    event.target.src = dummyImages[fallbackIndex];
  };

  /*
   * ----------------------------------------------------
   * CHECK LOGIN BEFORE BOOKING
   * ----------------------------------------------------
   */
  const handleBookNow = () => {
    const token = localStorage.getItem("token");
    const loggedUser = localStorage.getItem("loggedUser");

    /*
     * User is not logged in
     */
    if (!token || !loggedUser) {
      setShowLoginMessage(true);
      return;
    }

    /*
     * User is logged in
     */
    setShowBooking(true);
  };

  /*
   * ----------------------------------------------------
   * LOGIN BUTTON
   * ----------------------------------------------------
   */
  const handleLogin = () => {
    setShowLoginMessage(false);

    navigate("/login", {
      state: {
        from: window.location.pathname,
      },
    });
  };

  /*
   * ----------------------------------------------------
   * CLOSE BOOKING MODAL
   * ----------------------------------------------------
   */
  const handleCloseBooking = () => {
    setShowBooking(false);
  };

  return (
    <>
      <div className="car-card">

        {/* ============================================
            CAR IMAGE
        ============================================ */}
        <div className="car-image-container">

          <img
            src={carImages[currentImage]}
            alt={car?.modelName || "Car"}
            className="car-image"
            onError={handleImageError}
          />

          {/* Image dots */}
          {carImages.length > 1 && (
            <div className="car-image-dots">
              {carImages.map((_, index) => (
                <span
                  key={index}
                  className={
                    currentImage === index
                      ? "image-dot active"
                      : "image-dot"
                  }
                  onClick={() => setCurrentImage(index)}
                />
              ))}
            </div>
          )}

          {/* Available Badge */}
          {car?.available !== false && (
            <div className="available-badge">
              <FaCheckCircle />
              Available
            </div>
          )}
        </div>

        {/* ============================================
            CAR CONTENT
        ============================================ */}
        <div className="car-card-content">

          {/* Car Name */}
          <div className="car-title-section">
            <h3 className="car-name">
              {car?.modelName || "Car Model"}
            </h3>

            {car?.carYearModel && (
              <span className="car-year">
                {car.carYearModel}
              </span>
            )}
          </div>

          {/* ============================================
              CAR DETAILS
          ============================================ */}
          <div className="car-details">

            {/* Seats */}
            <div className="car-detail-item">
              <FaUsers className="car-detail-icon" />
              <div>
                <span className="detail-label">
                  Seats
                </span>

                <span className="detail-value">
                  {car?.seats || "-"}
                </span>
              </div>
            </div>

            {/* Fuel */}
            <div className="car-detail-item">
              <FaGasPump className="car-detail-icon" />

              <div>
                <span className="detail-label">
                  Fuel
                </span>

                <span className="detail-value">
                  {car?.fuelType || "-"}
                </span>
              </div>
            </div>

            {/* Year */}
            <div className="car-detail-item">
              <FaCalendarAlt className="car-detail-icon" />

              <div>
                <span className="detail-label">
                  Year
                </span>

                <span className="detail-value">
                  {car?.carYearModel || "-"}
                </span>
              </div>
            </div>

          </div>

          {/* ============================================
              FEATURES
          ============================================ */}
          {car?.features && (
            <div className="car-features">

              {Array.isArray(car.features) ? (
                car.features.slice(0, 3).map(
                  (feature, index) => (
                    <span
                      key={index}
                      className="feature-tag"
                    >
                      <FaCheckCircle />
                      {feature}
                    </span>
                  )
                )
              ) : (
                <span className="feature-tag">
                  <FaCheckCircle />
                  {car.features}
                </span>
              )}

            </div>
          )}

          {/* ============================================
              PRICE + BOOK BUTTON
          ============================================ */}
          <div className="car-card-footer">

            <div className="car-price">

              <span className="price-label">
                Starting from
              </span>

              <div className="price-value">
                ₹{car?.rent || 0}
                <span className="price-unit">
                  /day
                </span>
              </div>

            </div>

            <button
              type="button"
              className="book-now-btn"
              onClick={handleBookNow}
            >
              <FaCarSide />
              Book Now
            </button>

          </div>
        </div>
      </div>

      {/* ==================================================
          LOGIN REQUIRED POPUP
      ================================================== */}
      {showLoginMessage && (
        <div
          className="login-popup-overlay"
          onClick={() => setShowLoginMessage(false)}
        >

          <div
            className="login-popup"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* Close button */}
            <button
              type="button"
              className="login-popup-close"
              onClick={() =>
                setShowLoginMessage(false)
              }
            >
              <FaTimes />
            </button>

            {/* Icon */}
            <div className="login-popup-icon">
              <FaSignInAlt />
            </div>

            {/* Title */}
            <h3>
              Login Required
            </h3>

            {/* Message */}
            <p>
              Please login to your account before
              booking a car.
            </p>

            {/* Buttons */}
            <div className="login-popup-buttons">

              <button
                type="button"
                className="popup-cancel-btn"
                onClick={() =>
                  setShowLoginMessage(false)
                }
              >
                Cancel
              </button>

              <button
                type="button"
                className="login-popup-btn"
                onClick={handleLogin}
              >
                <FaSignInAlt />
                Login
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ==================================================
          BOOKING MODAL
      ================================================== */}
      {showBooking && (
        <BookingModal
          car={car}
          onClose={handleCloseBooking}
        />
      )}
    </>
  );
};

export default CarCard;