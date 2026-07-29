import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* LEFT CONTENT */}

      <div className="hero-content">

        <span className="hero-tag">
          Premium Car Rental
        </span>

        <h1>
          Rent Your <br />
          Dream Car
        </h1>

        <p>
          Drive luxury cars with premium comfort,
          affordable pricing, and unforgettable experiences.
        </p>

        <div className="hero-buttons">

          <button className="book-btn">
            Book Now
          </button>

          <button className="explore-btn">
            Explore Cars
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;