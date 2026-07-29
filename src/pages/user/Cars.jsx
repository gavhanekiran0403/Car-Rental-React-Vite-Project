import React from "react";
import "./Cars.css";
import {
  FaUsers,
  FaGasPump,
  FaCog,
  FaSnowflake,
  FaCarSide,
} from "react-icons/fa";

const cars = [
  {
    name: "BMW X5",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=1200&auto=format&fit=crop",
    price: "£95 / Day",
    seats: "5 Seats",
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    name: "Mercedes C-Class",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop",
    price: "£110 / Day",
    seats: "5 Seats",
    fuel: "Diesel",
    transmission: "Automatic",
  },
  {
    name: "Audi A6",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1200&auto=format&fit=crop",
    price: "£105 / Day",
    seats: "5 Seats",
    fuel: "Petrol",
    transmission: "Automatic",
  },
  {
    name: "Range Rover Sport",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1200&auto=format&fit=crop",
    price: "£150 / Day",
    seats: "7 Seats",
    fuel: "Diesel",
    transmission: "Automatic",
  },
  {
    name: "Toyota Fortuner",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=1200&auto=format&fit=crop",
    price: "£80 / Day",
    seats: "7 Seats",
    fuel: "Diesel",
    transmission: "Manual",
  },
  {
    name: "Hyundai Creta",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?q=80&w=1200&auto=format&fit=crop",
    price: "£60 / Day",
    seats: "5 Seats",
    fuel: "Petrol",
    transmission: "Manual",
  },
];

const Cars = () => {
  return (
    <div className="cars-page">

      {/* Hero */}

      <section className="cars-hero">
        <div className="cars-overlay">
          <h1>Our Fleet</h1>
          <p>
            Choose from luxury, SUV, sedan and economy cars for every journey.
          </p>
        </div>
      </section>

      {/* Heading */}

      <section className="cars-heading">
        <span>PREMIUM COLLECTION</span>
        <h2>Available Cars</h2>
        <p>
          Drive your dream car with affordable prices, premium comfort,
          and instant booking.
        </p>
      </section>

      {/* Car Cards */}

      <section className="cars-container">

        {cars.map((car, index) => (
          <div className="car-card" key={index}>

            <img src={car.image} alt={car.name} />

            <div className="car-content">

              <h3>{car.name}</h3>

              <div className="car-details">

                <span><FaUsers /> {car.seats}</span>

                <span><FaGasPump /> {car.fuel}</span>

                <span><FaCog /> {car.transmission}</span>

                <span><FaSnowflake /> AC</span>

              </div>

              <div className="car-footer">

                <h4>{car.price}</h4>

                <button>
                  <FaCarSide /> Book Now
                </button>

              </div>

            </div>

          </div>
        ))}

      </section>

      {/* CTA */}

      <section className="cars-banner">

        <h2>Looking for the Perfect Ride?</h2>

        <p>
          Luxury Cars • SUVs • Hatchbacks • Sedans • Instant Booking
        </p>

        <button>Explore More Cars</button>

      </section>

    </div>
  );
};

export default Cars;