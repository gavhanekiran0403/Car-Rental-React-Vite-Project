import React from "react";

import "./Home.css";

import Hero from "../../components/user/Hero";

const Home = () => {
  return (
    <div className="home">

      {/* HERO */}

      <Hero />

      {/* SERVICES */}

      <section className="services-section">

        <div className="section-header">

          <span>Our Services</span>

          <h2>
            Premium Services For Every Journey
          </h2>

        </div>

        <div className="services-container">

          <div className="service-card">

            <div className="service-icon">
              🚘
            </div>

            <h3>Luxury Cars</h3>

            <p>
              Premium luxury cars for weddings,
              business trips, and vacations.
            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">
              💰
            </div>

            <h3>Affordable Pricing</h3>

            <p>
              Best pricing plans with no hidden
              charges and premium quality.
            </p>

          </div>

          <div className="service-card">

            <div className="service-icon">
              🕘
            </div>

            <h3>24/7 Support</h3>

            <p>
              Customer support available anytime
              for your assistance.
            </p>

          </div>

        </div>

      </section>

      {/* POPULAR CARS */}

      <section className="popular-section">

        <div className="section-header">

          <span>Popular Cars</span>

          <h2>
            Most Rented Cars
          </h2>

        </div>

        <div className="cars-container">

          {/* CAR 1 */}

          <div className="car-card">

            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop"
              alt="BMW"
            />

            <div className="car-info">

              <div>
                <h3>BMW X5</h3>

                <p className="car-price">
                  ₹4500 / Day
                </p>
              </div>

              <button className="primary-btn">
                Rent Now
              </button>

            </div>

          </div>

          {/* CAR 2 */}

          <div className="car-card">

            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2083&auto=format&fit=crop"
              alt="Audi"
            />

            <div className="car-info">

              <div>
                <h3>Audi A6</h3>

                <p className="car-price">
                  ₹5200 / Day
                </p>
              </div>

              <button className="primary-btn">
                Rent Now
              </button>

            </div>

          </div>

          {/* CAR 3 */}

          <div className="car-card">

            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop"
              alt="Mercedes"
            />

            <div className="car-info">

              <div>
                <h3>Mercedes C-Class</h3>

                <p className="car-price">
                  ₹6800 / Day
                </p>
              </div>

              <button className="primary-btn">
                Rent Now
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* EXPERIENCE */}

      <section className="experience-section">

        <div className="experience-image">

          <img
            src="https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Car"
          />

        </div>

        <div className="experience-content">

          <span>Why Choose Us</span>

          <h2>
            Experience Luxury Driving
          </h2>

          <p>
            We provide premium car rental services
            with luxury comfort, best pricing,
            and unforgettable experiences.
          </p>

          <div className="experience-stats">

            <div className="stat-box">
              <h3>500+</h3>
              <p>Luxury Cars</p>
            </div>

            <div className="stat-box">
              <h3>15K+</h3>
              <p>Happy Clients</p>
            </div>

            <div className="stat-box">
              <h3>24/7</h3>
              <p>Support</p>
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta-section">

        <div className="cta-box">

          <span>
            Premium Rental Service
          </span>

          <h2>
            Ready To Drive Your Dream Car?
          </h2>

          <p>
            Book luxury cars with affordable pricing
            and premium comfort today.
          </p>

          <button className="primary-btn">
            Explore Cars
          </button>

        </div>

      </section>

    </div>
  );
};

export default Home;