import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaGasPump,
  FaUsers,
  FaCalendarAlt,
  FaStar
} from "react-icons/fa";

import "./Favorites.css";

const Favorites = () => {

  const navigate = useNavigate();

  const [favoriteCars, setFavoriteCars] = useState([

    {
      id: 1,
      modelName: "BMW X5",
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200",
      fuel: "Diesel",
      seats: 7,
      year: 2024,
      rent: 4500,
      rating: 4.8
    },

    {
      id: 2,
      modelName: "Mercedes C-Class",
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1200",
      fuel: "Petrol",
      seats: 5,
      year: 2023,
      rent: 5200,
      rating: 4.9
    },

    {
      id: 3,
      modelName: "Toyota Fortuner",
      image:
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200",
      fuel: "Diesel",
      seats: 7,
      year: 2022,
      rent: 3800,
      rating: 4.7
    }

  ]);

  const removeFavorite = (id) => {

    if (window.confirm("Remove this car from favorites?")) {

      setFavoriteCars(
        favoriteCars.filter((car) => car.id !== id)
      );

    }

  };

  return (

    <div className="favorites-page">

      <div className="favorites-header">

        <h1>My Favorite Cars</h1>

        <p>
          Save your favourite cars and book them anytime.
        </p>

      </div>

      {favoriteCars.length === 0 ? (

        <div className="empty-favorites">

          <FaHeart />

          <h2>No Favorite Cars</h2>

          <p>Your wishlist is empty.</p>

        </div>

      ) : (

        <div className="favorites-container">

          {favoriteCars.map((car) => (

            <div
              className="favorite-card"
              key={car.id}
            >

              <div className="favorite-image">

                <img
                  src={car.image}
                  alt={car.modelName}
                />

                <button
                  className="favorite-remove"
                  onClick={() =>
                    removeFavorite(car.id)
                  }
                >
                  <FaHeart />
                </button>

              </div>

              <div className="favorite-content">

                <div className="favorite-top">

                  <h2>{car.modelName}</h2>

                  <span>
                    <FaStar />
                    {car.rating}
                  </span>

                </div>

                <div className="favorite-info">

                  <span>
                    <FaGasPump />
                    {car.fuel}
                  </span>

                  <span>
                    <FaUsers />
                    {car.seats} Seats
                  </span>

                  <span>
                    <FaCalendarAlt />
                    {car.year}
                  </span>

                </div>

                <h3>

                  ₹ {car.rent}

                  <small>/ Day</small>

                </h3>

                <div className="favorite-buttons">

                  <button
                    className="details-btn"
                    onClick={() =>
                      navigate("/cars")
                    }
                  >
                    View Details
                  </button>

                  <button
                    className="book-btn"
                    onClick={() =>
                      navigate(`/booking/${car.id}`)
                    }
                  >
                    Book Now
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Favorites;