import { useEffect, useState } from "react";

import "./Home.css";

import Hero from "../../components/user/Hero";
import CarCard from "../../components/user/CarCard";
import ServicesCard from "../../components/user/ServicesCard";

import carService from "../../services/carService";

// ========================================
// BACKEND URL
// ========================================

const API_BASE_URL = "http://localhost:5151";

// ========================================
// IMAGE URL
// ========================================

const getImageUrl = (image) => {

  if (
    !image ||
    typeof image !== "string"
  ) {
    return "";
  }

  const imagePath = image.trim();

  if (!imagePath) {
    return "";
  }

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${API_BASE_URL}${imagePath}`;
  }

  return `${API_BASE_URL}/${imagePath}`;
};


// ========================================
// NORMALIZE CAR
// ========================================

const normalizeCar = (car) => {

  let images = [];

  if (Array.isArray(car?.images)) {

    images = car.images;

  }
  else if (Array.isArray(car?.imageUrls)) {

    images = car.imageUrls;

  }
  else if (car?.imageUrl) {

    images = [
      car.imageUrl
    ];

  }

  return {

    ...car,

    id:
      car?.carId ??
      car?.id,

    modelName:
      car?.modelName ??
      car?.model ??
      car?.name ??
      "Car",

    fuelType:
      car?.fuelType ??
      car?.fuel ??
      "N/A",

    seats:
      car?.seats ??
      car?.seatCount ??
      "N/A",

    rent:
      car?.rent ??
      car?.rentPerDay ??
      car?.price ??
      0,

    carYearModel:
      car?.carYearModel ??
      car?.year ??
      "N/A",

    features:
      Array.isArray(car?.features)
        ? car.features.join(" • ")
        : car?.features ?? "",

    images:
      images
        .map(getImageUrl)
        .filter(Boolean),

  };

};


// ========================================
// RESPONSE
// ========================================

const getCarsFromResponse = (result) => {

  if (!result?.success) {

    throw new Error(
      result?.message ||
      "Unable to load cars."
    );

  }

  const data = result?.data;

  if (Array.isArray(data)) {

    return data;

  }

  if (Array.isArray(data?.content)) {

    return data.content;

  }

  if (Array.isArray(data?.data)) {

    return data.data;

  }

  return [];

};


// ========================================
// HOME
// ========================================

const Home = () => {

  const [cars, setCars] =
    useState([]);

  const [loadingCars, setLoadingCars] =
    useState(true);

  const [carsError, setCarsError] =
    useState("");

  /*
   * Controls whether all cars
   * or only first 3 cars are displayed.
   */
  const [showAllCars, setShowAllCars] =
    useState(false);


  // ======================================
  // LOAD CARS
  // ======================================

  useEffect(() => {

    let mounted = true;

    const loadCars = async () => {

      try {

        setLoadingCars(true);

        setCarsError("");

        const result =
          await carService.getAllCars();

        console.log(
          "Home cars response:",
          result
        );

        const carList =
          getCarsFromResponse(result);

        const normalizedCars =
          carList
            .map(normalizeCar)
            .filter(
              (car) =>
                car.id != null
            );

        if (mounted) {

          /*
           * IMPORTANT:
           *
           * Store ALL cars.
           *
           * We don't use slice(0, 3) here.
           */
          setCars(
            normalizedCars
          );

        }

      }
      catch (error) {

        console.error(
          "Home cars error:",
          error
        );

        if (mounted) {

          setCarsError(
            error?.response?.data?.message ||
            error?.message ||
            "Unable to load cars."
          );

        }

      }
      finally {

        if (mounted) {

          setLoadingCars(false);

        }

      }

    };

    loadCars();

    return () => {

      mounted = false;

    };

  }, []);


  // ======================================
  // DISPLAYED CARS
  // ======================================

  const displayedCars =
    showAllCars
      ? cars
      : cars.slice(0, 3);


  // ======================================
  // TOGGLE CARS
  // ======================================

  const handleViewAllCars = () => {

    setShowAllCars(
      (previous) => !previous
    );

  };


  return (

    <div className="home">

      {/* ==================================
          HERO
      =================================== */}

      <Hero />


      {/* ==================================
          SERVICES
      =================================== */}

      <section className="services-section">

        <div className="section-header">

          <span>
            Our Services
          </span>

          <h2>
            Premium Services For Every Journey
          </h2>

        </div>

        <div className="services-container">

          <ServicesCard />

        </div>

      </section>


      {/* ==================================
          POPULAR CARS
      =================================== */}

      <section className="popular-section">

        {/* ================================
            HEADER
        ================================= */}

        <div className="section-header popular-header">

          <div className="popular-heading">

            <span>
              Popular Cars
            </span>

            <h2>
              Most Rented Cars
            </h2>

          </div>


          {/* ================================
              VIEW ALL / SHOW LESS
          ================================= */}

          {cars.length > 3 && (

            <button
              className="view-all-cars-btn"
              onClick={handleViewAllCars}
            >

              {showAllCars
                ? "Show Less"
                : "View All Cars"
              }

            </button>

          )}

        </div>


        {/* ==================================
            CARS
        =================================== */}

        <div className="popular-cars-container">

          {/* LOADING */}

          {loadingCars && (

            <p>
              Loading available cars...
            </p>

          )}


          {/* ERROR */}

          {!loadingCars &&
            carsError && (

              <p>
                {carsError}
              </p>

            )}


          {/* EMPTY */}

          {!loadingCars &&
            !carsError &&
            cars.length === 0 && (

              <p>
                No cars are available
                right now.
              </p>

            )}


          {/* CARDS */}

          {!loadingCars &&
            !carsError &&
            displayedCars.length > 0 &&

            displayedCars.map((car) => (

              <CarCard
                key={car.id}
                car={car}
              />

            ))}

        </div>

      </section>


      {/* ==================================
          EXPERIENCE
      =================================== */}

      <section className="experience-section">

        <div className="experience-image">

          <img
            src="https://images.unsplash.com/photo-1494905998402-395d579af36f?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury Car"
          />

        </div>


        <div className="experience-content">

          <span>
            Why Choose Us
          </span>

          <h2>
            Experience Luxury Driving
          </h2>

          <p>
            We provide premium car rental
            services with luxury comfort,
            best pricing, and unforgettable
            experiences.
          </p>


          <div className="experience-stats">

            <div className="stat-box">

              <h3>
                500+
              </h3>

              <p>
                Luxury Cars
              </p>

            </div>


            <div className="stat-box">

              <h3>
                15K+
              </h3>

              <p>
                Happy Clients
              </p>

            </div>


            <div className="stat-box">

              <h3>
                24/7
              </h3>

              <p>
                Support
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ==================================
          CTA
      =================================== */}

      <section className="cta-section">

        <div className="cta-box">

          <span>
            Premium Rental Service
          </span>

          <h2>
            Ready To Drive Your Dream Car?
          </h2>

          <p>
            Book luxury cars with affordable
            pricing and premium comfort today.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              setShowAllCars(true)
            }
          >
            Explore Cars
          </button>

        </div>

      </section>

    </div>

  );

};

export default Home;





