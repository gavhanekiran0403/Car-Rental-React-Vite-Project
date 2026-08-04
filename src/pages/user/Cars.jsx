import React from "react";
import "./Cars.css";
import CarCard from "../../components/user/CarCard";

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

export default function Cars() {
  return (
    <div className="cars-page">

      {/* Hero */}

      <section className="cars-hero">
        <div className="cars-overlay">
          <h1>Premium Rental Cars</h1>
          <p>Choose your perfect ride from our luxury collection.</p>
        </div>
      </section>

      {/* Heading */}

      <section className="cars-heading">
        <span>PREMIUM COLLECTION</span>

        <h2>Available Cars</h2>

        <p>
          Find the perfect luxury, SUV, sedan or economy car for your next
          journey.
        </p>
      </section>

      {/* Cards */}

      <section className="cars-container">

        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
          />
        ))}

      </section>

      {/* Banner */}

      <section className="cars-banner">

        <h2>Drive Your Dream Car Today</h2>

        <p>Luxury • Comfort • Safety • Affordable Pricing</p>

        <button>Explore More Cars</button>

      </section>

    </div>
  );
}