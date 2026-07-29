import React from "react";
import "./Offers.css";
import {
  FaTags,
  FaCar,
  FaGift,
  FaPercent,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

const offers = [
  {
    icon: <FaPercent />,
    title: "20% OFF on First Booking",
    discount: "SAVE 20%",
    description:
      "Book your first ride with us and enjoy an instant 20% discount.",
  },
  {
    icon: <FaCar />,
    title: "Weekend Special",
    discount: "UP TO 30% OFF",
    description:
      "Get exciting discounts on weekend bookings for SUVs and luxury cars.",
  },
  {
    icon: <FaGift />,
    title: "Refer & Earn",
    discount: "£25 REWARD",
    description:
      "Invite your friends and earn rewards when they complete their first booking.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Long-Term Rental",
    discount: "SAVE 35%",
    description:
      "Book for 7 days or more and unlock exclusive long-term rental discounts.",
  },
];

const Offers = () => {
  return (
    <div className="offers-page">

      {/* Hero */}

      <section className="offers-hero">
        <div className="offers-overlay">
          <h1>Special Offers</h1>
          <p>Grab exclusive discounts and drive your dream car for less.</p>
        </div>
      </section>

      {/* Intro */}

      <section className="offers-intro">
        <span>LIMITED TIME DEALS</span>
        <h2>Exclusive Rental Offers</h2>
        <p>
          Save more on every booking with our premium offers designed for
          business travellers, families and weekend road trips.
        </p>
      </section>

      {/* Offer Cards */}

      <section className="offers-container">
        {offers.map((offer, index) => (
          <div className="offer-card" key={index}>
            <div className="offer-icon">{offer.icon}</div>

            <div className="offer-badge">
              <FaTags />
              <span>{offer.discount}</span>
            </div>

            <h3>{offer.title}</h3>

            <p>{offer.description}</p>

            <button>
              Claim Offer <FaArrowRight />
            </button>
          </div>
        ))}
      </section>

      {/* Bottom Banner */}

      <section className="offer-banner">
        <h2>Book Today & Save Big</h2>
        <p>
          Premium Cars • Instant Booking • Best Prices • 24/7 Customer Support
        </p>
        <button>Book Now</button>
      </section>

    </div>
  );
};

export default Offers;