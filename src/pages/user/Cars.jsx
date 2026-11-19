import { useEffect, useState } from "react";

import "./Cars.css";

import CarCard from "../../components/user/CarCard";

import carService from "../../services/carService";

// ========================================
// BACKEND URL
// ========================================

const API_BASE_URL = "http://localhost:5151";

// ========================================
// IMAGE URL
// ========================================

const getImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return "";
  }

  const imagePath = image.trim();

  if (!imagePath) {
    return "";
  }

  // Complete URL
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  // /uploads/...
  if (imagePath.startsWith("/")) {
    return `${API_BASE_URL}${imagePath}`;
  }

  // uploads/...
  return `${API_BASE_URL}/${imagePath}`;
};

// ========================================
// NORMALIZE CAR
// ========================================

const normalizeCar = (car) => {
  let images = [];

  if (Array.isArray(car?.images)) {
    images = car.images;
  } else if (Array.isArray(car?.imageUrls)) {
    images = car.imageUrls;
  } else if (car?.imageUrl) {
    images = [car.imageUrl];
  }

  return {
    ...car,

    id: car?.carId ?? car?.id,

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
// GET CARS FROM API RESPONSE
// ========================================

const getCarsFromResponse = (result) => {
  console.log("Cars API response:", result);

  // Backend:
  // success = false
  if (!result?.success) {
    throw new Error(
      result?.message ||
      "Unable to load cars."
    );
  }

  const data = result?.data;

  // ======================================
  // data = [...]
  // ======================================

  if (Array.isArray(data)) {
    return {
      cars: data,
      totalPages: 1,
      totalElements: data.length,
    };
  }

  // ======================================
  // data = { content: [...] }
  // ======================================

  if (Array.isArray(data?.content)) {
    return {
      cars: data.content,
      totalPages: data.totalPages ?? 1,
      totalElements: data.totalElements ?? data.content.length,
    };
  }

  // ======================================
  // data = { data: [...] }
  // ======================================

  if (Array.isArray(data?.data)) {
    return {
      cars: data.data,
      totalPages: data.totalPages ?? 1,
      totalElements: data.totalElements ?? data.data.length,
    };
  }

  return {
    cars: [],
    totalPages: 1,
    totalElements: 0,
  };
};

// ========================================
// CARS COMPONENT
// ========================================

export default function Cars() {

  // ======================================
  // CAR DATA
  // ======================================

  const [cars, setCars] = useState([]);

  // ======================================
  // LOADING / ERROR
  // ======================================

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ======================================
  // PAGINATION
  // ======================================

  // Spring Boot page starts from 0
  const [currentPage, setCurrentPage] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  const [totalElements, setTotalElements] =
    useState(0);

  // Cars per page
  const [pageSize] =
    useState(8);

  // ======================================
  // LOAD CARS
  // ======================================

  useEffect(() => {

    let mounted = true;

    const loadCars = async () => {

      try {

        setLoading(true);

        setError("");

        console.log(
          `Loading cars - page: ${currentPage}, size: ${pageSize}`
        );

        const result =
          await carService.getAllCars(
            currentPage,
            pageSize
          );

        console.log(
          "GET /cars:",
          result
        );

        const {
          cars: carList,
          totalPages: backendTotalPages,
          totalElements: backendTotalElements,
        } =
          getCarsFromResponse(result);

        console.log(
          "Car list:",
          carList
        );

        const normalizedCars =
          carList
            .map(normalizeCar)
            .filter(
              (car) =>
                car.id != null
            );

        console.log(
          "Normalized cars:",
          normalizedCars
        );

        if (mounted) {

          setCars(
            normalizedCars
          );

          setTotalPages(
            backendTotalPages
          );

          setTotalElements(
            backendTotalElements
          );

        }

      } catch (error) {

        console.error(
          "Cars loading error:",
          error
        );

        if (mounted) {

          setError(
            error?.message ||
            error?.response?.data?.message ||
            "Unable to load cars right now."
          );

        }

      } finally {

        if (mounted) {

          setLoading(false);

        }

      }

    };

    loadCars();

    return () => {

      mounted = false;

    };

  }, [currentPage, pageSize]);

  // ======================================
  // PAGE CHANGE
  // ======================================

  const handlePageChange = (page) => {

    if (
      page < 0 ||
      page >= totalPages
    ) {
      return;
    }

    setCurrentPage(page);

    // Scroll to cars section
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  // ======================================
  // RENDER
  // ======================================

  return (

    <div className="cars-page">

      {/* ==================================
          HERO
      =================================== */}

      <section className="cars-hero">

        <div className="cars-overlay">

          <h1>
            Premium Rental Cars
          </h1>

          <p>
            Choose your perfect ride
            from our luxury collection.
          </p>

        </div>

      </section>


      {/* ==================================
          HEADING
      =================================== */}

      <section className="cars-heading">

        <span>
          PREMIUM COLLECTION
        </span>

        <h2>
          Available Cars
        </h2>

        <p>
          Find the perfect luxury,
          SUV, sedan or economy car
          for your next journey.
        </p>

      </section>


      {/* ==================================
          CARS
      =================================== */}

      <section className="cars-container">

        {/* LOADING */}

        {loading && (
          <p className="cars-message">
            Loading available cars...
          </p>
        )}


        {/* ERROR */}

        {!loading &&
          error && (
            <p className="cars-message cars-error">
              {error}
            </p>
          )}


        {/* NO CARS */}

        {!loading &&
          !error &&
          cars.length === 0 && (

            <p className="cars-message">
              No cars are available
              right now.
            </p>

          )}


        {/* CAR CARDS */}

        {!loading &&
          !error &&
          cars.length > 0 && (

            cars.map(
              (car) => (

                <CarCard
                  key={car.id}
                  car={car}
                />

              )
            )

          )}

      </section>


      {/* ==================================
          PAGINATION
      =================================== */}

      {!loading &&
        !error &&
        totalPages > 1 && (

          <div className="pagination-wrapper">

            {/* PAGINATION INFO */}

            <div className="pagination-info">

              Showing{" "}

              <strong>
                {cars.length}
              </strong>

              {" "}of{" "}

              <strong>
                {totalElements}
              </strong>

              {" "}cars

            </div>


            {/* PAGINATION */}

            <div className="pagination">

              {/* PREVIOUS */}

              <button
                className="pagination-arrow"
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
                disabled={
                  currentPage === 0
                }
                aria-label="Previous page"
              >
                ‹
              </button>


              {/* PAGE NUMBERS */}

              {Array.from(
                { length: totalPages },
                (_, index) => index
              ).map((page) => (

                <button
                  key={page}
                  className={
                    currentPage === page
                      ? "pagination-number active"
                      : "pagination-number"
                  }
                  onClick={() =>
                    handlePageChange(page)
                  }
                >
                  {page + 1}
                </button>

              ))}


              {/* NEXT */}

              <button
                className="pagination-arrow"
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
                disabled={
                  currentPage ===
                  totalPages - 1
                }
                aria-label="Next page"
              >
                ›
              </button>

            </div>

          </div>

        )}


      {/* ==================================
          BANNER
      =================================== */}

      <section className="cars-banner">

        <h2>
          Drive Your Dream Car Today
        </h2>

        <p>
          Luxury • Comfort • Safety •
          Affordable Pricing
        </p>

        <button>
          Explore More Cars
        </button>

      </section>

    </div>

  );

}