import React, { useState } from "react";
import "./DrivingStep.css";

const DrivingStep = ({
  bookingData,
  updateBooking,
  nextStep,
  prevStep,
}) => {
  const [error, setError] = useState("");

  const drivers = [
    {
      id: 1,
      name: "Rahul Sharma",
      experience: "5 Years",
    },
    {
      id: 2,
      name: "Amit Patil",
      experience: "7 Years",
    },
    {
      id: 3,
      name: "Rohit Jadhav",
      experience: "4 Years",
    },
  ];

  const handleNext = () => {
    if (
      bookingData.drivingOption === "SELF" &&
      !bookingData.drivingLicense
    ) {
      setError("Please upload your Driving Licence.");
      return;
    }

    if (
      bookingData.drivingOption === "WITH_DRIVER" &&
      bookingData.driver === ""
    ) {
      setError("Please select a driver.");
      return;
    }

    setError("");
    nextStep();
  };

  return (
    <div className="driving-step">

      <h2>Choose Driving Option</h2>

      <p className="driving-subtitle">
        Select how you want to travel.
      </p>

      <div className="driving-options">

        {/* Self Drive */}

        <div
          className={
            bookingData.drivingOption === "SELF"
              ? "option-card active"
              : "option-card"
          }
          onClick={() =>
            updateBooking({
              drivingOption: "SELF",
              driver: "",
            })
          }
        >
          <h3>🚗 Self Drive</h3>

          <p>
            Drive the vehicle yourself.
          </p>
        </div>

        {/* With Driver */}

        <div
          className={
            bookingData.drivingOption === "WITH_DRIVER"
              ? "option-card active"
              : "option-card"
          }
          onClick={() =>
            updateBooking({
              drivingOption: "WITH_DRIVER",
              drivingLicense: null,
            })
          }
        >
          <h3>👨‍✈️ With Driver</h3>

          <p>
            Professional driver will drive for you.
          </p>
        </div>

      </div>

      {/* Self Drive Upload */}

      {bookingData.drivingOption === "SELF" && (

        <div className="driver-select">

          <label>Upload Driving Licence</label>

          <input
            type="file"
            accept="image/*,.pdf"
            onChange={(e) =>
              updateBooking({
                drivingLicense: e.target.files[0],
              })
            }
          />

          {bookingData.drivingLicense && (
            <p className="file-name">
              Selected File: {bookingData.drivingLicense.name}
            </p>
          )}

        </div>

      )}

      {/* Driver Selection */}

      {bookingData.drivingOption === "WITH_DRIVER" && (

        <div className="driver-select">

          <label>Select Driver</label>

          <select
            value={bookingData.driver}
            onChange={(e) =>
              updateBooking({
                driver: e.target.value,
              })
            }
          >

            <option value="">
              Select Driver
            </option>

            {drivers.map((driver) => (
              <option
                key={driver.id}
                value={driver.name}
              >
                {driver.name} ({driver.experience})
              </option>
            ))}

          </select>

        </div>

      )}

      {/* Error */}

      {error && (
        <div className="driver-error">
          {error}
        </div>
      )}

      {/* Buttons */}

      <div className="driving-buttons">

        <button
          className="back-btn"
          onClick={prevStep}
        >
          ← Back
        </button>

        <button
          className="next-btn"
          onClick={handleNext}
        >
          Next →
        </button>

      </div>

    </div>
  );
};

export default DrivingStep;