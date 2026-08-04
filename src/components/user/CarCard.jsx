import React, { useState } from "react";
import "./CarCard.css";
import BookingModal from "./BookingModal/BookingModal";

import {
  FaUsers,
  FaGasPump,
  FaCalendarAlt,
  FaCheckCircle,
  FaCarSide,
} from "react-icons/fa";

export default function CarCard({ car }) {

  const [showBooking, setShowBooking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(car.images[0]);

  return (
    <>
      <div className="car-card">

        <div className="image-section">

          <img
            src={selectedImage}
            alt={car.modelName}
            className="main-image"
          />

          <div className="gallery">
            {car.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={car.modelName}
                onClick={() => setSelectedImage(img)}
                className={selectedImage === img ? "active-image" : ""}
              />
            ))}
          </div>

        </div>

        <div className="car-content">

          <div className="car-header">
            <h2>{car.modelName}</h2>
          </div>

          <div className="car-details">

            <div className="detail-row">
              <FaGasPump className="detail-icon" />
              <span className="label">Fuel :</span>
              <span>{car.fuelType}</span>
            </div>

            <div className="detail-row">
              <FaUsers className="detail-icon" />
              <span className="label">Seats :</span>
              <span>{car.seats}</span>
            </div>

            <div className="detail-row">
              <FaCalendarAlt className="detail-icon" />
              <span className="label">Year :</span>
              <span>{car.carYearModel}</span>
            </div>

            <div className="detail-row">
              <FaCheckCircle className="detail-icon" />
              <span className="label">Insurance :</span>
              <span>Included</span>
            </div>

            <div className="detail-row feature-row">
              <span className="label">Features :</span>
              <span>{car.features}</span>
            </div>

          </div>

          <div className="price-box">

            <div>
              <h2>₹ {car.rent}</h2>
              <span>Per Day</span>
            </div>

            <button
              className="book-btn"
              onClick={() => setShowBooking(true)}
            >
              <FaCarSide />
              Book Now
            </button>

          </div>

        </div>

      </div>

      {/* Booking Modal */}
      {showBooking && (
        <BookingModal
          car={car}
          onClose={() => setShowBooking(false)}
        />
      )}

    </>
  );
}