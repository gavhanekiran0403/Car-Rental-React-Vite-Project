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

      <section className="services-container">

        <div className="service-card">
          <FaCarSide className="icon"/>
          <h3>Self Drive Cars</h3>
          <p>
            Choose from hatchbacks, sedans, SUVs and luxury cars at affordable prices.
          </p>
        </div>

        <div className="service-card">
          <FaUserTie className="icon"/>
          <h3>Car With Driver</h3>
          <p>
            Professional chauffeurs for business meetings, weddings and family trips.
          </p>
        </div>

        <div className="service-card">
          <FaMapMarkedAlt className="icon"/>
          <h3>Outstation Trips</h3>
          <p>
            Unlimited kilometres with flexible packages for long-distance travel.
          </p>
        </div>

        <div className="service-card">
          <FaShieldAlt className="icon"/>
          <h3>Fully Insured</h3>
          <p>
            Every vehicle is insured and regularly inspected for maximum safety.
          </p>
        </div>

        <div className="service-card">
          <FaTools className="icon"/>
          <h3>24×7 Road Assistance</h3>
          <p>
            Emergency roadside support whenever and wherever you need help.
          </p>
        </div>

        <div className="service-card">
          <FaHeadset className="icon"/>
          <h3>Customer Support</h3>
          <p>
            Dedicated customer service available anytime to assist your booking.
          </p>
        </div>

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