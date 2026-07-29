import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}

      <section className="about-hero">

        <div className="about-overlay">

          <h1>About CarRental</h1>

          <p>
            Premium Car Rental Service with Luxury,
            Comfort and Trust.
          </p>

        </div>

      </section>

      {/* Company Section */}

      <section className="about-company">

        <div className="about-image">

          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
            alt="Luxury Car"
          />

        </div>

        <div className="about-content">

          <span>WHO WE ARE</span>

          <h2>Experience Premium Car Rental</h2>

          <p>
            CarRental provides luxury, sports, SUV,
            and economy cars at affordable prices.
            Whether you're planning a business trip,
            family vacation, or weekend getaway,
            we ensure a safe, comfortable, and premium
            driving experience.
          </p>

          <button>
            Explore Cars
          </button>

        </div>

      </section>

      {/* Stats */}

      <section className="stats-section">

        <div className="stat-card">
          <h2>500+</h2>
          <p>Luxury Cars</p>
        </div>

        <div className="stat-card">
          <h2>15K+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-card">
          <h2>50+</h2>
          <p>Cities Covered</p>
        </div>

        <div className="stat-card">
          <h2>24/7</h2>
          <p>Customer Support</p>
        </div>

      </section>

      {/* Why Choose Us */}

      <section className="why-us">

        <h2>Why Choose Us</h2>

        <div className="why-container">

          <div className="why-card">
            <h3>🚘 Premium Fleet</h3>
            <p>Luxury and economy vehicles for every journey.</p>
          </div>

          <div className="why-card">
            <h3>💰 Affordable Price</h3>
            <p>Transparent pricing without hidden charges.</p>
          </div>

          <div className="why-card">
            <h3>🛡 Safe & Secure</h3>
            <p>Well-maintained vehicles with full insurance.</p>
          </div>

        </div>

      </section>

    </div>
  );
};

export default AboutUs;