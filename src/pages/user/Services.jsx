import React from "react";
import "./Services.css";
import {
  FaCarSide,
  FaUserTie,
  FaMapMarkedAlt,
  FaHeadset,
  FaShieldAlt,
  FaTools
} from "react-icons/fa";
import ServicesCard from "../../components/user/ServicesCard";

const Services = () => {
  return (
    <div className="services-page">

      {/* Hero */}

      <section className="services-hero">
        <div className="services-overlay">
          <h1>Our Services</h1>
          <p>
            Luxury, Comfort & Reliable Car Rental Services For Every Journey
          </p>
        </div>
      </section>

      {/* Intro */}

      <section className="service-intro">

        <h2>What We Offer</h2>

        <p>
          Whether you're travelling for business, a family vacation,
          or a weekend road trip, we provide premium rental services
          designed to make every journey memorable.
        </p>

      </section>

      {/* Cards */}
      <section className="services-section">
        <section className="services-container">

          <ServicesCard />

        </section>
      </section>
      

      {/* Bottom Banner */}

      <section className="service-banner">

        <h2>Drive Your Dream Car Today</h2>

        <p>
          Premium fleet • Affordable pricing • Instant booking • 24/7 Support
        </p>

        <button>Book Now</button>

      </section>

    </div>
  );
};

export default Services;