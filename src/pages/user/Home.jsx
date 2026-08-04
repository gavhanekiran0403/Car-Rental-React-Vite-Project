import React from "react";

import "./Home.css";

import Hero from "../../components/user/Hero";
import CarCard from "../../components/user/CarCard";
import ServicesCard from "../../components/user/ServicesCard";

const cars = [
  {
    id: 1,
    modelName: "BMW X5",
    fuelType: "Diesel",
    seats: 7,
    rent: 4500,
    carYearModel: 2024,
    features:
      "GPS Navigation • Sunroof • Leather Seats • Reverse Camera • ABS • Airbags",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500",
    ],
  },
  {
    id: 2,
    modelName: "Mercedes C-Class",
    fuelType: "Petrol",
    seats: 5,
    rent: 5200,
    carYearModel: 2023,
    features:
      "Automatic • GPS • Premium Audio • Leather Seats • Cruise Control",
    images: [
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200",
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500",
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=500",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=500",
    ],
  },
  {
    id: 3,
    modelName: "Toyota Fortuner",
    fuelType: "Diesel",
    seats: 7,
    rent: 3800,
    carYearModel: 2022,
    features:
      "Touch Screen • Rear Camera • Bluetooth • ABS • Airbags",
    images: [
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200",
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=500",
    ],
  },
];

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

          <ServicesCard />
          
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

         <div className="popular-cars-container">

        {cars.slice(0, 3).map((car) => (

            <CarCard
                key={car.id}
                car={car}
            />

        ))}

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